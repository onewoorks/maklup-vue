<template>
  <div class="container">
    <div class="text-center mt-5 mb-4">
      <h1>Payment Status</h1>
      <h4>Pulkam 2019</h4>
      <ul class="list-inline">
        <li class="list-inline-item">payment@pulkam2019.com.my</li>
        <li class="list-inline-item">|</li>
        <li class="list-inline-item">Pulang Kampung 2019</li>
        <li class="list-inline-item">|</li>
        <li class="list-inline-item">03 3122 4241</li>
      </ul>
    </div>
    <div ref="content">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-4 text-left pt-0 pb-0">
              <table class="table table-sm mt-4">
                <tbody>
                  <tr>
                    <th>Payment Status</th>
                    <td class="text-right">{{payment_status}}</td>
                  </tr>
                  <tr>
                    <th>Invoice No</th>
                    <td class="text-right">#2019-{{info.invoice_no}}</td>
                  </tr>
                  <tr>
                    <th style="vertical-align: top;">Issued To</th>
                    <td class="text-right text-uppercase">{{ info.nama }}</td>
                  </tr>
                  <tr>
                    <th style="vertical-align: top;">Email</th>
                    <td class="text-right">{{ info.email }}</td>
                  </tr>

                  <tr>
                    <th>Invoice Date</th>
                    <td class="text-right">{{ info.invoice_date }}</td>
                  </tr>

                  <tr>
                    <td colspan="2">
                      <br>
                      <br>
                    </td>
                  </tr>

                  <tr>
                    <th>Total Compound</th>
                    <td class="text-right">RM 800.00</td>
                  </tr>

                  <tr>
                    <th colspan="2"></th>
                  </tr>
                </tbody>
              </table>

              <div
                  v-if="payment_status == 'NOT PAID'"
                class="btn btn-block btn-outline-primary mt-5"
                @click="backToPaymentOption"
              >Back to Payment Options</div>
            </div>
            <div class="col-sm-8" style="border-left:1px solid #ddd ">
              <h4>TARIKH TEMUJANJI</h4> 
              <h3>{{ appointment_slot }} ({{ appointment_session }})</h3>
              <qrcode
                  v-if="payment_status == 'PAID'"
                :value="qrtoken"
                :options="{ width: 400 }"
              ></qrcode>
            </div>
          </div>
        </div>
      </div>

      
    </div>
    <div class='mt-2 mb-5' v-if="payment_status == 'PAID'">
              <div class="btn btn-block btn-primary" @click="download">Save Ticket</div>
            </div>
  </div>
</template>



<script>
// @ is an alias to /src
// import PaymentStatus from "@/components/PaymentStatus";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import Axios from "axios";
import { API } from '../config'
import jsPDF from "jspdf";
import html2canvas from 'html2canvas'

export default {
  name: "callback",
  components: {
    qrcode: VueQrcode
  },
  data() {
    return {
      payment_status: "",
      billplz: "",
      info: {},
      appointment_slot: "",
      appointment_session: "",
      qrtoken: 'no-access'
    };
  },
  mounted() {
    let response = this.$route.fullPath;
    let query = response.split("?")[1];
    let parsed = decodeURIComponent(query);
    let params = parsed.split("&");
    let obj = {};
    params.forEach(value => {
      let x = value.replace(/[[\]]/g, "");
      let v = x.split("=");
      obj[v[0]] = v[1];
    });
    
    this.billplz = obj;
    this.fetchBillplzInfo(obj.billplzid);
    if (obj.billplzpaid == "false") {
      this.payment_status = "NOT PAID";
    } else {
      this.payment_status = "PAID";
    }
  },
  methods: {
    generateQrCode: function() {
        let body = {
            register_id: this.info.register_id,
            temporary_id: this.info.temporary_id,
            status: 'paid'
        }
      Axios
      .post( API.baseurl + "register/CompleteProcess/", {
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        },
        body: body
      })
      .then(response => {
          this.qrtoken = response.data.response.token
      })
    },
    updateBillPlz: function(id){
      Axios.post(API.baseurl + "koleksi/billplz-payment-info", {
        headers: {
          'accept':'application/json'
        },
        body: {
          billplz_id: id,
          paid_status: "true"
        }
      })
      .then(response => {
        let resp = response.data.response
        this.appointment_slot = resp.appointment_slot
        this.appointment_session = resp.appointment_session
      })
    },
    fetchBillplzInfo: function(id) {
      Axios.get(
        API.baseurl + "register/BillPlzInfo?billplz_id=" + id
      ).then(response => {
        let resp = response.data.response;
        this.info = resp.data_pemohon;
        this.info.invoice_no = resp.temporary_id;
        this.info.invoice_date = resp.timestamp;
        this.info.register_id = resp.register_id;
        this.info.temporary_id = resp.temporary_id;
        if(this.payment_status=='PAID'){
            this.generateQrCode()
            this.updateBillPlz(id)
        }
      });
    },
    backToPaymentOption: function() {
      this.$router.push({
        name: "payment",
        params: {
          register_id: this.info.register_id,
          temporary_id: this.info.temporary_id
        }
      });
    },
    download: function() {
      const doc = new jsPDF('l', 'mm',[595,295]);
      var canvasElement = document.createElement("canvas");
      html2canvas(this.$refs.content, { canvas: canvasElement })
      .then(function(canvas) {
        const img = canvas.toDataURL("image/png");
        // doc.addImage(img, "JPEG", 5, 5,200,95);
        doc.addImage(img,'JPEG',5,5,200,95,'NONE')
        doc.save("sample.pdf");
      });
    }
  }
};
</script>
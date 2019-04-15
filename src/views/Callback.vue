<template>
  <div class="container">
    <AppHeader title="Maklumat Bayaran" subHeader="Pulkam 2019"/>
    <div ref="content">
      <div class="card h-100 card-shadow">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-4 text-left pt-0 pb-0">
              <table class="table table-sm mt-4">
                <tbody>
                  <tr>
                    <th>Status Pembayaran</th>
                    <td class="text-right">{{payment_status}}</td>
                  </tr>
                  <tr>
                    <th>No Invois</th>
                    <td class="text-right">#2019-{{info.invoice_no}}</td>
                  </tr>
                  <tr>
                    <th style="vertical-align: top;">Pemohon</th>
                    <td class="text-right text-uppercase">{{ info.nama }}</td>
                  </tr>

                  <tr>
                    <th style="vertical-align: top;">No Telefon</th>
                    <td class="text-right text-uppercase">{{ info.no_telefon }}</td>
                  </tr>

                  <tr>
                    <th style="vertical-align: top;">Email</th>
                    <td class="text-right">{{ info.email }}</td>
                  </tr>

                  <tr>
                    <th>Tarikh Invois</th>
                    <td class="text-right">{{ info.invoice_date }}</td>
                  </tr>

                  <tr>
                    <th>Id Invois</th>
                    <td class="text-right">{{ billplz.billplzid }}</td>
                  </tr>

                  <tr>
                    <td colspan="2">
                      <br>
                      <br>
                    </td>
                  </tr>

                  <tr>
                    <th>Kompaun</th>
                    <td class="text-right">MYR 800.00</td>
                  </tr>
                  <tr>
                    <th>Cas Tambahan</th>
                    <td class="text-right">MYR 1.50</td>
                  </tr>
                  <tr>
                    <th>Jumlah</th>
                    <td class="text-right">MYR 801.50</td>
                  </tr>

                  <tr>
                    <td colspan="2" class="text-center">
                      <barcode :value="info.invoice_no" height="50" display-value="false"></barcode>
                    </td>
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
              <qrcode v-if="payment_status == 'PAID'" :value="qrtoken" :options="{ width: 400 }"></qrcode>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 mb-5" v-if="payment_status == 'PAID'">
      <div class="btn btn-block btn-primary" @click="download">Simpan Tiket</div>
    </div>
  </div>
</template>

<style scoped src='@/assets/css/main.css'>
</style>

<script>
import AppHeader from "@/components/AppHeader";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import Axios from "axios";
import { API } from "../config";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import VueBarcode from "vue-barcode";
require("@/assets/css/main.css");

export default {
  name: "callback",
  components: {
    qrcode: VueQrcode,
    AppHeader,
    barcode: VueBarcode
  },
  data() {
    return {
      payment_status: "",
      billplz: "",
      info: {},
      appointment_slot: "",
      appointment_session: "",
      qrtoken: "no-access"
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
        status: "paid"
      };
      Axios.post(API.baseurl + "register/CompleteProcess/", {
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        },
        body: body
      }).then(response => {
        this.qrtoken = response.data.response.token;
      });
    },
    updateBillPlz: function(id) {
      Axios.post(API.baseurl + "koleksi/billplz-payment-info", {
        headers: {
          accept: "application/json"
        },
        body: {
          billplz_id: id,
          paid_status: "true"
        }
      }).then(response => {
        let resp = response.data.response;
        this.appointment_slot = resp.appointment_slot;
        this.appointment_session = resp.appointment_session;
      });
    },
    fetchBillplzInfo: function(id) {
      Axios.get(API.baseurl + "register/BillPlzInfo?billplz_id=" + id).then(
        response => {
          let resp = response.data.response;
          this.info = resp.data_pemohon;
          this.info.invoice_no = resp.temporary_id;
          this.info.invoice_date = resp.timestamp;
          this.info.register_id = resp.register_id;
          this.info.temporary_id = resp.temporary_id;
          console.log(resp.appointment)
          
          this.info.no_telefon =
            "+" + resp.data_pemohon.kod_negara + resp.data_pemohon.no_telefon;
          if (this.payment_status == "PAID") {
            this.generateQrCode();
            this.updateBillPlz(id);
          }
        }
      );
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
      const doc = new jsPDF("l", "mm", [595, 295]);
      var canvasElement = document.createElement("canvas");
      html2canvas(this.$refs.content, { canvas: canvasElement }).then(function(
        canvas
      ) {
        const img = canvas.toDataURL("image/png");
        // doc.addImage(img, "JPEG", 5, 5,200,95);
        doc.addImage(img, "JPEG", 5, 5, 200, 95, "NONE");
        doc.save("sample.pdf");
      });
    }
  }
};
</script>
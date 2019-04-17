<template>
  <div class="container">
    <AppHeader title="Makluman Bayaran" subHeader="Pengesahan bayaran akan dimaklumkan melalui sms setelah pihak kami buat semakan"/>
    <div ref="content">
    <div class="card h-100 card-shadow">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-5 text-left pt-0 pb-0">
            <table class="table table-sm mt-4">
              <tbody>
                <tr>
                  <th>Status Bayaran</th>
                  <td class="text-right text-uppercase">{{payment.status}}</td>
                </tr>
                <tr>
                  <th>Invois No</th>
                  <td class="text-right">#2019-{{invoice_no}}</td>
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
                  <td class="text-right">{{ invoice_date }}</td>
                </tr>
                <tr>
                  <th>Cara Bayaran</th>
                  <td class="text-right text-uppercase">{{ payment.option }}</td>
                </tr>

                <tr>
                  <td colspan="2">
                    <br>
                    <br>
                  </td>
                </tr>

                <tr>
                  <th>Kompaun</th>
                  <td class="text-right">MYR {{ compound }}</td>
                </tr>
                <tr>
                  <th>Cas Tambahan</th>
                  <td class="text-right">MYR {{ additional_charges }}</td>
                </tr>
                <tr>
                  <th>Jumlah</th>
                  <td class="text-right">MYR {{ total_amount }}</td>
                </tr>

                <tr>
                  <td colspan="2" class="text-center pt-3 pb-0">
                    <barcode :value="barcode" height="50" display-value="true"></barcode>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm-7 d-none d-sm-block" style="border-left:1px solid #ddd ">
            <h4><strong>TARIKH TEMUJANJI</strong></h4>
            <h3>{{ appointment_slot }} ({{ appointment_session }})</h3>
            <qrcode v-if="payment.status == 'paid'" :value="qrtoken" :options="{ width: 400 }"></qrcode>
          </div>
          <div class="col-sm-12 d-sm-none" style="">
            <h4>TARIKH TEMUJANJI</h4>
            <h3>{{ appointment_slot }} ({{ appointment_session }})</h3>
            <qrcode v-if="payment.status == 'paid'" :value="qrtoken" :options="{ width: 290 }"></qrcode>
            
            
          </div>
        </div>
      </div>
    </div>
    </div>
    
    <div class='mt-5 mb-5' v-if="payment.status == 'paid'">
              <div class="btn btn-block btn-primary" @click="download">Simpan Ticket</div>
            </div>
  </div>
</template>

<style scoped src='@/assets/css/main.css'>
</style>

<script>
import AppHeader from "@/components/AppHeader";
import Axios from "axios";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { API } from "../config";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import VueBarcode from 'vue-barcode';
require('@/assets/css/main.css')

export default {
  name: "ticket",
  components: {
    AppHeader,
    qrcode: VueQrcode,
    barcode: VueBarcode
  },
  data() {
    return {
      info: "",
      invoice_date: "",
      invoice_no: "",
      barcode: "",
      additional_charges: "0.00",
      compound: "800.00",
      total_amount: "0.00",
      qrtoken: "no-access",
      payment: {
        status: "NOT PAID"
      },
      appointment_slot: "",
      appointment_session: ""
    };
  },
  mounted() {
    this.total_amount = (
      parseFloat(this.compound) + parseFloat(this.additional_charges)
    ).toFixed(2);
    Axios.get(
      API.baseurl +
        "register/info?regid=" +
        this.$route.params.register_id +
        "&tempid=" +
        this.$route.params.temporary_id
    ).then(response => {
      let resp = response.data.response;
      console.log(resp)
      this.info = resp.data_pemohon;
      this.info.no_telefon = "+" + resp.data_pemohon.kod_negara + resp.data_pemohon.no_telefon
      this.invoice_date = resp.timestamp;
      this.payment = resp.payment;
      this.invoice_no = resp.temporary_id;
      this.appointment_slot = resp.appointment.slot
      this.appointment_session = resp.appointment.session
      this.barcode = resp.register_id+ " " + resp.temporary_id
      if (this.payment.status == "paid") {
        this.generateQrCode();
        this.additionalCharges(this.payment.option);
      }
    });
  },
  methods: {
    additionalCharges: function(payment_options) {
      switch (payment_options) {
        case "billplz":
          this.additional_charges = "1.50";
          break;
        case "bank_transfer":
          this.additional_charges = "0.00";
          break;
      }
      this.total_amount = (
        parseFloat(this.compound) + parseFloat(this.additional_charges)
      ).toFixed(2);
    },
    generateQrCode: function() {
      let body = {
        register_id: this.$route.params.register_id,
        temporary_id: this.$route.params.temporary_id,
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
    download: function() {
      const doc = new jsPDF('l', 'mm',[595,322]);
      var canvasElement = document.createElement("canvas");
      html2canvas(this.$refs.content, { canvas: canvasElement })
      .then(function(canvas) {
        const img = canvas.toDataURL("image/png");
        // doc.addImage(img, "JPEG", 5, 5,200,95);
        doc.addImage(img,'JPEG',5,5,200,104,'NONE')
        doc.save("sample.pdf");
      });
    }
  }
};
</script>

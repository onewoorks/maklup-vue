<template>
  <div class="container">
    <AppHeader title="Your Confirmation Ticket" subHeader="Pulkam 2019"/>
    <div ref="content">
    <div class="card h-100 card-shadow">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-4 text-left pt-0 pb-0">
            <table class="table table-sm mt-4">
              <tbody>
                <tr>
                  <th>Payment Status</th>
                  <td class="text-right text-uppercase">{{payment.status}}</td>
                </tr>
                <tr>
                  <th>Invoice No</th>
                  <td class="text-right">#2019-{{invoice_no}}</td>
                </tr>
                <tr>
                  <th style="vertical-align: top;">Issued To</th>
                  <td class="text-right text-uppercase">{{ info.nama }}</td>
                </tr>
                <tr>
                  <th style="vertical-align: top;">Contact No</th>
                  <td class="text-right text-uppercase">{{ info.no_telefon }}</td>
                </tr>
                <tr>
                  <th style="vertical-align: top;">Email</th>
                  <td class="text-right">{{ info.email }}</td>
                </tr>

                <tr>
                  <th>Invoice Date</th>
                  <td class="text-right">{{ invoice_date }}</td>
                </tr>
                <tr>
                  <th>Payment Option</th>
                  <td class="text-right">{{ payment.option }}</td>
                </tr>

                <tr>
                  <td colspan="2">
                    <br>
                    <br>
                  </td>
                </tr>

                <tr>
                  <th>Compound</th>
                  <td class="text-right">RM {{ compound }}</td>
                </tr>
                <tr>
                  <th>Additional Charges</th>
                  <td class="text-right">RM {{ additional_charges }}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td class="text-right">RM {{ total_amount }}</td>
                </tr>

                <tr>
                  <th colspan="2"></th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm-8 d-none d-sm-block" style="border-left:1px solid #ddd ">
            <h4>TARIKH TEMUJANJI</h4>
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
              <div class="btn btn-block btn-primary" @click="download">Save Ticket</div>
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
import html2canvas from 'html2canvas'
require('@/assets/css/main.css')

export default {
  name: "ticket",
  components: {
    AppHeader,
    qrcode: VueQrcode
  },
  data() {
    return {
      info: "",
      invoice_date: "",
      invoice_no: "",
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
      this.invoice_date = resp.timestamp;
      this.payment = resp.payment;
      this.invoice_no = resp.temporary_id;
      this.appointment_slot = resp.appointment.slot
      this.appointment_session = resp.appointment.session
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

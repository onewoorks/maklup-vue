<template>
  <div class="container">
    <div class="text-center mt-5 mb-4">
      <h1>Payment Instruction</h1>
      <h4>Pulkam 2019</h4>
      <ul class="list-inline">
        <li class="list-inline-item">payment@pulkam2019.com.my</li>
        <li class="list-inline-item">|</li>
        <li class="list-inline-item">Pulang Kampung 2019</li>
        <li class="list-inline-item">|</li>
        <li class="list-inline-item">03 3122 4241</li>
      </ul>
    </div>
    <div class="card-group mb-5">
      <div class="card col-sm-4" style="padding:0">
        <div class="card-body text-left">
          <h3>Invoice Summary</h3>
          <hr>

          <table class="table table-sm">
            <tbody>
              <tr>
                <th>Invoice No</th>
                <td class="text-right">#2019-{{info.invoice_no}}</td>
              </tr>
              <tr>
                <th style="vertical-align: top;">Issued To</th>
                <td class="text-right text-uppercase">{{ info.name }}</td>
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
                <td class="text-right">{{ info.total_invoice }}</td>
              </tr>
              <tr>
                <th colspan="2">Additional Charges</th>
              </tr>
              <tr>
                <th>Payment Gateway</th>
                <td class="text-right" id="additional_charge">{{ info.payment_gateway_charges}}</td>
              </tr>
              <tr>
                <th>&nbsp;</th>
                <td class="text-right"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          id="full_amount"
          class="card-footer text-center bg-transparent"
          style="
                         font-size: 1.6rem;
                         font-weight: bold;
                         "
        >RM {{ info.amount_to_be_paid}}</div>
      </div>

      <div class="card">
        <div class="card-body text-center">
          <h4 class="card-title text-left mb-4">How do you want to pay?</h4>
          <div id="payment_options" class="row card-items" style="margin:0;">
            <div class="col-sm-6 payment_items mb-3" data-method="billplz" @click="pickBillPlz">
              <div class="card" :class="{ 'border-success': active_el == 'billplz'}">
                <div class="card-body">
                  <img
                    src="/img/payment_gateway/billplz.jpg"
                    class="img-fluid"
                    style="height: 104px;"
                  >
                </div>
                <div
                  class="card-footer"
                  :class="{'bg-success text-white': active_el == 'billplz'}"
                >BillPlz</div>
              </div>
            </div>

            <div
              class="col-sm-3 payment_items mb-3"
              data-method="bank_transfer"
              @click="pickBankTransfer"
            >
              <div class="card" :class="{ 'border-success': active_el == 'bank_transfer'}">
                <div class="card-body">
                  <img
                    class="img-fluid"
                    src="/img/payment_gateway/bank_transfer.jpg"
                    alt="bank transfer"
                  >
                </div>
                <div
                  class="card-footer"
                  :class="{'bg-success text-white': active_el == 'bank_transfer'}"
                >Bank Transfer</div>
              </div>
            </div>

            <div class="col-sm-3 payment_items mb-3 d-none" data-method="paypal">
              <div class="card">
                <div class="card-body">
                  <img src="/img/payment_gateway/paypal.jpg" class="img-fluid">
                </div>
                <div class="card-footer">PayPal</div>
              </div>
            </div>

            <div class="col-sm-3 payment_items mb-3 d-none" data-method="maybank2u_pay">
              <div class="card">
                <div class="card-body">
                  <img src="/img/payment_gateway/maybank2u_pay.jpg" class="img-fluid">
                </div>
                <div class="card-footer">Maybank2u Pay</div>
              </div>
            </div>

            <div class="col-sm-3 payment_items mb-3 d-none" data-method="maybank_qr">
              <div class="card">
                <div class="card-body">
                  <img src="/img/payment_gateway/maybank_qrpay.jpg" class="img-fluid">
                </div>
                <div class="card-footer">Maybank QR</div>
              </div>
            </div>

            <div class="col-sm-3 payment_items d-none" data-method="jompay">
              <div class="card">
                <div class="card-body">
                  <img src="/img/payment_gateway/jompay.jpg" class="img-fluid">
                </div>
                <div class="card-footer">Jom PAY</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-footer text-right">
          <div
            @click="proceedToPayment"
            class="btn btn-primary btn-block"
            id="proceed_payment"
          >Continue to Payment</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.payment_items > .card {
  cursor: pointer;
}
</style>

<script>
// @ is an alias to /src
import Axios from "axios";

export default {
  name: "payment",
  data() {
    return {
      active_el: "billplz",
      billplz_id: "",
      billplz_url: "",
      payment_link: "billplz",
      info: {
        pemohon_id: "",
        name: "",
        email: "",
        invoice_date: "",
        total_invoice: "800.00",
        payment_gateway_charges: "1.50",
        amount_to_be_paid: "801.50"
      }
    };
  },
  mounted() {
    Axios.get(
      "http://54.255.249.228/pulkam/register/info?regid=" +
        this.$route.params.register_id +
        "&tempid=" +
        this.$route.params.temporary_id
    ).then(response => {
      let resp = response.data.response;
      this.info.name = resp.data_pemohon.nama;
      this.info.email = resp.data_pemohon.email;
      this.info.invoice_date = resp.timestamp;
      this.info.invoice_no = resp.temporary_id;
      this.info.pemohon_id = resp.id;
      if (resp.billplz_id != "") {
        this.billplz_id = resp.billplz_id;
        this.billplz_url = resp.billplz_data.url;
      }
    });
  },
  components: {},
  methods: {
    pickBankTransfer: function() {
      this.active_el = "bank_transfer";
      this.info.payment_gateway_charges = "0.00";
      this.info.amount_to_be_paid = this.info.total_invoice;
      this.payment_link = 'bank_transfer'
    },
    pickBillPlz: function() {
      this.active_el = "billplz";
      this.info.payment_gateway_charges = "1.50";
      this.info.amount_to_be_paid = (
        parseFloat(this.info.total_invoice) + 1.5
      ).toFixed(2);
      this.payment_link = "billplz";
    },
    proceedToPayment: function() {
      if (this.payment_link == "billplz") {
        if (this.billplz_id == "") {
          let body = {
            register_id: this.$route.params.register_id,
            temporary_id: this.$route.params.temporary_id,
            pemohon_id: this.info.pemohon_id,
            email: this.info.email,
            nama: this.info.name
          };
          Axios.post("http://54.255.249.228/pulkam/register/BillPlz/", {
            headers: {
              "Content-Type": "application/json",
              "cache-control": "no-cache"
            },
            body: body
          }).then(response => {
            console.log(response.data);
          });
        } else {
          window.location.href = this.billplz_url
        }
      } else {
        this.$router.push({
          name: "payment_bank_transfer",
          params: {
            register_id: this.$route.params.register_id,
            temporary_id: this.$route.params.temporary_id
          }
        });
      }
    }
  }
};
</script>

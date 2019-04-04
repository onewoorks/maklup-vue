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
    <div class="card h-100">
      <div class="card-header">Instruction</div>
      <div class="card-body">
        <div class="card-deck h-100">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Langkah 1</h5>
              <hr>
              <p class="card-text">Find Any Auto Teller Machine (ATM)</p>
            </div>
          </div>

          <div class="card">
            <div class="card-body h-100">
              <h5 class="card-title">Langkah 2</h5>
              <hr>
              <div class="card-text text-left">
                <ul class="list-unstyled">
                  <li>
                    <b>Bank Account :</b> Maybank
                  </li>
                  <li>
                    <b>Account No :</b> 562106689597
                  </li>
                  <li>
                    <b>Account Holder :</b> Onewoorks Solutions
                  </li>
                  <br>
                  <li>
                    <b>Amount To Be Paid :</b>MYR 800.00
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Langkah 3</h5>
              <hr>
              <div class="btn btn-outline-primary">Save Ticket</div>
              <p class="card-text">Sila kemaskini maklumat transaksi anda disini</p>
              <div class="btn btn-primary btn-block">Kemaksini Transaksi</div>
            </div>
          </div>
        </div>

        <div class="card-deck h-100 mt-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Butir-Butir Pembayaran</h5>
              <hr>
              <form action>
                <div class="row text-left">
                  <div class="col-sm-12 col-md-4 text-left">
                    <div class="form-group">
                      <label for>
                        No CDM ID
                        <i class="fas fa-pencil-paintbrush"></i>
                      </label>
                      <input
                        type="text"
                        name="nama_penuh_penaja"
                        v-model="info.cdm_id"
                        class="form-control text-uppercase"
                      >
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-4 text-left">
                    <div class="form-group">
                      <label for>
                        No SEQ No
                        <i class="fas fa-pencil-paintbrush"></i>
                      </label>
                      <input
                        type="text"
                        name="info.no_seq"
                        v-model="info.nama_penuh_penaja"
                        class="form-control text-uppercase"
                      >
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-4 text-left">
                    <div class="form-group">
                      <label for>
                        Tarikh Bayaran
                        <i class="fas fa-pencil-paintbrush"></i>
                      </label>
                      <datepicker
                        bootstrap-styling
                        name="info.tarikh_bayaran"
                        v-model="info.sah_sehingga"
                        calendar-button
                        calendar-button-icon="far fa-calendar-alt"
                      ></datepicker>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer bg-transparent text-center">
        <div class="btn btn-outline-primary" @click="backToPaymentOption">Back to Payment Options</div>
        <div class="btn btn-primary ml-2" @click="kemaskiniPembayaran">Kemaskini Pembayaran</div>
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
import Datepicker from "vuejs-datepicker";

export default {
  name: "payment_bank_transfer",
  data() {
    return {
      active_el: "billplz",
      info: {
        name: "",
        email: "",
        invoice_date: "",
        total_invoice: "800.00",
        payment_gateway_charges: "1.50",
        amount_to_be_paid: "801.50"
      }
    };
  },
  mounted() {},
  components: {
    Datepicker: Datepicker
  },
  methods: {
    backToPaymentOption: function() {
      this.$router.push({
        name: "payment"
      });
    },
    kemaskiniPembayaran: function(){
      this.$router.push({
        name: 'payment_bt',
        params: {
          register_id: this.$route.params.register_id,
          temporary_id: this.$route.params.temporary_id
        }
      })
    }
  }
};
</script>

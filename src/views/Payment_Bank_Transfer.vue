<template>
  <div class="container">
    <AppHeader title="Payment Instruction" subHeader="Pulkam 2019" />
    <div class="card h-100 card-shadow">
      <form @submit.prevent="kemaskiniPembayaran">
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
              <p class="card-text">Sila kemaskini maklumat transaksi anda disini</p>
            </div>
          </div>
        </div>


        <div class="card-deck h-100 mt-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Butir-Butir Pembayaran</h5>
              <hr>
              
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
                        autocomplete="off"
                        required
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
                        name="no_seq"
                        v-model="info.no_seq"
                        class="form-control text-uppercase"
                        autocomplete="off"
                        required
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
                        name="tarikh_bayaran"
                        v-model="info.tarikh_bayaran"
                        calendar-button
                        calendar-button-icon="far fa-calendar-alt"
                        required
                      ></datepicker>
                    </div>
                  </div>
                </div>
              
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer bg-transparent text-center">
        <div class="btn btn-outline-primary" @click="backToPaymentOption">Back to Payment Options</div>
        <button type="submit" class="btn btn-primary ml-2">Kemaskini Pembayaran</button>
      </div>

      </form>
    </div>
  </div>
</template>

<style scoped src="@/assets/css/main.css">
.payment_items > .card {
  cursor: pointer;
}
</style>

<script>
import AppHeader from "@/components/AppHeader"
import Datepicker from "vuejs-datepicker";
import {API} from '../config';
import Axios from 'axios';
import Swal from "sweetalert2";
require("@/assets/css/main.css")

export default {
  name: "payment_bank_transfer",
  data() {
    return {
      active_el: "billplz",
      info: {
        total_invoice: "800.00",
        payment_gateway_charges: "0.0",
        amount_to_be_paid: "800.00",
        register_id: this.$route.params.register_id,
        temporary_id: this.$route.params.temporary_id
      }
    };
  },
  mounted() {},
  components: {
    Datepicker: Datepicker,
    AppHeader
  },
  methods: {
    backToPaymentOption: function() {
      this.$router.push({
        name: "payment"
      });
    },
    kemaskiniPembayaran: function(){
      console.log(this.info)
      Axios
      .post(API.baseurl + 'register/update-cdm',{
        headers: {
          'accept':'application/json'
        },
        body: this.info
      })
      .then(response => {
        console.log(response)
        Swal.fire({
            title: "Success!",
            text: "Compound has been paid",
            type: "success",
            confirmButtonText: "View ticket"
          }).then(()=>{
            this.$router.push({
              name:'ticket',
              params: {
                register_id: this.info.register_id,
                temporary_id: this.info.temporary_id
              }
            })
          });
      })
    }
  }
};
</script>

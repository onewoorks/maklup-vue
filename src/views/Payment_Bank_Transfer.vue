<template>
  <div class="container">
    <AppHeader title="Cara Pembayaran Melalui CDM" subHeader="Pulkam 2019"/>
    <div class="card h-100 card-shadow">
      <form @submit.prevent="kemaskiniPembayaran">
        <div class="card-header">Langkah - Langkah Pembayaran</div>
        <div class="card-body">
          <div class="card-deck h-100">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Langkah 1</h5>
                <hr>
                <p class="card-text">Cari mana-mana mesin deposit tunai (ATM) mengikut bank pilihan anda.</p>
              </div>
            </div>

            <div class="card">
              <div class="card-body h-100">
                <h5 class="card-title">Langkah 2</h5>
                <hr>

                <select class="form-control mb-3" v-model="bankpilihan" @change="pilihBankAnda">
                  <option value>-- Pilih Bank --</option>
                  <option value="maybank">Maybank</option>
                  <option value="cimb">CIMB</option>
                  <option value="bsn">Bank Simpanan Nasional (BSN)</option>
                </select>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Langkah 3</h5>
                <hr>

                <div v-if="bankpilihan == 'maybank'">
                  <div class="card-text text-left">
                    <ul class="list-unstyled">
                      <li>
                        <b>Bank :</b> Maybank
                      </li>
                      <li>
                        <b>No akaun :</b> 562106689597
                      </li>
                      <li>
                        <b>Pemilik akaun :</b> Onewoorks Solutions
                      </li>
                      <br>
                      <li>
                        <b>Jumlah yang perlu dibayar :</b>MYR 800.00
                      </li>
                    </ul>
                  </div>
                </div>
                <div v-if="bankpilihan == 'cimb'">
                  <div class="card-text text-left">
                    <ul class="list-unstyled">
                      <li>
                        <b>Bank :</b> CIMB
                      </li>
                      <li>
                        <b>No Akaun :</b>
                      </li>
                      <li>
                        <b>Pemilik Akaun :</b>
                      </li>
                      <br>
                      <li>
                        <b>Jumlah yang perlu dibayar :</b>MYR 800.00
                      </li>
                    </ul>
                  </div>
                </div>
                <div v-if="bankpilihan == 'bsn'">
                  <div class="card-text text-left">
                    <ul class="list-unstyled">
                       <li>
                        <b>Bank :</b> Bank Simpanan Nasinal (BSN)
                      </li>
                      <li>
                        <b>No Akaun :</b>
                      </li>
                      <li>
                        <b>Pemilik Akaun :</b>
                      </li>
                      <br>
                      <li>
                        <b>Jumlah yang perlu dibayar :</b>MYR 800.00
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="bankpilihan == 'maybank' " class="card-deck h-100 mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-left">Butir-Butir Pembayaran Maybank</h5>
                <hr>

                <div class="row text-left">
                  <div class="col-sm-12 col-md-3 text-left">
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

                  <div class="col-sm-12 col-md-3 text-left">
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

                  <div class="col-sm-12 col-md-3 text-left">
                    <div class="form-group">
                      <label for>Tarikh Bayaran</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="far fa-calendar-alt"></i>
                          </span>
                        </div>
                        <Datepicker
                          v-model="info.tarikh_bayaran"
                          :config="options.tarikh_bayaran"
                          required
                        ></Datepicker>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-3 text-left">
                    <div class="form-group">
                      <label for>Masa Bayaran</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="far fa-clock"></i>
                          </span>
                        </div>
                        <Datepicker
                          v-model="info.masa_bayaran"
                          :config="options.masa_bayaran"
                          required
                        ></Datepicker>
                      </div>
                    </div>
                  </div>
                  

                </div>
              </div>
            </div>
          </div>

          <div v-if="bankpilihan == 'cimb' " class="card-deck h-100 mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-left">Butir-Butir Pembayaran CIMB</h5>
                <hr>
                {{cimb_transaction}}
                <div v-if="alert.cimb_transaction" class="alert alert-warning">No Trasaksi CDM tidak sah, sila semak semula atau hubungi kami sekiranya perlu</div>
                <div class="row text-left">
                  <div class="col-sm-12 col-md-3 text-left">
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

                  <div class="col-sm-12 col-md-3 text-left">
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

                  <div class="col-sm-12 col-md-3 text-left">
                    <div class="form-group">
                      <label for>Tarikh Bayaran</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="far fa-calendar-alt"></i>
                          </span>
                        </div>
                        <Datepicker
                          v-model="info.tarikh_bayaran"
                          :config="options.tarikh_bayaran"
                          required
                        ></Datepicker>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-3 text-left">
                    <div class="form-group">
                      <label for>Masa Bayaran</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="far fa-clock"></i>
                          </span>
                        </div>
                        <Datepicker
                          v-model="info.masa_bayaran"
                          :config="options.masa_bayaran"
                          required
                        ></Datepicker>
                      </div>
                    </div>
                  </div>
                  

                </div>
              </div>
            </div>
          </div>

          <div v-if="bankpilihan == 'bsn' " class="card-deck h-100 mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-left">Butir-Butir Pembayaran BSN</h5>
                <hr>

                <div class="row text-left">
                  <div class="col-sm-12 col-md-3 text-left">
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

                  <div class="col-sm-12 col-md-3 text-left">
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

                  <div class="col-sm-12 col-md-3 text-left">
                    <div class="form-group">
                      <label for>Tarikh Bayaran</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="far fa-calendar-alt"></i>
                          </span>
                        </div>
                        <Datepicker
                          v-model="info.tarikh_bayaran"
                          :config="options.tarikh_bayaran"
                          required
                        ></Datepicker>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-3 text-left">
                    <div class="form-group">
                      <label for>Masa Bayaran</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="far fa-clock"></i>
                          </span>
                        </div>
                        <Datepicker
                          v-model="info.masa_bayaran"
                          :config="options.masa_bayaran"
                          required
                        ></Datepicker>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-footer bg-transparent text-center">
          <div class="btn btn-outline-primary" @click="backToPaymentOption">Kembali ke bayaran</div>
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
import AppHeader from "@/components/AppHeader";
import { API } from "../config";
import Axios from "axios";
import Swal from "sweetalert2";
import Datepicker from "vue-bootstrap-datetimepicker";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";

require("@/assets/css/main.css");

const fixedEncodeURIComponent = (str) => {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
    return '%' + c.charCodeAt(0).toString(16)
  })
}

export default {
  name: "payment_bank_transfer",
  data() {
    return {
      alert: {
        cimb_transaction: false
      },
      options: {
        tarikh_bayaran: {
          format: "D MMMM YYYY"
        },
        masa_bayaran: {
          format: "LT"
        }
      },
      active_el: "billplz",
      bankpilihan: "",
      info: {
        total_invoice: "800.00",
        payment_gateway_charges: "0.0",
        amount_to_be_paid: "800.00",
        register_id: this.$route.params.register_id,
        temporary_id: this.$route.params.temporary_id,
        tarikh_bayaran: "",
        masa_bayaran: ""
      }
    };
  },
  mounted() {},
  components: {
    Datepicker,
    AppHeader
  },
  computed:{
    cimb_transaction: function(){
      if(typeof this.info.cdm_id !== 'undefined' && typeof this.info.no_seq !== 'undefined'){
        let transcationid = this.info.cdm_id + this.info.no_seq
        let cdmid = fixedEncodeURIComponent(this.info.cdm_id)
        let url = `cdmid=${cdmid}&seqid=${this.info.no_seq}`
        Axios.get(`${API.baseurl}register/check-cdm-code?${url}`)
        .then(response=> {
          let resp = response.data.response
          if(resp.data.length!=0){
           this.alert.cimb_transaction = true
           }
        })
      }
      
    }
  },
  methods: {
    pilihBankAnda: function(event) {
      console.log("bank pilihan " + event.target.value);
    },
    backToPaymentOption: function() {
      this.$router.push({
        name: "payment"
      });
    },
    kemaskiniPembayaran: function() {
      Axios.post(API.baseurl + "register/update-cdm", {
        headers: {
          accept: "application/json"
        },
        body: this.info
      }).then(response => {
        let resp = response.data.response
        Swal.fire({
          title: "Pembayaran Sedang Diproses!",
          text: "Kompaun MYR 800.00 telah dibayar",
          type: "success",
          confirmButtonText: "Lihat Temujanji"
        }).then(() => {
          this.$router.push({
            name: "ticket",
            params: {
              register_id: this.info.register_id,
              temporary_id: this.info.temporary_id
            }
          });
        });
      });
    }
  }
};
</script>

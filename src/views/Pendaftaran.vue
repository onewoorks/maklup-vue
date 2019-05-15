<template>
  <div class="container mb-3">
    <AppHeader title="Borang Pendaftaran" subHeader="Pulkam 2019"/>
    <form id="borang_daftar" @submit.prevent="getFormValues">
      <div class="card mb-3 card-shadow">
        <div class="card-header text-left text-uppercase">MAKLUMAT PERIBADI</div>
        <div class="card-body">
          <div class="row text-left">
            <div class="col-sm-12">
              <div class="form-group">
                <label for>
                  Nama
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input
                  type="text"
                  name="nama"
                  v-model="info.nama"
                  class="form-control text-uppercase"
                  required
                  autocomplete="off"
                  oninvalid="this.setCustomValidity('Sila masukkan nama penuh')"
                  oninput="this.setCustomValidity('')"
                >
              </div>
            </div>

            <div class="col-sm-12 mb-3">
              <div class="form-groups">
                <div class>
                  <label>
                    Jantina
                    <i class="fas fa-pencil-paintbrush"></i>
                  </label>
                </div>
                <div class>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input
                        type="radio"
                        name="jantina"
                        class="form-check-input"
                        v-model="info.jantina"
                        value="LELAKI"
                      >Lelaki
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input
                        type="radio"
                        name="jantina"
                        class="form-check-input"
                        v-model="info.jantina"
                        value="PEREMPUAN"
                      >Perempuan
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-6 text-left">
              <div class="form-group">
                <label for>
                  Tempat Negara Lahir
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>

                <select v-model="info.tempat_lahir" class="form-control text-uppercase">
                  <option
                    v-for="(option, key) in options.negara"
                    v-bind:key="key"
                    v-bind:value="option.value"
                  >{{ option.text }}</option>
                </select>
              </div>
            </div>

            <div class="col-sm-6 text-left">
              <div class="form-group">
                <label for>Tarikh Lahir</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="far fa-calendar-alt"></i>
                    </span>
                  </div>
                  <DatePicker2 v-model="info.tarikh_lahir" :config="options.tarikh_sahaja" required></DatePicker2>
                </div>
              </div>
            </div>

            <div class="col-sm-6 text-left">
              <div class="form-group">
                <label for>
                  Warganegara
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <select v-model="info.warganegara" class="form-control text-uppercase">
                  <option
                    v-for="(option, key) in options.negara"
                    v-bind:key="key"
                    v-bind:value="option.value"
                  >{{ option.text }}</option>
                </select>
              </div>
            </div>

            <div class="col-sm-6 text-left">
              <div class="form-group">
                <label>
                  Pekerjaan
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input
                  type="text"
                  name="pekerjaan"
                  v-model="info.pekerjaan"
                  class="form-control text-uppercase"
                  autocomplete="off"
                >
              </div>
            </div>

            <div class="col-sm-12 text-left">
              <div class="form-group mb-1">
                <label for>
                  Alamat
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input
                  type="text"
                  name="alamat_1"
                  v-model="info.alamat_1"
                  class="form-control text-uppercase"
                  autocomplete="off"
                >
              </div>
            </div>

            <div class="col-sm-12 text-left">
              <div class="form-group mb-1">
                <input
                  type="text"
                  name="alamat_2"
                  v-model="info.alamat_2"
                  class="form-control text-uppercase"
                  autocomplete="off"
                >
              </div>
            </div>
            <div class="col-sm-12 text-left">
              <div class="form-group">
                <input
                  type="text"
                  name="alamat_3"
                  v-model="info.alamat_3"
                  class="form-control text-uppercase"
                  autocomplete="off"
                >
              </div>
            </div>

            <div class="col-sm-12 mb-4">
              <div class="form-groups">
                <div>
                  <label for>
                    Taraf Pekahwinan
                    <i class="fas fa-pencil-paintbrush"></i>
                  </label>
                </div>
                <div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="taraf_perkahwinan"
                        v-model="info.taraf_perkahwinan"
                        value="BELUM BERKAHWIN"
                      >Belum Berkahwin
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="taraf_perkahwinan"
                        v-model="info.taraf_perkahwinan"
                        value="BERKAHWIN"
                      >Berkahwin
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-12 col-lg-5">
              <div class="form-group">
                <label for>
                  Email
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input type="email" name="email" v-model="info.email" class="form-control" required>
              </div>
            </div>

            <div class="col-sm-12 col-lg-7">
              <div class="form-group">
                <label for>
                  No Telefon
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <div class="row">
                  <div class="col-md-5 col-sm-12 kod-phone">
                    <select v-model="info.kod_negara" class="form-control text-uppercase">
                      <option
                        v-for="(option, key) in options.kod_negara"
                        v-bind:key="key"
                        v-bind:value="option.value"
                      >{{ option.text }}</option>
                    </select>
                  </div>
                  <div class="col-md-7 col-sm-12 no-telefon">
                    
                    <input
                      type="text"
                      name="no_telefon"
                      v-model="info.no_telefon"
                      class="form-control text-uppercase"
                      autocomplete="off"
                      required
                      @focus="showtip"
                      @blur="hidetip"
                      @keypress="onlyNumber"
                    >
                    <div class='tp-telefon' :class="tooltip.telefon">Tidak perlu dimulakan dengan no 0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-3 card-shadow">
        <div class="card-header text-left">
          <div>Maklumat Pasport perjalanan / dokumen perjalanan</div>
        </div>

        <div class="card-body">
          <div class="row text-left">
            <div class="col-sm-12 col-lg-6 text-left">
              <div class="form-group">
                <label for>
                  Jenis Dokumen Perjalanan
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <select
                  v-model="info.jenis_dokumen_perjalanan"
                  class="form-control"
                  required
                  @change="changeNomborPlaceholder"
                >
                  <option value="PASSPORT">PASSPORT</option>
                  <option value="SPLP">SPLP</option>
                </select>
              </div>
            </div>

            <div class="col-sm-12 col-lg-6 text-left">
              <div class="form-group">
                <label for>
                  Nombor
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input
                  type="text"
                  name="nombor"
                  v-model="info.nombor"
                  required
                  class="form-control text-uppercase"
                  :placeholder="placeholder.nombor"
                >
              </div>
            </div>

            <div class="col-sm-12 col-lg-6 text-left">
              <div class="form-group">
                <label for>
                  Tempat / Negara Dikeluarkan
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <select v-model="info.negara_dikeluarkan" class="form-control text-uppercase">
                  <option
                    v-for="(option, key) in options.negara"
                    v-bind:key="key"
                    v-bind:value="option.value"
                  >{{ option.text }}</option>
                </select>
              </div>
            </div>

            <div class="col-sm-12 col-lg-6 text-left">
              <div class="form-group">
                <label for>Sah Sehingga</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="far fa-calendar-alt"></i>
                    </span>
                  </div>
                  <DatePicker2 v-model="info.sah_sehingga" :config="options.tarikh_sah" required></DatePicker2>
                </div>
              </div>
            </div>

            <div class="col-12"></div>

            <div class="col-12 text-uppercase mb-4"></div>
          </div>
        </div>
      </div>

      <div class="card mb-3 card-shadow">
        <div class="card-header text-left">Maklumat Tiket Perjalanan Pulang</div>
        <div class="card-body">
          <div class="row text-left">
            <div class="col-sm-12 col-lg-6">
              <div class="form-group">
                <label>Jenis Pengangkutan</label>
                <div>
                  <div
                    class="form-check-inline"
                    v-for="(option,key) in options.pengangkutan"
                    v-bind:key="key"
                  >
                    <label class="form-check-label">
                      <input
                        type="radio"
                        v-model="info.tiket_pulang.jenis_pengangkutan"
                        class="form-check-input"
                        :value="option.value"
                      >
                      {{ option.text }}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-12 col-lg-6">
              <div class="form-group">
                <label>No Tiket</label>
                <input
                  type="text"
                  v-model="info.tiket_pulang.no_tiket"
                  class="form-control text-uppercase"
                >
              </div>
            </div>
          </div>

          <div class="row text-left">
            <div class="col-sm-6 col-lg-6">
              <div class="form-group">
                <label>Tarikh Perjalanan</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="far fa-calendar-alt"></i>
                    </span>
                  </div>
                  <DatePicker2 v-model="info.tiket_pulang.tarikh" :config="options.tarikh"></DatePicker2>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-6">
              <div class="form-group">
                <label>Masa</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="far fa-calendar-alt"></i>
                    </span>
                  </div>
                  <DatePicker2 v-model="info.tiket_pulang.masa" :config="options.masa_saja"></DatePicker2>
                </div>
              </div>
            </div>
          </div>
          <div class="row text-left">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Destinasi</label>
                <input
                  type="text"
                  v-model="info.tiket_pulang.destinasi"
                  class="form-control text-uppercase"
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mt-4">
          <div class="form-group">
            <button type="submit" class="btn btn-block btn-primary">{{ button.next }}</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped src='@/assets/css/main.css'>
  
</style>


<script>
import AppHeader from "@/components/AppHeader";
import Axios from "axios";
import { API } from "../config";
import Swal from "sweetalert2";
import moment from "moment";
import DatePicker2 from "vue-bootstrap-datetimepicker";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";

require("@/assets/css/main.css");

export default {
  name: "pendaftaran",
  data: function() {
    return {
      mode: "baru",
      ref: {
        register_id: "",
        temporary_id: ""
      },
      placeholder: {
        nombor: "NOMBOR PASSPORT"
      },
      tooltip: {
        telefon: 'd-none'
      },
      button: {
        next: "Seterusnya"
      },
      options: {
        tarikh: {
          format: "D MMMM YYYY",
        },
        tarikh_sahaja: {
          format: "D MMMM YYYY",
          maxDate: new Date()
        },
        tarikh_sah: {
          format: "D MMMM YYYY",
          minDate: moment().add(30, "days")
        },
        masa_saja: {
          format: "LT"
        },
        pengangkutan: [
          { text: "KERETA, KERETAPI, BAS", value: "KERETA, KERETAPI, BAS" },
          { text: "KAPAL TERBANG", value: "KAPAL TERBANG" },
          { text: "FERI, KAPAL", value: "FERI, KAPAL" }
        ],
        kod_negara: [
          { text: "MALAYSIA (60)", value: "60" },
          { text: "INDONESIA (62)", value: "62" },
          { text: "BANGLADESH (880)", value: "880" },
          { text: "MYANMAR (95)", value: "95" },
          { text: "NEPAL (977)", value: "977" },
          { text: "VIETNAM (84)", value: "84" },
          { text: "THAILAND (66)", value: "66" },
          { text: "LAOS (856)", value: "856" },
          { text: "KEMBOJA (855)", value: "855" },
          { text: "PHILIPINA (63)", value: "63" },
          { text: "CHINA (86)", value: "86" },
          { text: "INDIA (91)", value: "91" },
          { text: "PAKISTAN (92)", value: "92" },
          { text: "SRI LANKA (94)", value: "94" },
          { text: "KAZAKHSTAN (7)", value: "7" },
          { text: "UZBEKISTAN (998)", value: "998" },
          { text: "TURKMENISTAN (993)", value: "993" }
        ],
        negara: [
          { text: "INDONESIA", value: "INDONESIA" },
          { text: "BANGLADESH", value: "BANGLADESH" },
          { text: "MYANMAR", value: "MYANMAR" },
          { text: "NEPAL", value: "NEPAL" },
          { text: "VIETNAM", value: "VIETNAM" },
          { text: "THAILAND", value: "THAILAND" },
          { text: "LAOS", value: "LAOS" },
          { text: "KEMBOJA", value: "KEMBOJA" },
          { text: "PHILIPINA", value: "PHILIPINA" },
          { text: "CHINA", value: "CHINA" },
          { text: "INDIA", value: "INDIA" },
          { text: "PAKISTAN", value: "PAKISTAN" },
          { text: "SRI LANKA", value: "SRI LANKA" },
          { text: "KAZAKHSTAN", value: "KAZAKHSTAN" },
          { text: "UZBEKISTAN", value: "UZBEKISTAN" },
          { text: "TURKMENISTAN", value: "TURKMENISTAN" }
        ]
      },
      info: {
        nama: "",
        jantina: "LELAKI",
        tempat_lahir: "INDONESIA",
        tarikh_lahir: moment(new Date(), "YYYY-MM-DD").format("D MMMM YYYY"),
        warganegara: "INDONESIA",
        pekerjaan: "",
        alamat_1: "",
        alamat_2: "",
        alamat_3: "",
        taraf_perkahwinan: "BELUM BERKAHWIN",
        email: "",
        kod_negara: "60",
        no_telefon: "",
        jenis_dokumen_perjalanan: "PASSPORT",
        nombor: "",
        negara_dikeluarkan: "INDONESIA",
        sah_sehingga: "",
        tiket_pulang: {
          jenis_pengangkutan: ""
        }
      }
    };
  },
  components: {
    DatePicker2,
    AppHeader
  },
  mounted() {
    if (this.$route.query.rid && this.$route.query.tid) {
      this.ref.register_id = this.$route.query.rid;
      this.ref.temporary_id = this.$route.query.tid;
      Axios.get(
        API.baseurl +
          "register/info?regid=" +
          this.$route.query.rid +
          "&tempid=" +
          this.$route.query.tid
      ).then(response => {
        this.mode = "edit";
        let resp = response.data.response;
        this.button.next = "Kemaskini dan Seterusnya";
        this.info = resp.data_pemohon;
      });
    }
  },
  methods: {
    showtip: function(){
      this.tooltip.telefon = ''
    },
    hidetip: function(){
      this.tooltip.telefon = 'd-none'
    },
    getFormValues: function() {
      if (this.mode == "baru") {
        Axios.post(API.baseurl + "register/new", {
          headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
          },
          body: this.info
        }).then(response => {
          let resp = response.data.response;
          // window.location.href =
          //   "./payment/" + resp.register_id + "/" + resp.temporary_id;
        });
      } else {
        this.kemaskiniMaklumat();
      }
    },
    changeNomborPlaceholder: function() {
      let dokumen = this.info.jenis_dokumen_perjalanan;
      switch (dokumen) {
        case "PASSPORT":
          this.placeholder.nombor = "NOMBOR PASSPORT";
          break;
        case "SPLP":
          this.placeholder.nombor = "NOMBOR SPLP";
      }
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    kemaskiniMaklumat: function() {
      Axios.post(API.baseurl + "register/updateinfo", {
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          input: this.info,
          ref: this.ref
        }
      }).then(response => {
        let resp = response.data.response;
        if (resp.payment.status == "paid") {
          Swal.fire({
            title: "Success!",
            text: "Compound has been paid",
            type: "success",
            confirmButtonText: "View ticket"
          }).then(() => {
            this.$router.push({
              name: "ticket",
              params: {
                register_id: resp.register_id,
                temporary_id: resp.temporary_id
              }
            });
          });
        } else {
          Swal.fire({
            title: "Success!",
            text: "Personal particular has been updated!",
            type: "success",
            confirmButtonText: "Proceed to payment options!"
          }).then(function() {
            window.location.href =
              "./payment/" + resp.register_id + "/" + resp.temporary_id;
          });
        }
      });
    }
  }
};
</script>

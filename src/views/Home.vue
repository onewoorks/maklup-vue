<template>
  <div class="container mb-3">
    <AppHeader title="PULKAM 2019" subHeader="Pendaftaran atas talian"/>

    <div class="row">
      <div class="col-sm-12 col-md-6">
        <div class="card h-100 card-shadow">
          <div class="card-body">
            <h3>Pendaftaran Baru</h3>
            <div class="btn btn-primary mt-3" @click="goToPendaftaran">Daftar Maklumat</div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="card h-100 card-shadow">
          <div class="card-body">
            <h3>Kemaskini Maklumat</h3>
            <div class="mt-4">
              <form @submit.prevent="submitFormKemaskini">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" style="width:90px">Email</span>
                  </div>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email yang di daftar"
                    v-model="email"
                  >
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" style="width:90px">Id</span>
                  </div>
                  <input type="text" class="form-control" placeholder="Nombor seperti di dalam sms" v-model="code">
                </div>

                <div class="text-right">
                  <button type="submit" class="btn btn-primary">Semak Daftar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import { API } from "../config";
import Axios from "axios";

export default {
  name: "home",
  components: {
    AppHeader: AppHeader
  },
  data() {
    return {
      test: API.baseurl,
      email: "",
      code: ""
    };
  },
  methods: {
    goToPendaftaran: function() {
      // this.$router.push({

      // })
      window.location.href = "./pendaftaran";
    },
    submitFormKemaskini: function() {
      Axios.get(
        API.baseurl +
          "register/reopen?email=" +
          this.email +
          "&code=" +
          this.code
      ).then(response => {
        if (response.data.response == false) {
          alert("Not Found");
        } else {
          let resp = response.data.response;
          window.location.href =
            "./pendaftaran?rid=" +
            resp.register_id +
            "&tid=" +
            resp.temporary_id;
        }
      });
    },
    kemaskiniMaklumat: function() {}
  }
};
</script>

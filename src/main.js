import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

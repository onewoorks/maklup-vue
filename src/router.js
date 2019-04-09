import Vue from 'vue'
import Router from 'vue-router'
import Pendaftaran from './views/Pendaftaran.vue'
import Home from './views/Home.vue'
import Payment from './views/Payment'
import PaymentBankTransfer from './views/Payment_Bank_Transfer'
import Callback from './views/Callback'
import PaymentBt from './views/PaymentBt'
import Ticket from './views/Ticket'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pendaftaran',
      name: 'pendaftaran',
      component: Pendaftaran
    },
    {
      path: '/payment/:register_id/:temporary_id',
      name: 'payment',
      component: Payment
    },
    {
      path: '/payment_bank_transfer/:register_id/:temporary_id',
      name: 'payment_bank_transfer',
      component: PaymentBankTransfer
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },
    {
      path: '/payment_bt/:register_id/:temporary_id',
      name: 'payment_bt',
      component: PaymentBt
    },
    {
      path: '/ticket/:register_id/:temporary_id',
      name: 'ticket',
      component: Ticket
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

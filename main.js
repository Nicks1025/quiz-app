import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'    //this.$http.post
import VueRouter from 'vue-router'
import VueSession from 'vue-session'

import 'bootstrap/dist/css/bootstrap.min.css'

import Routes from "./router/router"
Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueSession)

const router = new VueRouter({
  routes : Routes,
  mode:"history"
})


new Vue({
  el: '#app',
  render: h => h(App),
  router : router
})

import Vue from 'vue'
import store from './store'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import VueSession from 'vue-session'

Vue.use(VueSession)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  el: '#app',
  router
})

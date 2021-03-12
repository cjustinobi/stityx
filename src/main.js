import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axiosInstance from './axios'
import { formatCurrency } from './utils/common'


import Default from './layouts/default'
import Dashboard from './layouts/dashboard'
Vue.component('default-layout', Default)
Vue.component('dashboard-layout', Dashboard)

import 'ant-design-vue/dist/antd.css'
import './assets/css/bootstrap.css'
import './assets/css/all.css'
import './assets/css/style.css'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.filter('currency', formatCurrency)

Vue.prototype.$http = axiosInstance

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

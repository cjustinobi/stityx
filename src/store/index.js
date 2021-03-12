import Vue from 'vue'
import Vuex from 'vuex'
import nav from './modules/nav'
import cart from './modules/cart'
import furniture from './modules/furniture'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    nav,
    cart,
    furniture
  }
})

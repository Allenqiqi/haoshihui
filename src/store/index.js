import Vue from 'vue'
import Vuex from 'vuex'
import cartModule from './modules/cart'
import savePlugin from './plugins/save'
import userModule from './modules/user'
import Plugin from './plugins/plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [savePlugin, Plugin],
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart: cartModule,
    user: userModule
  }
})

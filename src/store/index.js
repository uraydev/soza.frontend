import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import account from './modules/account'
import map from './modules/map'
import user from './modules/user'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedAppTitle: 'Soza'
  },
  mutations: {
    setLoadedAppTitle (state, title) { state.loadedAppTitle = title }
  },
  actions: {
    loadAppTitle ({ commit }, title) { commit('setLoadedAppTitle', title) }
  },
  getters: {
    getLoadedAppTitle: state => state.loadedAppTitle
  },
  modules: { common, account, map, user },
  strict: debug
})

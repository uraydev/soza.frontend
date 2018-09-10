import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import common from './modules/common'
import account from './modules/account'
import guest from './modules/guest'
import map from './modules/map'
import point from './modules/point'
import user from './modules/user'
import participation from './modules/participation'
import dialog from './modules/dialog'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    store => {
      store.subscribeAction((action, state) => {
        store.commit('setLoading', action.type)
        // store.commit('clearMessage')
      })
    }
  ],
  state: {
    loadedAppTitle: 'Моя Открытая Свободная Территория'
  },
  mutations: {
    [types.SET_LOADED_APP_TITLE] (state, title) {
      Vue.set(state, 'loadedAppTitle', title)
    }
  },
  actions: {
    loadAppTitle ({ commit }, title) {
      commit('setLoadedAppTitle', title)
      commit('setLoaded', 'loadAppTitle')
    }
  },
  getters: {
    getLoadedAppTitle: state => state.loadedAppTitle
  },
  modules: {
    common,
    account,
    guest,
    map,
    point,
    user,
    participation,
    dialog
  },
  strict: debug
})

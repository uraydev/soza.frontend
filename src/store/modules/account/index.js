import Vue from 'vue'
import auth from './auth'
import * as types from '../../types'

export default {
  state: {
    loadedAccount: null,
    loadedFollowedMaps: null
  },
  mutations: {
    [types.SET_LOADED_ACCOUNT] (state, payload) {
      Vue.set(state, 'loadedAccount', payload)
    }
  },
  actions: {
    async followMap ({ commit }, mapId) {},
    async loadFollowedMaps ({ commit }) {}
  },
  getters: {
    isSignedIn: state => !!state.loadedAccount,
    getLoadedAccount: state => state.loadedAccount
  },
  modules: { auth }
}

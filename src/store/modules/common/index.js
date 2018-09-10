import Vue from 'vue'
import * as types from '../../types'
import { database, storage } from 'firebase'

const debug = process.env.NODE_ENV !== 'production'

export default {
  state: {
    appTitle: '',
    loading: [],
    message: null,
    snack: null
  },

  mutations: {
    [types.SET_APP_TITLE] (state, title) {
      Vue.set(state, 'appTitle', title)
    },

    [types.SET_LOADING] (state, processName) {
      Vue.set(state, 'loading', [...state.loading, processName])
    },

    [types.SET_LOADED] ({ loading }, processName) {
      const idx = loading.indexOf(processName)
      if (idx !== -1) {
        Vue.delete(loading, idx)
      }
    },

    [types.SET_MESSAGE] (state, message) {
      if (debug) {
        console.log(message)
      }
      Vue.set(state, 'message', message)
    },

    [types.CLEAR_MESSAGE] (state) {
      Vue.set(state, 'message', null)
    },

    [types.SET_SNACK] (state, message) {
      Vue.set(state, 'snack', message)
    },

    [types.CLEAR_SNACK] (state) {
      Vue.set(state, 'snack', null)
    }
  },
  actions: {
    async updateAppTitle ({ commit }, title) {
      commit('setAppTitle', title)
      commit('setLoaded', 'updateAppTitle')
    },

    clearMessage ({ commit }) {
      commit('clearMessage')
      commit('setLoaded', 'clearMessage')
    },

    clearSnack ({ commit }) {
      commit('clearSnack')
      commit('setLoaded', 'clearSnack')
    },

    async saveRefImage ({ commit }, { image, path, key }) {
      if (!image) return
      try {
        const ext = image.name.split('.').pop()
        const fileData = await storage()
          .ref(`${path}/${key}.${ext}`)
          .put(image)
        await database()
          .ref(`${path}/${key}`)
          .update({ imageURL: fileData.metadata.downloadURLs[0] })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'saveRefImage')
    }
  },

  getters: {
    getAppTitle: state => state.appTitle,
    loading: state => processName => state.loading.includes(processName),
    loaded: state => processName => !state.loading.includes(processName),
    loadedAll: state => (state.loading.length === 0),
    getMessage: state => state.message,
    getSnack: state => state.snack
  }
}

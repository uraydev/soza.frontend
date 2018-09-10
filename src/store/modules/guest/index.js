import Vue from 'vue'
// import axios from 'axios'
// import config from '@/middlewares/config'
import * as types from '../../types'

// const HTTP = axios.create({
//   headers: {
//     'Content-Security-Policy': "default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com"
//   }
// })

export default {
  state: {
    definedGuestLocation: null,
    definedGuestMeta: null
  },
  mutations: {
    [types.SET_DEFINED_GUEST_LOCATION] (state, location) {
      Vue.set(state, 'definedGuestLocation', location)
    },
    [types.SET_DEFINED_GUEST_META] (state, location) {
      Vue.set(state, 'definedGuestMeta', location)
    }
  },
  actions: {
    async defineGuestLocationWithBrowser ({ commit }) {
      try {
        const geo = navigator.geolocation
        if (geo) {
          await geo.getCurrentPosition(({ coords }) => {
            const { latitude: lat, longitude: lng, accuracy } = coords
            commit('setDefinedGuestLocation', { lat, lng, accuracy })
          })
        }
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'defineGuestLocationWithBrowser')
    },

    async defineGuestLocationWithAPI ({ commit }) {
      try {
        // const { data } = await axios.post(
        //   `https://www.googleapis.com/geolocation/v1/geolocate?key=${config.gmap.key}`
        // )
        // const { location: { lat, lng }, accuracy } = data
        // commit('setDefinedGuestLocation', { lat, lng, accuracy })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'defineGuestLocation')
    },

    async defineGuestMeta ({ commit, getters }, terrianName) {
      try {
        // const { data } = await HTTP.get(
        //   `https://maps.googleapis.com/maps/api/geocode/json?address=${terrianName}&key=${config.gmap.key}`
        // )
        // commit('setDefinedGuestMeta', data)
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'defineGuestMeta')
    }
  },
  getters: {
    getDefinedGuestLocation: state => state.definedGuestLocation,
    getDefinedGuestMeta: state => state.definedGuestMeta
  }
}

import Vue from 'vue'
import * as types from '../../types'
import { database } from 'firebase'

export default {
  state: {
    loadedUserData: null,
    loadedUserMaps: null,
    loadedUserParticipating: null
  },
  mutations: {
    [types.SET_LOADED_USER_DATA] (state, payload) {
      Vue.set(state, 'loadedUserData', payload)
    },
    [types.SET_LOADED_USER_MAPS] (state, payload) {
      Vue.set(state, 'loadedUserMaps', payload)
    },
    [types.SET_LOADED_USER_PARTICIPATING] (state, value) {
      Vue.set(state, 'loadedUserParticipating', value)
    }
  },
  actions: {
    async loadUserData ({ commit, dispatch }, uid) {
      try {
        await database()
          .ref(`/users/${uid}`)
          .on('value', snapshot => {
            const profileData = snapshot.val()
            profileData.uid = uid
            commit('setLoadedUserData', profileData)
          })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'loadUserData')
    },

    async loadUserMaps ({ commit }, userId) {
      try {
        // const maps = await WP.collection(
        //   'maps', { author: userId, context: 'embed' }
        // )
        // commit('setLoadedUserMaps', maps)
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'loadUserMaps')
    },

    async loadUserParticipating ({ commit, getters }, uid) {
      try {
        const data = await database()
          .ref(`participation/${uid}`)
          .once('value')
        const maps = []
        Object
          .keys(data.val())
          .forEach(async key => {
            const map = await database()
              .ref(`maps/${key}`)
              .once('value')
            maps.push(map.val())
          })
        commit('setLoadedUserParticipating', maps)
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'loadUserParticipating')
    }
  },
  getters: {
    getLoadedUserData: state => state.loadedUserData,
    getLoadedUserMaps: state => state.loadedUserMaps,
    getLoadedUserParticipating: state => state.loadedUserParticipating
  }
}

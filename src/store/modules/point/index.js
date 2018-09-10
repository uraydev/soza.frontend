import Vue from 'vue'
import { database } from 'firebase'
import * as types from '../../types'

export default {
  state: {
    createdMapPoint: null,
    loadedMapPoint: null,
    loadedMapPointComments: null
  },

  mutations: {
    [types.SET_CREATED_MAP_POINT] (state, payload) {
      Vue.set(state, 'createdMapPoint', payload)
    },
    [types.SET_LOADED_MAP_POINT] (state, payload) {
      Vue.set(state, 'loadedMapPoint', payload)
    },
    [types.SET_LOADED_MAP_POINT_COMMENTS] (state, payload) {
      Vue.set(state, 'loadedMapPointComments', payload)
    }
  },

  actions: {
    async createMapPoint ({ commit, dispatch }, payload) {
      try {
        const index = await database()
          .ref(`points/${payload.mapId}`)
          .push({
            created: database.ServerValue.TIMESTAMP,
            updated: database.ServerValue.TIMESTAMP,
            metrics: {
              likes: 0,
              visits: 0,
              shares: 0
            },
            author: payload.author,
            caption: payload.caption,
            comments: payload.comments,
            location: payload.location,
            title: payload.title,
            status: 1
          })
        await dispatch('saveRefImage', {
          image: payload.image,
          path: `points/${payload.mapId}/`,
          key: index.key
        })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'createMapPoint')
    },

    async dynamicMapPoint ({ commit }, payload) {
      try {
        await database()
          .ref(`points/${payload.mapId}`)
          .child(payload.pointId)
          .update({
            dynamic: true,
            interval: 60000
          })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'dynamicMapPoint')
    },

    async checkedMapPoint ({ commit }, payload) {
      try {
        await database()
          .ref(`points/${payload.mapId}`)
          .child(payload.pointId)
          .update({
            checker: payload.uid,
            geolocation: payload.geolocation,
            datetime: payload.datetime,
            confirmation: false,
            poll: false
          })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'checkedMapPoint')
    },

    async eventedMapPoint ({ commit }, payload) {
      try {
        await database()
          .ref(`points/${payload.mapId}`)
          .child(payload.pointId)
          .update({
            expirationDate: payload.expirationDate,
            tickets: {},
            purchased: 0,
            available: payload.available,
            participants: {}
          })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'eventedMapPoint')
    },

    async orderedMapPoint ({ commit }, payload) {
      try {
        await database()
          .ref(`points/${payload.mapId}`)
          .child(payload.pointId)
          .push({
            stage: 0
          })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'orderedMapPoint')
    },

    async chargeableMapPoint ({ commit }, payload) {
      try {
        await database()
          .ref(`points/${payload.mapId}`)
          .child(payload.pointId)
          .push({
            price: 0,
            payment: 0
          })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'chargeableMapPoint')
    },

    async loadMapPoint ({ commit }, payload) {
      try {
        await database()
          .ref(`points/${payload.mapId}/${payload.pointId}`)
          .on('value', snapshot => {
            commit('setLoadedMapPoint', snapshot.val())
          })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'loadMapPoint')
    }
  },

  getters: {
    getCreatedMapPoint: state => state.createdMapPoint,
    getLoadedMapPoint: state => state.loadedMapPoint
  }
}

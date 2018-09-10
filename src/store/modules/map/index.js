import Vue from 'vue'
import { database, storage } from 'firebase'
import 'firebase/firestore'
import * as types from '../../types'

export default {
  state: {
    loadedMapList: null,
    loadedMap: null,
    mapCenter: null,
    loadedMapPoints: null,
    loadedMapParticipants: null,
    mapViewMode: true
  },

  mutations: {
    [types.SET_LOADED_MAP_LIST] (state, payload) {
      Vue.set(state, 'loadedMapList', payload)
    },
    [types.SET_LOADED_MAP] (state, payload) {
      Vue.set(state, 'loadedMap', payload)
    },
    [types.SET_LOADED_MAP_POINTS] (state, payload) {
      Vue.set(state, 'loadedMapPoints', payload)
    },
    [types.SET_LOADED_MAP_PARTICIPANTS] (state, value) {
      Vue.set(state, 'loadedMapParticipants', value)
    },
    [types.SET_MAP_CENTER] (state, value) {
      Vue.set(state, 'mapCenter', value)
    },
    [types.SET_MAP_VIEW_MODE] (state, value) {
      Vue.set(state, 'mapViewMode', value)
    }
  },

  actions: {
    async loadMap ({ commit }, mapId) {
      try {
        const snapshot = await database()
          .ref(`maps/${mapId}`)
          .once('value')
        const data = snapshot.val()
        data.id = mapId
        commit('setLoadedMap', data)
        commit('setLoaded', 'loadMap')
      } catch (error) {
        commit('setMessage', error)
        commit('setLoaded', 'loadMap')
      }
    },

    async loadMapPoints ({ commit }, mapId) {
      try {
        await database()
          .ref(`points/${mapId}`)
          .on('value', function (snapshot) {
            const points = []
            const obj = snapshot.val()
            for (let key in obj) {
              if (obj.hasOwnProperty(key)) {
                points.push({
                  author: obj[key].author,
                  caption: obj[key].caption,
                  comments: obj[key].comments,
                  location: obj[key].location,
                  title: obj[key].title,
                  type: obj[key].type,
                  status: obj[key].status,
                  created: obj[key].created
                })
              }
            }
            commit('setLoadedMapPoints', points)
          })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'loadMapPoints')
    },

    async loadMapParticipants ({ commit, getters }, mapId) {
      try {
        await database()
          .ref(`participants/${mapId}`)
          .on('value', function (snapshot) {
            const users = []
            const obj = snapshot.val()
            for (let uid in obj) {
              if (obj.hasOwnProperty(uid)) {
                const user = database
                  .ref('users')
                  .child(uid)
                users.push(user.val())
              }
            }
            commit('setLoadedMapParticipants', users)
          })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'loadMapParticipants')
    },

    updateMapCenter ({ commit }, value) {
      commit('setMapCenter', value)
      commit('setLoaded', 'updateMapCenter')
    },

    async createMap ({ commit }, payload) {
      try {
        const map = await database()
          .ref('maps')
          .push({
            created: database.ServerValue.TIMESTAMP,
            updated: database.ServerValue.TIMESTAMP,
            metrics: {
              stars: 0,
              points: 0,
              participants: 0
            },
            activity: payload.activity,
            caption: payload.caption,
            description: payload.description,
            name: payload.name,
            owner: payload.owner,
            privacy: payload.privacy,
            terrian: payload.terrian,
            type: payload.type,
            zoom: payload.zoom
          })
        const { image } = payload
        const ext = image.name.split('.').pop()
        const fileData = await storage()
          .ref('maps')
          .child(`${map.key}.${ext}`)
          .put(image)
        await database()
          .ref('maps')
          .child(map.key)
          .update({ imageURL: fileData.metadata.downloadURLs[0] })

        commit('setMessage', {
          code: 'maps/created',
          type: 'success',
          message: `${map.name} успешно создана.`
        })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'createMap')
    },

    async loadMapList ({ commit }) {
      try {
        await database().ref('maps').on('value', function (snapshot) {
          const maps = []
          const obj = snapshot.val()
          for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              maps.push({
                id: key,
                activity: obj[key].activity,
                caption: obj[key].caption,
                name: obj[key].name,
                imageURL: obj[key].imageURL,
                privacy: obj[key].privacy,
                terrian: obj[key].terrian,
                type: +obj[key].type
              })
            }
          }
          commit('setLoadedMapList', maps)
        })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'loadMapList')
    }
  },

  getters: {
    getLoadedMap: state => state.loadedMap,
    getMapCenter: state => state.mapCenter,
    getLoadedMapPoints: state => state.loadedMapPoints,
    getLoadedMapParticipants: state => state.loadedMapParticipants,
    getLoadedMapList: state => state.loadedMapList,
    isMapViewMode: state => state.mapViewMode,
    isUserParticipateMap: state => mapId => {
      return database()
        .ref(`participation/${state.loadedAccount.uid}/${mapId}`)
        .exists()
    }
  }
}

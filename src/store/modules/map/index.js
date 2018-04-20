import WP from '@/lib/wp'
import point from './point'

export default {
  state: {
    loadedMap: null,
    loadedMapPoints: null,
    loadedMapOwner: {},
    loadedMapFollowers: [],
    loadedMapList: []
  },
  mutations: {
    setLoadedMap (state, payload) { state.loadedMap = payload },
    serLoadedMapPoints (state, payload) { state.loadedMapPoints = payload },
    setLoadedMapOwner (state, payload) { state.loadedMapOwner = payload },
    setLoadedMapFollowers (state, payload) { state.loadedMapFollowers = payload },
    setLoadedMapList (state, payload) { state.loadedMapList = payload }
  },
  actions: {
    async loadMapInfo ({ state, getters, commit, dispatch }, mapId) {
      commit('setLoading', true)
      try {
        const { data, thumb, points } = await WP.map(mapId)
        if (!data) return
        getters.preparePointLocation(data.acf.center)
        points.map(
          point => getters.preparePointLocation(point.acf.location)
        )
        commit('setLoadedMap', {...data, thumb, points})
        await dispatch('loadMapOwner', data.author)
        commit('setLoading', false)
      } catch (error) {
        throw new Error(error)
      }
    },
    async loadMapOwner ({ commit }, ownerId) {
      commit('setLoading', true)
      try {
        const {
          data: { id, name, slug, avatar_urls: avatar }
        } = await WP.userById(ownerId)
        console.log(avatar[96])
        commit('setLoadedMapOwner', { id, name, slug, avatar: avatar[96] })
        commit('setLoading', true)
      } catch (error) {
        throw new Error(error)
      }
    },
    async loadMapList ({ commit }) {
      commit('setLoading', true)
      try {
        const {
          data: items
        } = await WP.collection('maps', { context: 'embed' })
        commit('setLoadedMapList', items)
        commit('setLoading', false)
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  getters: {
    // Map
    getLoadedMapTitle: state => state.loadedMap.title,
    getLoadedMapThumbnail: state => {
      console.log({ ...state.loadedMap.thumb.guid })
      return state.loadedMap.thumb.guid
    },
    getLoadedMapCaption: state => state.loadedMap.excerpt,
    getLoadedMapDescription: state => state.loadedMap.content,
    getLoadedMapCenter: (state) => state.loadedMap.acf.center,
    getLoadedMapZoom: state => +state.loadedMap.acf.zoom,
    // Points
    getLoadedMapPoints: state => state.loadedMapPoints,
    // Owner
    getLoadedMapOwner: state => state.loadedMapOwner,
    getLoadedMapOwnerName: state => state.loadedMapOwner.name,
    getLoadedMapOwnerSlug: state => state.loadedMapOwner.slug,
    getLoadedMapOwnerAvatar: state => state.loadedMapOwner.avatar,
    getLoadedMapOwnerId: state => state.loadedMapOwner.id,
    // List
    getLoadedMapList: state => state.loadedMapList,
    // Utils
    preparePointLocation: state => locationObj => {
      locationObj.lat *= 1
      locationObj.lng *= 1
      return locationObj
    }
  },
  modules: { point }
}

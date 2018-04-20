import WP from '@/lib/wp'

export default {
  state: {
    loadedMapPoint: null,
    loadedMapPointComments: null,
    loadedMapPointOwner: null
  },
  mutations: {
    setLoadedMapPoint (state, payload) { state.loadedMapPoint = payload },
    setLoadedMapPointComments (state, payload) {
      state.loadedMapPointComments = payload
    }
  },
  actions: {
    async loaMapPoint ({ commit }, commentId) {
      commit('setLoading', true)
      try {
        const { data } = await WP.comment(commentId)
        commit('setLoadedMapPoint', data)
        commit('setLoading', true)
      } catch (error) {
        throw new Error(error)
      }
    },
    async loadMapPointComments ({ commit }, parent) {
      commit('setLoading', true)
      try {
        const { data: items } = await WP.collection('comments', { parent })
        commit('setLoadedMapPointComments', items)
        commit('setLoading', true)
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  getters: {
    getLoadedMapPointTitle: state => state.loadedMapPoint.title,
    getLoadedMapPointLocation: (state) => state.loadedMapPoint.acf.center,
    getLoadedMapPointOwner: state => state.loadedMapPointOwner,
    getLoadedMapPointComments: state => state.loadedMapPointComments
  }
}

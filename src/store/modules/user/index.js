import WP from '@/lib/wp'

export default {
  state: {
    loadedUserData: null,
    loadedUserMaps: null
  },
  mutations: {
    setLoadedUserData (state, payload) { state.loadedUserData = payload },
    setLoadedUserMps (state, payload) { state.loadedUserMaps = payload }
  },
  actions: {
    async loadUserData ({ commit, dispatch }, username) {
      commit('setLoading', true)
      try {
        const data = await WP.userBySlug(username)
        commit('setLoadedUserData', data)
        commit('setLoading', false)
        dispatch('loadUserMaps', data.ID)
      } catch (error) {
        throw new Error(error)
      }
    },
    async loadUserMaps ({ commit }, userId) {
      commit('setLoading', true)
      try {
        const maps = await WP.collection(
          'maps', { author: userId, context: 'embed' }
        )
        commit('setLoadedUserMaps', maps)
        commit('setLoading', false)
      } catch (error) {
        throw new Error(error)
      }
    }

  },
  getters: {
    getLoadedUserData: state => state.loadedUserData,
    getLoadedUserMaps: state => state.loadedUserMaps
  }
}

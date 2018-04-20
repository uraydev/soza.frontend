import WP from '@/lib/wp'
import settings from './settings'

export default {
  state: {
    loadedAccount: null
  },
  mutations: {
    setLoadedAccount (state, payload) { state.loadedAccount = payload }
  },
  actions: {
    async loadAccount ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      try {
        const { data: response } = await WP.authorize(payload)
        commit('setLoadedAccount', response)
        commit('setLoading', false)
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  getters: {
    getLoadedAccountToken: state => state.loadedAccount.token,
    getLoadedAccountSlug: state => state.loadedAccount.user_nickname,
    getLoadedAccountId: state => state.loadedAccount.user_id
  },
  modules: { settings }
}

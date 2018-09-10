import { database } from 'firebase'

export default {
  actions: {
    async participateMap ({ commit, getters, dispatch }, mapId) {
      try {
        const uid = getters.getLoadedAccount.uid
        await Promise.all([
          database().ref(`participation/${uid}/${mapId}`).set(true),
          database().ref(`participants/${mapId}/${uid}`).set(true),
          database().ref(`maps/${mapId}/metrics/participants`).transaction(v => v + 1),
          database().ref(`users/${uid}/metrics/participation`).transaction(v => v + 1)
        ])
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'participateMap')
    },

    async refuseParticipateMap ({ commit, getters, dispatch }, mapId) {
      try {
        const uid = getters.getLoadedAccount.uid
        await Promise.all([
          database().ref(`participation/${uid}/${mapId}`).remove(),
          database().ref(`participants/${mapId}/${uid}`).remove(),
          database().ref(`maps/${mapId}/metrics/participants`).transaction(v => v - 1),
          database().ref(`users/${uid}/metrics/participation`).transaction(v => v - 1)
        ])
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'refuseParticipateMap')
    }
  }
}

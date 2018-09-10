import Vue from 'vue'
import * as types from '../../types'

export default {
  state: {
    dialogActivity: false,
    dialogComponent: '',
    dialogTitle: ''
  },
  mutations: {
    [types.SET_DIALOG_ACTIVITY] (state, value) {
      Vue.set(state, 'dialogActivity', value)
    },
    [types.SET_DIALOG_COMPONENT] (state, componentName) {
      Vue.set(state, 'dialogComponent', componentName)
    },
    [types.SET_DIALOG_TITLE] (state, title) {
      Vue.set(state, 'dialogTitle', title)
    }
  },
  actions: {
    createDialog ({ commit }, { title, component, active }) {
      commit('setDialogTitle', title)
      commit('setDialogComponent', component)
      commit('setDialogActivity', active)
      commit('setLoaded', 'createDialog')
    }
  },
  getters: {
    getDialogActivity: state => state.dialogActivity,
    getDialogComponent: state => state.dialogComponent,
    getDialogTitle: state => state.dialogTitle
  }
}

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import config from 'config';
import Vue from 'vue'
import VueLodash from 'vue-lodash'
import * as firebase from 'firebase'
import App from './App'
import router from './router'
import store from './store'
import './middlewares/filters'
import './middlewares/mixins'
import './middlewares/vuetify'
import './middlewares/validation'
import './middlewares/localstorage'
import './middlewares/components'

Vue.config.productionTip = false

Vue.use(VueLodash)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp(this.$config.get('firebase'))
    this.$store.dispatch('signInAuto')
  }
})()

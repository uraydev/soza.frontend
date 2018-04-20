// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import config from 'config';
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
// import SuiVue from 'semantic-ui-vue'
// import 'semantic-ui-css/semantic.min.css'
import * as GoogleMaps from 'vue2-google-maps'
import App from './App'
import router from './router'
import store from './store'
import utils from './mixins/utils'
import CapitalizeFilter from './filters/capitalize'
import UppercaseFilter from './filters/uppercase'
import LowercaseFilter from './filters/lowercase'
import DateFilter from './filters/date'
import TimeFilter from './filters/time'
import RoundFilter from './filters/round'
import RenderFilter from './filters/render'
import StarRating from 'vue-star-rating'

Vue.component('star-rating', StarRating)

// filters
Vue.filter('capitalize', CapitalizeFilter)
Vue.filter('uppercase', UppercaseFilter)
Vue.filter('lowercase', LowercaseFilter)
Vue.filter('date', DateFilter)
Vue.filter('time', TimeFilter)
Vue.filter('round', RoundFilter)
Vue.filter('render', RenderFilter)

// Vue.use(Vuetify, { theme: store.getters.getAccountTheme })
Vue.use(Vuetify)
// Vue.use(SuiVue)
Vue.use(GoogleMaps, store.getters.getMapSettings)
Vue.config.productionTip = false
Vue.mixin(utils)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})()

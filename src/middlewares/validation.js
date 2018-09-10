import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  locale: 'ru',
  events: 'change|blur'
})

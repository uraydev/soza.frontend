import store from '../store'

export default date => date.toLocaleTimeString(
  store.getters.getAccountLocale, store.getters.getAccountDateFormat
)

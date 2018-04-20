import store from '../store'

export default date => date.toLocaleDateString(
  store.getters.getAccountLocale, store.getters.getAccountDateFormat
)

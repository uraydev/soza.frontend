import store from '../store'

export default (to, from, next) => {
  if (store.getters.getLoadedAccount === null) {
    store.commit('setMessage', {
      code: 'auth/action-requires-authorization',
      type: 'warning',
      message: 'Войдите, чтобы продолжить.'
    })
    next('/auth/signin')
    return
  }
  next()
}

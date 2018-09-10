import Vue from 'vue'
import { auth, database } from 'firebase'
import * as types from '../../types'

export default {
  state: {
    recaptchaVerifier: null,
    authErrors: [
      {
        code: 'auth/email-already-in-use',
        message: 'Адрес электронной почты уже используется.'
      },
      {
        code: 'auth/wrong-password',
        message: 'Неверный пароль.'
      },
      {
        code: 'auth/user-not-found',
        message: 'Пользователь не зарегистрирован или был удален.'
      },
      {
        code: 'auth/argument-error',
        message: 'Аргумент должен быть строкой',
        type: 'warning'
      }
    ]
  },
  mutations: {
    [types.SET_RECAPTCHA_VERIFIER] (state, payload) {
      Vue.set(state, 'recaptchaVerifier', payload)
    }
  },
  actions: {
    async signUpEmailPassword ({ commit, getters, dispatch }, payload) {
      try {
        const { email, displayName, password } = payload
        const user = await auth()
          .createUserWithEmailAndPassword(email, password)
        await user.updateProfile({
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/most-db6bf.appspot.com/o/common%2Fno-user.gif?alt=media&token=63c1deee-31d5-440b-a321-e149d164fb30',
          displayName
        })
        await dispatch('createAccountProfile', user)
        await dispatch('loadAccountProfile', user.uid)
      } catch (error) {
        commit('setMessage', getters.getLocalError(error))
      }
      commit('setLoaded', 'signUpEmailPassword')
    },

    async createAccountProfile ({ commit }, user) {
      try {
        await database()
          .ref(`/users/${user.uid}`)
          .set({
            creationTime: user.metadata.creationTime,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            aboutText: ''
          })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'createAccountProfile')
    },

    async loadAccountProfile ({ commit }, uid) {
      try {
        await database()
          .ref(`/users/${uid}`).on('value', snapshot => {
            const profileData = snapshot.val()
            profileData.uid = uid
            commit('setLoadedAccount', profileData)
          })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'loadAccountProfile')
    },

    async emailSignInLink ({ commit }, { email, url }) {
      try {
        await auth().sendSignInLinkToEmail(email, {
          url, handleCodeInApp: true
        })
        commit('setMessage', {
          code: 'auth/link-sended',
          type: 'info',
          message: 'На указанный адрес электронной почты отправлена ссылка для входа в приложение.'
        })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'emailSignInLink')
    },

    async signInEmailLink ({ commit, dispatch }, { email, href }) {
      try {
        if (auth().isSignInWithEmailLink(href)) {
          const user = await auth()
            .signInWithEmailLink(email, href)
          dispatch('loadAccountProfile', user.uid)
        }
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'signInEmailLink')
    },

    async signInEmailPassword ({ commit, getters, dispatch }, { email, password }) {
      try {
        const user = await auth()
          .signInWithEmailAndPassword(email, password)
        dispatch('loadAccountProfile', user.uid)
      } catch (error) {
        commit('setMessage', getters.getLocalError(error))
      }
      commit('setLoaded', 'signInEmailPassword')
    },

    async setPersistence ({ commit }, remember) {
      try {
        const persistence = remember ? 'LOCAL' : 'SESSION'
        await auth()
          .setPersistence(auth.Auth.Persistence[persistence])
      } catch (error) {
        commit('setMessage', error)
      }
    },

    async signInAuto ({ commit, dispatch }) {
      try {
        await auth().onAuthStateChanged(user => {
          if (user) {
            dispatch('loadAccountProfile', user.uid)
          }
        })
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'signInAuto')
    },

    async signOut ({ commit }) {
      try {
        await auth().signOut()
        commit('setLoadedAccount', null)
      } catch (error) {
        commit('setMessage', error)
      }
      commit('setLoaded', 'signOut')
    },

    async sendPasswordResetEmail ({ commit }, email) {
      try {
        await auth()
          .sendPasswordResetEmail(email)
        commit('setMessage', {
          code: 'success-password-reset-email',
          message: 'Вам отправлено письмо с инструкциями о восстановлении пароля.'
        })
      } catch (error) {
        commit('setMessage', error)
      }
    },

    async initRecaptchaVerifier ({ commit }, identifier) {
      commit(
        'setRecaptchaVerifier',
        await new auth.RecaptchaVerifier(identifier, {
          'size': 'invisible'
        })
      )
    },

    async signInWithPhone ({ commit }, { phoneNumber, code }) {},

    async signUpWithPhone ({ commit, getters }, { phoneNumber, code }) {}
  },
  getters: {
    getRecaptchaVerifier: state => state.recaptchaVerifier,
    getLocalError: state => error => {
      state.authErrors
        .forEach(locale => {
          if (locale.code === error.code) {
            error.message = locale.message
            if (locale.type) {
              error.type = locale.type
            }
          }
        })
      return error
    }
  }
}

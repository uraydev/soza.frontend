import Vue from 'vue'
import * as types from '../../types'

export default {
  state: {
    loadedAccountLocale: null,
    loadedAccountTheme: null,
    loadedAccountDateFormat: null,
    loadedAccountTimeZone: null
  },
  mutations: {
    [types.SET_LOADED_ACCOUNT_LOCALE] (state, locale) {
      Vue.set(state, 'loadedAccountLocale', locale)
    },
    [types.SET_LOADED_ACCOUNT_THEME] (state, name) {
      Vue.set(state, 'loadedAccountTheme', name)
    },
    [types.SET_LOADED_ACCOUNT_DATE_FORMAT] (state, format) {
      Vue.set(state, 'loadedAccountDateFormat', format)
    }
  },
  actions: {},
  getters: {
    getAccountDateFormat: ({
      loadedAccountDateFormat: loadedFormat,
      loadedAccountTimeZone: loadedTimeZone,
      appDefaults: appValues,
      appDateFormats: formatsList
    }, getters) => {
      const format = formatsList[loadedFormat] || formatsList[appValues.dateFormat]
      const timezone = this.isValidTimeZone(loadedTimeZone) ? loadedTimeZone : appValues.timezone
      return { ...format, timezone }
    },
    getAccountLocale: ({
      loadedAccountLocale: loadedValue,
      appDefaults: appValues,
      appLocales: localesList
    }) => {
      return localesList.includes(loadedValue) ? loadedValue : appValues.locale
    },
    getAccountTheme: ({
      loadedAccountTheme: loadedValue,
      appDefaults: appValues,
      appThemes: themesList
    }) => {
      return themesList[loadedValue] || themesList[appValues.theme]
    }
  }
}

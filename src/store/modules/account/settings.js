import utils from '@/mixins/utils'

export default {
  mixins: [utils],
  state: {
    loadedAccountLocale: null,
    loadedAccountTheme: null,
    loadedAccountDateFormat: null,
    loadedAccountTimeZone: null
  },
  mutations: {
    setLoadedAccountLocale (state, locale) { state.loadedAccountLocale = locale },
    setLoadedAccountTheme (state, name) { state.loadedAccountTheme = name },
    setLoadedAccountDateFormat (state, format) { state.loadedAccountDateFormat = format }
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

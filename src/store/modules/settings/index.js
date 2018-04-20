import WP from '@/lib/wp'
import colors from 'vuetify/es5/util/colors'

export default {
  state: {
    appDefaults: {
      theme: 'soza',
      locale: 'ru',
      dateFormat: 'string',
      timezone: 'Asia/Yekaterinburg'
    },
    loadedAppDefaults: null,
    // Locale
    appLocales: ['en', 'ru'],
    appDateFormats: {
      string: {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    appThemes: {
      soza: {
        name: 'Soza',
        colors: {
          primary: colors.orange.base,
          secondary: colors.blueGrey.lighten1
        }
      },
      uray: {
        name: 'Uray.ru',
        colors: {
          primary: colors.green.lighten1,
          secondary: colors.blue.lighten1
        }
      }
    },
    appMapSettings: {
      load: {
        key: 'AIzaSyDRSvMwFP0z4FZ-UO_4KLA9Gen98dF9kiI',
        language: 'ru',
        libraries: 'places'
      }
    }
  },
  mutations: {
    addAppTheme (state, { name, options }) { state.appThemes[name] = options },
    addAppDateFormat (state, { name, options }) { state.appDateFormats[name] = options },
    addAppLocale (state, name) { state.appLocales.push(name) },
    setLoadedAppDefaults (state, payload) { state.loadedAppDefaults = payload }
  },
  actions: {
    async loadAppSettings ({ commit }) {
      commit('setLoadedAppDefaults', await WP.settings())
    }
  },
  getters: {
    getDefaults: ({ appDefaults: local, loadedAppDefaults: loaded }) => {
      return {
        theme: local.theme,
        locale: loaded.language,
        dateFormat: local.dateFormat,
        timezone: loaded.timezone
      } || local
    },
    getMapSettings: state => state.appMapSettings
  }
}

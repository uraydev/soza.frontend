import Vue from 'vue'
import VueConfig from 'vue-configuration'

const config = {
  defaults: {
    theme: 'most',
    locale: 'ru',
    dateFormat: 'string',
    timezone: 'Asia/Yekaterinburg'
  },
  dateFormats: {
    string: {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }
  },
  locales: ['en', 'ru'],
  gmap: {
    key: 'AIzaSyBBOM-M6MhdOeXckfjI6qF4N89zZhheUNc',
    language: 'ru',
    libraries: 'places',
    installComponents: true
  },
  gmapOptions: {
    disableDefaultUI: true,
    styles: [
      { stylers: [{ saturation: -80 }] },
      {
        featureType: 'poi.business',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  },
  autocomplete: {
    types: ['cities'],
    componentRestrictions: { country: 'ru' },
    language: 'ru'
  },
  firebase: {
    apiKey: 'AIzaSyBBOM-M6MhdOeXckfjI6qF4N89zZhheUNc',
    authDomain: 'most-db6bf.firebaseapp.com',
    databaseURL: 'https://most-db6bf.firebaseio.com',
    projectId: 'most-db6bf',
    storageBucket: 'gs://most-db6bf.appspot.com',
    messagingSenderId: '7471099221'
  }
}

// App config
Vue.use(VueConfig, { config })

export default config

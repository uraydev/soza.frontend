import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'http://map.uray.ru/wp-json'
})

function WpApi () {}
WpApi.prototype = {
  async collection (type, params = {}) {
    try {
      return HTTP.get(`/wp/v2/${type}`, { params })
    } catch (error) {
      return { error }
    }
  },
  async item (type, id, params = {}) {
    try {
      if (id === 'new') {
        return HTTP.post(`/wp/v2/${type}`, { params })
      }
      return HTTP.get(`/wp/v2/${type}/${id}`, { params })
    } catch (error) {
      return { error }
    }
  },
  async settings () {
    try {
      return HTTP.get('/wp/v2/settings')
    } catch (error) {
      return { error }
    }
  },
  async currentUser () {
    try {
      return HTTP.get('/wp/v2/users/me')
    } catch (error) {
      return { error }
    }
  }
}

function AcfApi () {}
AcfApi.prototype = {
  async collection (type, params = {}) {
    try {
      return HTTP.get(`/acf/v2/${type}`, { params })
    } catch (error) {
      return { error }
    }
  },
  async item (type, id, params = {}) {
    try {
      return HTTP.get(`/acf/v2/${type}/${id}`, { params })
    } catch (error) {
      return { error }
    }
  },
  async options () {
    try {
      return HTTP.get('/acf/v2/options')
    } catch (error) {
      return { error }
    }
  },
  async option (id) {
    try {
      return HTTP.get(`/acf/v2/options/${id}`)
    } catch (error) {
      return { error }
    }
  }
}

function MenusApi () {}
MenusApi.prototype = {
  async all () {
    try {
      return HTTP.get('/menus/v2/menus')
    } catch (error) {
      return { error }
    }
  },
  async getBySlug (slug) {
    try {
      return HTTP.get(`/menus/v1/menus/${slug}`)
    } catch (error) {
      return { error }
    }
  }
}

function WpfApi () {}
WpfApi.prototype = {
  async report (year = null, month = null) {
    try {
      const query = []
      if (year !== null) query.push(year)
      if (month !== null) query.push(month)
      return HTTP.get(`/wpf/v1/report/${query.join('/')}`)
    } catch (error) {
      return { error }
    }
  },
  async dynamic (slice, year = null, month = null) {
    try {
      const query = [slice]
      if (year !== null) {
        query.push(year)
      }
      if (month !== null) {
        query.push(month)
      }
      return HTTP.get(`/wpf/v1/dynamic/${query.join('/')}`)
    } catch (error) {
      return { error }
    }
  },
  async available () {
    try {
      return HTTP.get('/wpf/v1/report/available')
    } catch (error) {
      return { error }
    }
  }
}

function AuthApi () {}
AuthApi.prototype = {
  async register (params) {
    try {
      return HTTP.post('/wp/v2/users', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    } catch (error) {
      return { error }
    }
  },
  async authorize (params) {
    try {
      return HTTP.post('/jwt-auth/v1/token', params)
    } catch (error) {
      return { error }
    }
  },
  async authenticate (params) {
    try {
      return HTTP.post('/jwt-auth/v1/token/validate', { params })
    } catch (error) {
      return { error }
    }
  }
}

const WP = new WpApi()
const ACF = new AcfApi()
const Menus = new MenusApi()
const WPF = new WpfApi()
const Auth = new AuthApi()

export { WP, ACF, WPF, Menus, Auth }

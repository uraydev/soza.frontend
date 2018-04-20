import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'http://map.uray.ru/wp-json'
})

function WpApi () {}

WpApi.prototype = {
  async collection (type, params) {
    try {
      return await HTTP.get(`/wp/v2/${type}`, { params })
    } catch (error) {
      return { error }
    }
  },
  async map (id) {
    try {
      // grab data over an Ajax request
      const mapPromise = HTTP.get(`/wp/v2/maps/${id}`)
      const thumbPromise = this.collection('media', { parent: id })
      const pointsPromise = this.collection('comments', { parent: 0, post: id })
      // await all three promises to come back and destructure
      // the result into their own variables
      const [map, thumb, points] = await axios.all([mapPromise, thumbPromise, pointsPromise])
      return {
        data: map.data,
        thumb: thumb.data[0],
        points: points.data
      }
    } catch (error) {
      return { error }
    }
  },
  async comment (id) {
    try {
      const { data: point } = await HTTP.get(`/wp/v2/comments/${id}`)
      return point
    } catch (error) {
      throw new Error(error)
    }
  },
  async userById (id) {
    try {
      return await HTTP.get(`/wp/v2/users/${id}`)
    } catch (error) {
      return { error }
    }
  },
  async userBySlug (slug) {
    try {
      const response = await HTTP.get('/wp/v2/users', { params: { slug } })
      return response.data[0]
    } catch (error) {
      return { error }
    }
  },
  async currentUser () {
    try {
      return await HTTP.get('/wp/v2/users/me')
    } catch (error) {
      return { error }
    }
  },
  async settings () {
    try {
      return await HTTP.get('/wp/v2/settings')
    } catch (error) {
      return { error }
    }
  },
  async authorize (params) {
    try {
      return await HTTP.post('/jwt-auth/v1/token', params)
    } catch (error) {
      return { error }
    }
  },
  async authenticate (params) {
    try {
      return await HTTP.post('/jwt-auth/v1/token/validate', { params })
    } catch (error) {
      return { error }
    }
  }
}

export default new WpApi()

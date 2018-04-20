export default {

  data () {
    return {}
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    },
    isValidTimeZone (timeZone) {
      if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
        throw new Error('Time zones are not available in this environment')
      }
      try {
        Intl.DateTimeFormat(undefined, { timeZone })
        return true
      } catch (e) {
        return false
      }
    },
    devThumbnail (size = 100) {
      return `http://via.placeholder.com/${size}x${size}`
    }
  }
}

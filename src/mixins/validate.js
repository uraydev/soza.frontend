export default {
  methods: {
    isValid (arr, errors) {
      const a = arr.filter(e => e)
      return a.length ? ((a.length === arr.length) && !errors.count()) : false
    },
    getRules (field, errors) {
      return [errors.first(field) || true]
    }
  }
}

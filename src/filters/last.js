export default value => {
  if (value.isArray()) {
    return value[value.length - 1]
  }
  return value
}

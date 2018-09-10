export default value => {
  if (value.isArray()) {
    return value[0]
  }
  return value
}

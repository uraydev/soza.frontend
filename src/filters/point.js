export default value => {
  if (value) {
    return { lat: +value.lat, lng: +value.lng }
  }
}

<template>
  <section v-if="loaded('loadMap')">
    <router-view />
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import * as GoogleMaps from 'vue2-google-maps'
import config from '../../middlewares/config'

Vue.use(GoogleMaps, { load: config.gmap })

export default {
  props: {
    mapId: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'loaded',
      'getLoadedMap',
      'isMapPrivate'
    ])
  },
  methods: {
    ...mapActions([
      'loadMap',
      'updateAppTitle'
    ])
  },
  async created () {
    await this.loadMap(this.mapId)
    this.updateAppTitle(this.getLoadedMap.name)
  }
}
</script>

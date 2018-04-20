<template>
  <gmap-map
    :style="style"
    :center="center"
    :zoom="zoom"
    :options="options"
  >
    <gmap-marker
      v-for="(point, idx) in points"
      :key="idx"
      :position="point.acf.location"
      :clickable="clickable"
      :draggable="draggable"
      :icon="pointIcon"
      @click="updateCenter(point.acf.location)"
    ></gmap-marker>
  </gmap-map>
</template>

<script>
import utils from '@/mixins/utils'

export default {
  mixins: [utils],
  props: {
    initialCenter: {
      type: Object,
      required: true
    },
    zoom: {
      type: Number,
      default: 14
    },
    clickable: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: false
    },
    points: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      center: this.initialCenter,
      style: 'width: 100%; position: absolute; left:0; top:64px; bottom: 36px;',
      pointIcon: {
        url: 'https://soza.nyc3.digitaloceanspaces.com/web/icons/mask@2x.png',
        size: { width: 34, height: 51, f: 'px', b: 'px' },
        scaledSize: { width: 34, height: 51, f: 'px', b: 'px' }
      },
      options: {
        styles: [
          { stylers: [{ saturation: -80 }] },
          {
            featureType: 'poi.business',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      }
    }
  },
  methods: {
    updateCenter (center) { this.center = center }
  }
}
</script>

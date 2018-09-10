<template>
  <gmap-map
    :style="style"
    :center="center|point"
    :zoom="zoom"
    :options="options"
    ref="gmap"
  >
    <gmap-marker
      v-for="(item, idx) in points"
      :key="idx"
      :position="item.acf.location|point"
      :clickable="clickable"
      :draggable="draggable"
      :icon="pointIcon"
      @click="updateCenter(item.acf.location)"
    />
  </gmap-map>
</template>

<script>
export default {
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
      default () {
        return []
      }
    }
  },
  data () {
    return {
      center: this.initialCenter,
      style: 'width: 100%; position: absolute; left:0; top:0; bottom: 0',
      pointIcon: {
        url: 'https://soza.nyc3.digitaloceanspaces.com/web/icons/mask@2x.png',
        size: { width: 34, height: 51, f: 'px', b: 'px' },
        scaledSize: { width: 34, height: 51, f: 'px', b: 'px' }
      },
      options: {
        disableDefaultUI: true,
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
    // clearMap () {
    //   console.log(window.google.maps.Map)
    // }
  },
  mounted () {
    this.$refs.gmap.$on('click', function () {
      window.alert('Map was clicked!')
    })
    // map.addListener('click', this.clearMap)
  }
}
</script>

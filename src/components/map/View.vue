<template>
  <div v-if="loaded('loadMap')">
    <gmap-map
      :style="style"
      :center="getMapCenter"
      :zoom="getLoadedMap.zoom"
      :options="options"
      ref="gmap"
    >
      <gmap-marker
        v-if="isMapViewMode && loaded('loadMapPoints')"
        v-for="(item, index) in getLoadedMapPoints"
        :key="index"
        :position="item.location"
        :icon="getPointMarker(item)"
        @click="updateMapCenter(item.location)"
        clickable
      />
      <gmap-marker
        v-else-if="(getCreatedMapPoint !== null)"
        :position="getCreatedMapPoint.location"
        :icon="getPointMarker(getCreatedMapPoint)"
        @click="updateMapCenter(getCreatedMapPoint.location)"
        draggable
      />
    </gmap-map>
    <map-actions />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AccountActions from '@/components/account/MapActions'

export default {
  data () {
    return {
      style: 'width: 100%; position: absolute; left:0; top:0; bottom: 0'
    }
  },
  computed: {
    ...mapGetters([
      'loaded',
      'getLoadedMap',
      'getMapCenter',
      'getLoadedMapPoints',
      'getLoadedMapParticipants',
      'getCreatedMapPoint',
      'isMapViewMode'
    ]),

    options () {
      return this.$config.get('gmapOptions')
    }
  },

  methods: {
    ...mapActions([
      'updateMapCenter',
      'loadMapPoints'
    ]),

    getPointMarker (point) {
      const path = 'https://firebasestorage.googleapis.com/v0/b/most-db6bf.appspot.com/o/common%2Fmarkers%2F'
      const markers = {
        default: `${path}adv.png?alt=media&token=9bb4d89c-a4ba-4de5-bfd3-509074d1c8db`,
        checkEmpty: `${path}check_e.png?alt=media&token=7b815b2c-30c5-45ee-8afe-3818651663f4`,
        checkFill: `${path}check_f_red.png?alt=media&token=1188f3d2-8d97-42f1-acfd-7d727c2eb44a`,
        eventEnded: `${path}event.png?alt=media&token=ba808dc3-15b4-4668-bed7-debe272bf01d`,
        eventHot: `${path}event_e.png?alt=media&token=2ce75394-cf8b-47e9-a152-0b8445637b04`,
        event: `${path}event_s.png?alt=media&token=567a05c4-14ad-4f0f-af43-6033cb03809b`,
        status: `${path}order_a.png?alt=media&token=4b74b6ff-5fa5-4097-b3a6-b596cd237ded`,
        statusYellow: `${path}event_s.png?alt=media&token=567a05c4-14ad-4f0f-af43-6033cb03809b`,
        statusHot: `${path}order_e.png?alt=media&token=d7f35686-2bfe-4468-8c7b-bb5a4e780410`,
        statusSuccess: `${path}order_s.png?alt=media&token=2d9c9241-3da9-48ee-848c-8da1fdee4255`,
        statusWarning: `${path}order_w.png?alt=media&token=a1eb69d4-4966-4dd3-86bb-fe453d381f90`,
        place: `${path}place.png?alt=media&token=79949d8b-c135-4716-86e6-ca7d5a133046`
      }
      return {
        url: markers.status,
        size: { width: 34, height: 51, f: 'px', b: 'px' },
        scaledSize: { width: 34, height: 51, f: 'px', b: 'px' }
      }
    }
  },

  async created () {
    await this.loadMapPoints(this.getLoadedMap.id)
    this.updateMapCenter({
      lat: this.getLoadedMap.terrian.latitude,
      lng: this.getLoadedMap.terrian.longitude
    })
    this.$store.dispatch('loadMapParticipants', this.getLoadedMap.id)
    console.log(this.getLoadedMapParticipants)
  },

  components: {
    'map-actions': AccountActions
  }
}
</script>

<style>
  .speed-dial {
    position: absolute;
  }
  .btn--floating {
    position: relative;
  }
</style>

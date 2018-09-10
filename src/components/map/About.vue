<template>
  <layout-page
    v-if="loaded('loadMap')"
    :title="getLoadedMap.name"
    :meta="getLoadedUserData.displayName"
    :content="getLoadedMap.description"
  >
  </layout-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageCanvas from '@/components/canvas/Page'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'loaded',
      'getLoadedMap',
      'getLoadedUserData'
    ])
  },

  methods: {
    ...mapActions([
      'loadUserData'
    ])
  },

  components: {
    'layout-page': PageCanvas
  },

  async created () {
    await this.loadUserData(this.getLoadedMap.owner)
  }
}
</script>


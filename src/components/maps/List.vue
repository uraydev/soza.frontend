<template>
  <v-container v-if="loaded('loadMapList')">
    <v-layout row>
      <v-flex xs12>
        <v-list two-line>
          <template v-for="map in getLoadedMapList">
            <v-list-tile :key="map.id" avatar :to="`/maps/${map.id}`">
              <v-list-tile-avatar>
                <img :src="map.imageURL || 'http://via.placeholder.com/150x150'">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="map.name" />
                <v-list-tile-sub-title v-html="map.caption" />
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      page: 1
    }
  },
  computed: {
    ...mapGetters([
      'loaded',
      'getLoadedMapList',
      'getLoadedAccount'
    ])
  },
  methods: {
    ...mapActions([
      'updateAppTitle',
      'loadMapList'
    ])
  },
  async created () {
    this.updateAppTitle('Все карты')
    await this.loadMapList()
  }
}
</script>

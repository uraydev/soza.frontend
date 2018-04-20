<template>
  <v-layout row class="pt-3">
    <v-flex xs12 sm8 offset-sm2>
      <v-card v-if="!loading" id="map-description" tile>
        <v-card-media
          :src="thumbnail.rendered"
          height="300px">
        </v-card-media>
        <v-card-text>
          <div v-html="description.rendered"></div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :to="{ name: 'Map', params: { id } }"
            color="primary"
            flat>
            Перейти к карте
          </v-btn>
          <v-btn :to="{ name: 'Maps' }" color="blue--gray" flat>Все карты</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      title: 'getLoadedMapTitle',
      thumbnail: 'getLoadedMapThumbnail',
      description: 'getLoadedMapDescription'
    })
  },
  async created () {
    await this.$store.dispatch('loadMapInfo', this.id)
    await this.$store.dispatch('loadAppTitle', this.title)
  }
}
</script>

<style lang="scss">
  #map-description {
    .card__media__content {
      background-color: rgba(76,33,0,0.2);
    }
  }
</style>


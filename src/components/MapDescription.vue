<template>
  <v-card v-if="!loading" flat tile id="map-description">
    <v-list>
      <v-list-tile avatar :to="{ name: 'User', params: { username: owner.slug } }">
        <v-list-tile-avatar>
          <img :src="owner.avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="owner.name"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-card-media
      :src="thumbnail.rendered"
      height="200px"
      class="white--text"
    >
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline">{{ title | render }}</span>
            <star-rating
              :star-size="20"
              @rating-selected="rating = $event"
              :rating="rating"></star-rating>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
    <v-card-text>
      <div v-html="caption.rendered"></div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        :to="{ name: 'MapAbout', params: { id } }"
        flat
      >
        Подробнее..
      </v-btn>
    </v-card-actions>
  </v-card>
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
    return {
      rating: 3
    }
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      title: 'getLoadedMapTitle',
      description: 'getLoadedMapDescription',
      caption: 'getLoadedMapCaption',
      thumbnail: 'getLoadedMapThumbnail',
      owner: 'getLoadedMapOwner'
    })
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

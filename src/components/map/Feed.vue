<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <v-card flat>
          <v-list three-line>
            <template v-for="(item, index) in items">
              <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
              <v-divider v-else-if="item.divider" :inset="item.inset" :key="index" />
              <feed-item
                v-else
                :title="item.title"
                :meta="item.subtitle"
                :image="item.avatar"
                url="#"
              />
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FeedItem from '@/components/canvas/FeedItem'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      items: [
        { header: 'Today' },
        { avatar: 'http://via.placeholder.com/150x150', title: 'Brunch this weekend?', subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { divider: true, inset: true },
        { avatar: 'http://via.placeholder.com/150x150', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend." },
        { divider: true, inset: true },
        { avatar: 'http://via.placeholder.com/150x150', title: 'Oui oui', subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?" },
        { divider: true, inset: true },
        { avatar: 'http://via.placeholder.com/150x150', title: 'Birthday gift', subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?" },
        { divider: true, inset: true },
        { avatar: 'http://via.placeholder.com/150x150', title: 'Recipe to try', subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos." }
      ]
    }
  },
  components: {
    'feed-item': FeedItem
  },
  computed: {
    ...mapGetters([
      'loaded',
      'getLoadedMapTitle',
      'getLoadedMapOwnerName',
      'getLoadedMapThumbnail',
      'getLoadedMapDescription'
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

<template>
  <v-layout v-if="!loading" row class="pt-3">
    <v-flex xs12 sm8 offset-sm2>
      <v-list two-line>
        <template v-for="(item, index) in items">
          <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
          <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
          <v-list-tile avatar v-else :key="item.title" :to="{ name: 'Map', params: { id: item.id } }">
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.title | render }}
              </v-list-tile-title>
              <v-list-tile-sub-title
              v-html="item.excerpt.rendered"
            ></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click="addToFavorites()">
                <v-icon class="grey--text">favorite_border</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
      <!--<div v-if="items._paging.totalPages > 1" class="text-xs-center">-->
        <!--<v-pagination :length="items._paging.totalPages" v-model="page"></v-pagination>-->
      <!--</div>-->
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      page: 1
    }
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      items: 'getLoadedMapList'
    })
  },
  methods: {
    addToFavorites () {},
    addToBookmarks () {},
    getShareMenu () {}
  },
  async created () {
    await this.$store.dispatch('loadMapList')
    await this.$store.dispatch('loadAppTitle', 'Все карты')
  }
}
</script>

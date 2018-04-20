<template>
  <v-layout row class="pt-3">
    <v-flex xs12 sm8 offset-sm2>
      <v-layout row pt-3 pb-4>
        <v-flex xs2 offset-xs1>
          <v-avatar size="96px" class="text-lg-center">
            <img :src="avatar">
          </v-avatar>
        </v-flex>
        <v-flex xs8 offset-xs1>
          <h2 v-html="username"></h2>
          <p><strong>{{ pointsCount }}</strong> пойнтов на <strong>{{ followingCount }}</strong> картах.</p>
          <p><strong>{{ name }}</strong> {{ description }}</p>
        </v-flex>
      </v-layout>
      <v-card tile>
        <v-tabs icons-and-text centered v-model="tabs">
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab href="#tab-1">
            Карты
            <v-icon>map</v-icon>
          </v-tab>
          <v-tab href="#tab-2">
            Пойнты
            <v-icon>location_on</v-icon>
          </v-tab>
          <v-tab href="#tab-3">
            Участие
            <v-icon>favorite</v-icon>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item id="tab-1">
            <v-card flat>
              <v-list>
                <v-list-tile v-for="map in maps" :key="map.id" avatar>
                  <v-list-tile-avatar>
                    <img src="http://via.placeholder.com/180x180" alt="avatar">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="map.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="map.excerpt"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-tab-item>
          <v-tab-item id="tab-2">
            <v-card flat>
              <v-card-text>
                Здесь активность пользователя
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item id="tab-3">
            <v-card flat>
              <v-card-text>
                Здесь активность пользователя2
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import WP from '@/lib/wp'

export default {
  props: {
    username: {
      type: [Number, String]
    }
  },
  data () {
    name: '',
    description: '',
    avatar: 'http://via.placeholder.com/96x96',
    maps: [],
    tabs: 'tab-1',
    pointsCount: 0,
    followingCount: 0
  },
  async created () {
    const user = await WP.userBySlug(this.username)
    this.name = user.name
    this.description = user.description
    this.avatar = user.avatar_urls[96]
    this.maps = await WP.collection('maps', { author: user.id, context: 'embed' })
    // Update Title
    await this.$store.dispatch('setTitle', user.name)
    // Update Avatar
    await this.$store.dispatch('setAvatar', user.avatar_urls[48])
  }
}
</script>

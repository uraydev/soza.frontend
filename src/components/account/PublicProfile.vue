<template>
  <v-container>
    <v-layout row class="pt-3">
      <v-flex xs12>
        <v-layout row pt-3 pb-4>
          <v-flex xs2 offset-xs1>
            <v-avatar size="96px" class="text-lg-center">
              <img :src="getLoadedAccount.photoURL">
            </v-avatar>
          </v-flex>
          <v-flex xs8 offset-xs1>
            <h2 v-html="getLoadedAccount.displayName"></h2>
            <p><strong>{{ pointsCount }}</strong> пойнтов на <strong>{{ followingCount }}</strong> картах.</p>
            <p><strong>{{ name }}</strong> {{ description }}</p>
          </v-flex>
        </v-layout>
        <v-card tile flat>
          <v-tabs icons-and-text centered v-model="tabs">
            <v-tabs-slider color="primary" />
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
          <v-card-text>
            <v-tabs-items v-model="tabs">
              <v-tab-item id="tab-1">
                <v-card flat>
                  <v-list>
                    <v-list-tile v-for="map in maps" :key="map.id" avatar>
                      <v-list-tile-avatar>
                        <img :src="getMapThumb(map)">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="map.name" />
                        <v-list-tile-sub-title v-html="map.caption" />
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
                <!--<v-list two-line v-if="loaded('loadUserParticipatingData')">-->
                  <!--<template v-for="map in getUserParticipatingData">-->
                    <!--<v-list-tile :key="map.id" avatar :to="`/maps/${map.id}`">-->
                      <!--<v-list-tile-avatar>-->
                        <!--<img :src="getMapThumb(map)">-->
                      <!--</v-list-tile-avatar>-->
                      <!--<v-list-tile-content>-->
                        <!--<v-list-tile-title v-html="map.name" />-->
                        <!--<v-list-tile-sub-title v-html="map.caption" />-->
                      <!--</v-list-tile-content>-->
                    <!--</v-list-tile>-->
                  <!--</template>-->
                <!--</v-list>-->
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      name: '',
      description: '',
      maps: [],
      tabs: 'tab-1',
      pointsCount: 0,
      followingCount: 0
    }
  },
  computed: {
    ...mapGetters([
      'loaded',
      'getLoadedAccount'
    ])
  },
  methods: {
    ...mapActions([
      'updateAppTitle'
    ]),
    getMapThumb (map) {
      return map.imageURL || 'http://via.placeholder.com/150x150'
    }
  },
  async created () {
    this.updateAppTitle(this.getLoadedAccount.displayName)
    await this.$store.dispatch('loadUserParticipating', this.userId)
  }
}
</script>

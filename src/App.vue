<template>
  <v-app light>
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app
    >
      <router-view name="sidebar"></router-view>
      <!--<v-list-tile @click.stop="miniVariant = !miniVariant">-->
        <!--<v-list-tile-action>-->
          <!--<v-icon light v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>-->
        <!--</v-list-tile-action>-->
        <!--<v-list-tile-content>-->
          <!--Свернуть-->
        <!--</v-list-tile-content>-->
      <!--</v-list-tile>-->
    </v-navigation-drawer>
    <v-toolbar fixed app light color="white lighten-2" :clipped-left="clipped">
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon color="primary">menu</v-icon>
      </v-btn>
      <!--<v-avatar v-if="avatar" size="28px">-->
        <!--<img :src="avatar">-->
      <!--</v-avatar>-->
      <v-toolbar-title>{{ title | render }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-view name="toolbar"></router-view>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-bottom-nav fixed :value="true" color="white">
      <v-btn flat color="primary" value="recent">
        <span>Recent</span>
        <v-icon>history</v-icon>
      </v-btn>
      <v-btn flat color="primary" value="favorites">
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn flat color="primary" value="nearby">
        <span>Nearby</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
    <v-footer :fixed="fixed" app class="mb-3">
      <span>By <a href="mailto:nikonorovsv@gmail.com">Sergey Nikonorov</a>.</span>
    </v-footer>
    <v-progress-linear
      v-if="!loading"
      height="3"
      :indeterminate="true"
      color="primary"
      fixed
      style="z-index: 100"
      class="mb-0"
    ></v-progress-linear>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    clipped: true,
    drawer: false,
    fixed: true,
    miniVariant: false
  }),
  computed: {
    ...mapGetters({
      loading: 'loading',
      title: 'getLoadedAppTitle'
    })
  },
  async created () {
    this.$store.dispatch('loadAccount', {
      username: 'service',
      password: 'iQa1$ZwfnXITR$DdbMfc(fl9'
    })
  }
}
</script>

<style lang="scss">
  ::selection,
  ::-moz-selection {
    background-color: #FB8C00;
    color: #fff;
  }
</style>

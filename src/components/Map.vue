<template>
  <div>
    <map-canvas
      v-if="!loading"
      :initial-center="center"
      :zoom="zoom"
      :points="points">
    </map-canvas>
    <v-speed-dial
      fixed
      fab
      bottom
      right
      transition="slide-y-reverse-transition"
      direction="top"
      :open-on-hover="true"
      v-model="fab"
    >
      <v-btn fab dark color="primary" v-model="fab" slot="activator">
        <v-icon>expand_less</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn fab dark small color="blue-grey lighten-2" @click.stop="dialog = true">
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn fab dark small color="blue-grey lighten-2">
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn fab dark small color="blue-grey lighten-2">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-dialog
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
      :overlay="false"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Настройки карты</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
          </v-toolbar-items>
          <v-menu bottom right offset-y>
            <v-btn slot="activator" dark icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="(item, i) in items" :key="i" @click="">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-card-text>

          <v-btn color="primary" dark @click.stop="dialog2 = !dialog2">Open Dialog 2</v-btn>

          <v-tooltip right>
            <v-btn slot="activator">Tool Tip Activator</v-btn>
            Tool Tip
          </v-tooltip>

          <v-list three-line subheader>
            <v-subheader>User Controls</v-subheader>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Content filtering</v-list-tile-title>
                <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Password</v-list-tile-title>
                <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-divider></v-divider>

          <v-list three-line subheader>
            <v-subheader>General</v-subheader>
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-checkbox v-model="notifications"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Notifications</v-list-tile-title>
                <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-checkbox v-model="sound"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Sound</v-list-tile-title>
                <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-checkbox v-model="widgets"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Auto-add widgets</v-list-tile-title>
                <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>

        <div style="flex: 1 1 auto;"/>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import MapCanvas from '@/components/MapCanvas'
import { mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data: () => ({
    dialog: false,
    // floated button
    direction: 'top',
    fab: false,
    fling: true,
    hover: true,
    tabs: null,
    items: [],
    notifications: false,
    sound: false,
    widgets: false
  }),
  computed: {
    ...mapGetters({
      loading: 'loading',
      title: 'getLoadedMapTitle',
      zoom: 'getLoadedMapZoom',
      center: 'getLoadedMapCenter',
      points: 'getLoadedMapPoints'
    }),
    activeFab () {
      switch (this.tabs) {
      case 'one': return { 'class': 'purple', icon: 'account_circle' }
      case 'two': return { 'class': 'red', icon: 'edit' }
      case 'three': return { 'class': 'green', icon: 'keyboard_arrow_up' }
      default: return {}
      }
    }
  },
  methods: {},
  async created () {
    await this.$store.dispatch('loadMapInfo', this.id)
    await this.$store.dispatch('loadAppTitle', this.title)
  },
  components: {
    'map-canvas': MapCanvas
  }
}
</script>

<style lang="scss" scoped>
  /* This is for documentation purposes and will not be needed in your application */
  .speed-dial {
    position: fixed;
    bottom: 80px;
    z-index: 5;
  }
  .btn--floating {
    position: relative;
  }
</style>

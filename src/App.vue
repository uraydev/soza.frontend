<template>
  <v-app>
    <v-progress-linear
    v-if="!loadedAll"
    height="3"
    :indeterminate="true"
    color="primary"
    fixed
    style="z-index: 100"
    class="ma-0"
    />
    <router-view />
    <v-snackbar
      :timeout="6000"
      bottom
      :multi-line="true"
      v-model="snackbar"
    >
      {{ getSnack }}
      <v-btn flat color="primary" @click.native="snackbar = false">Закрыть</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'loadedAll',
      'getSnack'
    ]),
    snackbar: {
      get () {
        return !!this.getSnack
      },
      set (value) {
        this.setSnack(value)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setSnack'
    ])
  },
  async created () {
    // await this.$store.dispatch('defineGuestLocationWithAPI')
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

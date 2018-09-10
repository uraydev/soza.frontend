<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center pb-3 pt-2">
        <span class="display-3 primary--text">
          <app-logo />
        </span>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>
              <span class="title">
                {{ getAppTitle }}
              </span>
            </v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <app-alert
            v-if="getMessage"
            @dismissed="onDismissed"
            :text="getMessage.message"
            :type="getMessage.type || 'warning'"
          />
          <v-card-text>
            <router-view />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'loaded',
      'getAppTitle',
      'getMessage'
    ])
  },
  methods: {
    ...mapActions([
      'clearMessage'
    ]),
    onDismissed () {
      this.clearMessage()
    }
  }
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>


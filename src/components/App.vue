<template>
  <div>
    <v-toolbar
      color="white"
      class="elevation-1"
      app
      fixed
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        {{ getAppTitle }}
      </v-toolbar-title>
      <v-spacer />
      <router-view name="toolbar" />
    </v-toolbar>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      v-model="drawer"
      fixed
      app
      left
      temporary
    >
      <v-toolbar flat class="transparent">
        <v-list v-if="getLoadedAccount">
          <v-list-tile avatar :to="`/${getLoadedAccount.uid}`">
            <v-list-tile-avatar>
              <img :src="getLoadedAccount.photoURL" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ getLoadedAccount.displayName }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header"
          >
            {{ item.header }}
          </v-subheader>
          <v-divider
            v-else-if="item.divider"
            :inset="item.inset"
            :key="index"
          />
          <v-list-tile
            v-else
            :key="item.title"
            avatar
            :to="item.url"
          >
            <v-list-tile-avatar>
              <v-icon color="primary" v-text="item.icon" />
            </v-list-tile-avatar>
            <v-list-tile-content class="black--text">
              <v-list-tile-title v-html="item.title" />
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <div v-if="isSignedIn">
          <v-list-tile left to="/settings">
            <v-list-tile-avatar>
              <v-icon color="primary">settings</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content class="black--text">
              <v-list-tile-title>Настройки</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile left @click.stop="signOut">
            <v-list-tile-avatar>
              <v-icon color="primary">exit_to_app</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content class="black--text">
              <v-list-tile-title>Выход</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
        <v-divider />
        <v-list-tile left v-if="isSignedIn" @click.stop="miniVariant = !miniVariant">
          <v-list-tile-avatar>
            <v-icon color="primary" v-html="miniVariant ? 'chevron_right' : 'chevron_left'" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-text="miniVariant ? 'Развернуть' : 'Свернуть'" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <div id="wrapper">
      <router-view />
    </div>
    <router-view name="fab" />
    <app-dialog />
    <v-footer class="pa-3" color="grey lighten-3" flat>
      <span>The source code is licensed by <a href="https://nikonorovsv.com">Sergey Nikonorov</a>. </span>
    </v-footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      miniVariant: false
    }
  },
  computed: {
    ...mapGetters([
      'loaded',
      'isSignedIn',
      'getLoadedAccount',
      'getAppTitle'
    ]),
    items: {
      get () {
        return [
          {
            divider: true
          },
          {
            icon: 'notifications',
            title: 'Новости',
            url: '/feed'
          },
          {
            icon: 'search',
            title: 'Поиск',
            url: '/search'
          },
          {
            icon: 'map',
            title: 'Мои карты',
            url: '/maps'
          },
          {
            header: 'Настройки и выход'
          }
        ]
      }
    }
  },
  watch: {
    isSignedIn (value) {
      if (!value) {
        this.$router.push('/auth/signin')
      }
    }
  },
  methods: {
    ...mapActions([
      'signOut'
    ])
  },
  async created () {}
}
</script>

<style lang="scss">
  #wrapper {
    padding-top: 60px;
    position: relative;
    min-height: 610px;
  }
</style>

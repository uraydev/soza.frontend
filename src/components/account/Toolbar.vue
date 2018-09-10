<template>
  <v-menu bottom left open-on-hover>
    <v-btn
      slot="activator"
      v-if="isOwner"
      @click.stop="onSettingsDialog()"
      icon
      flat
    >
      <v-icon color="primary">settings</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile>
        <v-list-tile-avatar>
          <v-icon>person</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title>
          Профиль
        </v-list-tile-title>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-avatar>
          <v-icon>notifications</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title>
          Уведомления
        </v-list-tile-title>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-avatar>
          <v-icon>settings</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title>
          Настройки
        </v-list-tile-title>
      </v-list-tile>
      <v-divider />
      <v-list-tile left @click.stop="signOut">
        <v-list-tile-avatar>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title>
          Выход
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
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
  computed: {
    ...mapGetters([
      'getLoadedAccount'
    ]),
    isOwner () {
      return (this.getLoadedAccount.uid === this.userId)
    }
  },
  methods: {
    ...mapActions([
      'signOut'
    ]),
    onSettingsDialog (path) {
      return `${this.baseRoute}/${path}`
    }
  },
  created () {
    // console.log(this.$router)
  }
}
</script>

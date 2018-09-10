<template>
  <div>
    <v-btn :to="getRoute('about')" flat icon>
      <v-icon color="primary">info</v-icon>
    </v-btn>
    <v-btn @click.stop="onCreateParticipantsDialog" flat icon>
      <v-icon color="primary">people</v-icon>
    </v-btn>
    <v-btn
      v-if="loaded('loadUserParticipating')"
      @click.stop="participating"
      flat
      icon
    >
      <v-icon
        v-text="isUserParticipateMap(mapId) ? 'favorite' : 'favorite_border'"
        color="primary"
      />
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    mapId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'loaded',
      'getLoadedAccount',
      'getLoadedMap',
      'isUserParticipateMap'
    ]),
    baseRoute () {
      return `/maps/${this.$route.params.mapId}`
    },
    items () {
      return [
        {
          icon: 'info',
          title: 'О карте',
          url: this.getRoute('about')
        },
        {
          icon: 'history',
          title: 'События карты',
          url: this.getRoute('feed')
        },
        {
          icon: 'location_on',
          title: 'События на карте',
          url: this.baseRoute
        },
        {
          icon: 'people',
          title: 'Участники',
          url: this.getRoute('participants')
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'createDialog',
      'changeUserParticipatingMap',
      'loadUserParticipating'
    ]),
    participating () {
      this.changeUserParticipatingMap(this.mapId)
    },
    getRoute (path) {
      return `${this.baseRoute}/${path}`
    },
    onCreateParticipantsDialog () {
    //   this.createDialog({
    //     title: 'Подписчики',
    //     component: Participants,
    //     active: true
    //   })
    }
  },
  created () {
    this.loadUserParticipating(this.getLoadedAccount.uid)
  }
}
</script>

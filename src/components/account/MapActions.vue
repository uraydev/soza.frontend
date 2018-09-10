<template>
  <div v-if="(isMapHasActivity || isUserMapOwner)">
    <v-speed-dial
      v-if="isMapViewMode"
      v-model="fab"
      direction="top"
      transition="slide-y-reverse-transition"
      right
      bottom
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="primary"
        dark
        fab
      >
        <v-icon>add_location</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-tooltip left v-if="(getLoadedMap.type === 'places')">
        <v-btn slot="activator" fab class="blue-gray" dark small @click.stop="onCreatePoint">
          <v-icon>location_on</v-icon>
        </v-btn>
        <span>Добавить место</span>
      </v-tooltip>
      <v-tooltip left v-if="(getLoadedMap.type === 'events')">
        <v-btn slot="activator" fab class="blue-gray" dark small @click.stop="onCreatePoint">
          <v-icon>alarm_on</v-icon>
        </v-btn>
        <span>Добавить событие</span>
      </v-tooltip>
      <v-tooltip left v-if="(getLoadedMap.type === 'orders')">
        <v-btn slot="activator" fab class="blue-gray" dark small @click.stop="onCreatePoint">
          <v-icon>assignment_turned_in</v-icon>
        </v-btn>
        <span>Добавить заявку</span>
      </v-tooltip>
      <v-tooltip left v-if="(['checkpoint', 'poll'].includes(getLoadedMap.type))">
        <v-btn slot="activator" fab class="blue-gray" dark small @click.stop="onCreatePoint">
          <v-icon>check</v-icon>
        </v-btn>
        <span>Добавить чекпойнт</span>
      </v-tooltip>
      <v-tooltip left v-if="isUserMapOwner">
        <v-btn
          slot="activator"
          :to="`${getLoadedMap.id}/console`"
          fab
          dark
          small
        >
          <v-icon>settings</v-icon>
        </v-btn>
        <span>Управление картой</span>
      </v-tooltip>
    </v-speed-dial>
    <v-tooltip
      v-else
      left
    >
      <v-btn
        slot="activator"
        color="primary"
        dark
        fab
        fixed
        right
        bottom
        :disabled="(getCreatedMapPoint === null)"
        @click.stop="onCreatePlaceDialog"
      >
        <v-icon>subject</v-icon>
      </v-btn>
      <span>Добавить описание</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import CreatePlaceForm from '@/components/point/dialog/CreatePlaceForm'

export default {
  data () {
    return {
      fab: false,
      tabs: null
    }
  },
  computed: {
    ...mapGetters([
      'getLoadedAccount',
      'getCreatedMapPoint',
      'getLoadedMap',
      'isMapViewMode'
    ])
  },
  methods: {
    ...mapMutations([
      'setCreatedMapPoint',
      'setMapViewMode'
    ]),

    ...mapActions([
      'createDialog'
    ]),

    onCreatePoint () {
      this.setMapViewMode(false)
      this.$parent.$refs.gmap.$on('click', event => {
        this.setCreatedMapPoint({ location: event.latLng })
      })
    },

    onCreatePlaceDialog () {
      this.createDialog({
        title: 'Новое место',
        component: CreatePlaceForm,
        active: true
      })
    },

    isMapHasActivity () {
      return this.getLoadedMap.activity
    },

    isMapPrivate () {
      return this.getLoadedMap.privacy
    },

    isUserMapOwner () {
      return (this.getLoadedMap.owner === this.getLoadedAccount.uid)
    }
  },
  async created () {
    console.log(this.isUserMapOwner)
  }
}
</script>

<style>
  .speed-dial {
    position: absolute;
  }
  .btn--floating {
    position: relative;
  }
</style>

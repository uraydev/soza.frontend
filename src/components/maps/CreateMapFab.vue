<template>
  <v-btn
    color="primary"
    slot="activator"
    @click="onCreateDialog"
    dark
    fab
    fixed
    bottom
    right
  >
    <v-icon>add</v-icon>
  </v-btn>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CreateMapForm from '@/components/maps/dialog/CreateMapForm'

export default {
  computed: {
    ...mapGetters([
      'loadedAll'
    ])
  },
  methods: {
    ...mapActions([
      'createDialog'
    ]),
    onCreateDialog () {
      this.createDialog({
        title: 'Новая карта',
        component: CreateMapForm,
        active: true
      })
    }
  }
}
</script>

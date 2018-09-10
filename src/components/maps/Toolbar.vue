<template>
  <div>
    <v-btn @click.stop="onCreateDialog()" flat>
      <v-icon color="primary">add</v-icon> Создать карту
    </v-btn>
  </div>
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

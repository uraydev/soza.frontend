<template>
  <v-dialog
    v-model="active"
    fullscreen
    hide-overlay
    transition="dialog-left-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ getDialogTitle }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon dark @click.native="active = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <component :is="getDialogComponent" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'loading',
      'getDialogActivity',
      'getDialogComponent',
      'getDialogTitle'
    ]),
    active: {
      get () {
        return this.getDialogActivity
      },
      set (value) {
        this.setDialogActivity(value)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setDialogActivity'
    ])
  }
}
</script>

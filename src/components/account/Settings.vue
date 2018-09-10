<template>
  <form @submit.prevent="submitProfile">
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field
          v-model="email"
          name="email"
          type="email"
          label="Адрес электронной почты"
          prepend-icon="email"
          required
          color="primary"
          v-validate="'required|email'"
          :rules="getRules('email', errors)"
          :value="getLoadedAccount.email"
          hint="Регистрационный email изменить нельзя."
          persistent-hint
          disabled
        />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-text-field
          v-model="displayName"
          name="displayName"
          type="text"
          label="Как к вам обращаться?"
          prepend-icon="person"
          required
          color="primary"
          v-validate="'required|max:20|min:3'"
          :rules="getRules('displayName', errors)"
          :value="getLoadedAccount.displayName"
        />
      </v-flex>
    </v-layout>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'loaded',
      'getLoadedAccount'
    ])
  },
  methods: {
    submitProfile () {

    }
  }
}
</script>

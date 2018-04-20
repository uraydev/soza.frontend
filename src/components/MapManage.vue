<template>
  <v-layout row>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-card-text>
          <form>
            <v-text-field
              label="Название карты"
              v-model="name"
              :error-messages="nameErrors"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              required
            ></v-text-field>
            <v-text-field
              label="Город"
              v-model="city"
              :error-messages="cityErrors"
              @input="$v.city.$touch()"
              @blur="$v.city.$touch()"
              required
            ></v-text-field>
            <v-checkbox
              label="Сделать карту приватной?"
              v-model="privacy"
              color="primary"
              @change="$v.privacy.$touch()"
              @blur="$v.privacy.$touch()"
            ></v-checkbox>
            <v-btn @click="submit" color="primary" dark>Создать карту</v-btn>
            <v-btn @click="clear">Очистить</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    city: { required },
    privacy: { required }
  },
  data () {
    return {
      searchRadius: 500,
      cities: false,
      name: '',
      city: null,
      privacy: false
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    cityErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.city = null
      this.privacy = false
    },
    async search () {
      // const service = await window.google.maps.places.PlacesService(map);
      // await service.nearbySearch({
      //   input: this.city,
      //   location: this.center,
      //   radius: this.searchRadius,
      //   type: ['cities'],
      //   language: 'ru_RU',
      // }, (results, status) => {
      //   if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      //     this.cities = results;
      //   }
      // });
    }
  },
  async created () {

  }
}
</script>

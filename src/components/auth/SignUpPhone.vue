<template>
  <section>
    <v-layout row wrap>
      <v-flex xs12>
        <p>Мы следим за безопасностью.</p>
      </v-flex>
    </v-layout>
    <form @submit.prevent="submit">
      <v-layout row wrap>
        <v-flex xs12>
          <country-list
            v-model="code"
            label="Страна"
            :flags="true"
            :type="['local_name', 'e164_cc']"
          />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="phoneNumber"
            name="phoneNumber"
            type="text"
            :label="phoneNumber ? 'Номер телефона' : ''"
            placeholder="Номер телефона"
            prepend-icon="phone"
            :prefix="code ? `+${code.e164_cc}` : ''"
            mask="(###) ### - ####"
            required
            color="primary"
            v-validate="'required'"
            :rules="getRules('dateOfBirth', errors)"
          />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 class="pt-2">
          <v-btn
            :disabled="!valid"
            type="submit"
            color="primary"
            class="ml-0"
            depressed
          >
            Продолжить
          </v-btn>
          <v-btn @click="clear" color="primary" flat>Очистить</v-btn>
        </v-flex>
      </v-layout>
    </form>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center pt-5">
        Уже зарегистрированы?
        <router-link to="/auth/signin" class="orange--text">Войдите!</router-link>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import validateMixin from '@/mixins/validate'
import VCountryList from '../common/vuetify-country-list/VCountryList'

export default {
  mixins: [validateMixin],
  data () {
    return {
      valid: true,
      phoneNumber: '',
      code: {
        e164_cc: '7',
        iso2_cc: 'RU',
        e164_sc: 0,
        geographic: true,
        level: 1,
        name: 'Russia',
        local_name: 'Россия',
        example: '9123456789',
        display_name: 'Russia (RU) [+7]',
        full_example_with_plus_sign: '+79123456789',
        display_name_no_e164_cc: 'Russia (RU)',
        e164_key: '7-RU-0'
      },
      disabled: false
    }
  },
  computed: {
    ...mapGetters([
      'loaded',
      'getLoadedAccount',
      'getLoadedAppTitle',
      'getError'
    ])
  },
  watch: {
    getLoadedAccount (value) {
      // if (value) {
      //   this.$router.push('/')
      // }
    },
    errors (error) {
      console.log(error)
    }
  },
  methods: {
    ...mapMutations([
      'setMessage'
    ]),
    ...mapActions([
      'updateAppTitle',
      'signUpWithPhone'
    ]),
    getCode (arr) {
      if (arr.length === 3) return `+${arr[2]}`
    },
    async submit () {
      try {
        await this.signUpWithPhone(this)
      } catch (error) {
        this.setMessage(error)
      }
    },
    clear () {
      this.phoneNumber = ''
      this.code = ''
    }
  },
  components: {
    'country-list': VCountryList
  },
  async created () {
    this.updateAppTitle('Регистрация')
  }
}
</script>

<style>
  .input-group--text-field__prefix {
    color: green!important;
    font-weight: bolder;
    padding-right: 5px;
  }
</style>

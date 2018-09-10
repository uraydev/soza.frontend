<template>
  <section>
    <v-layout row wrap>
      <v-flex xs12>
        <p>Введите код отправленный на указанный вами номер телефона.</p>
      </v-flex>
    </v-layout>
    <form id="signup-form">
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="code"
            name="code"
            type="code"
            label="6-значный код из СМС"
            prepend-icon="lock"
            required
            :color="color"
            :counter="6"
            v-validate="'required|length:6'"
            :error-messages="errors.first('code')"
            :error="errors.has('code')"
          />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 class="pt-2">
          <v-btn :disabled="!valid" @click="submit" color="primary" class="ml-0" depressed>
            Подтвердить
          </v-btn>
          <v-btn @click="clear" color="green" flat>Очистить</v-btn>
        </v-flex>
      </v-layout>
    </form>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center pt-5">
        Уже зарегистрированы? <router-link to="/auth/signin" class="orange--text">Войдите!</router-link>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      valid: true,
      code: '',
      disabled: false,
      color: 'primary'
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
      'createAccountWithEmail'
    ]),
    async submit () {
      try {
        await this.createAccountWithEmail(this)
      } catch (error) {
        this.setMessage(error)
      }
    },
    clear () {
      this.password = ''
      this.confirmPassword = ''
    }
  },
  async created () {
    this.updateAppTitle('Регистрация')
  }
}
</script>

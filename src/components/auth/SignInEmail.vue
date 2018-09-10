<template>
  <section>
    <form @submit.prevent="submit">
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
            :disabled="disabled"
          />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 class="pt-2 text-xs-right">
          <v-btn @click="clear" color="primary" flat>Очистить</v-btn>
          <v-btn
            type="submit"
            :disabled="!valid || loading('signUpEmailPassword')"
            :loading="loading('signUpEmailPassword')"
            color="primary"
            class="mr-0"
            depressed
          >
            Вход
            <span
              v-if="loading('signUpEmailPassword')"
              slot="loader"
              class="custom-loader"
            >
              <v-icon light>cached</v-icon>
            </span>
          </v-btn>
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
import { mapGetters, mapActions } from 'vuex'
import { Validator } from 'vee-validate'
import validateMixin from '@/mixins/validate'

Validator.localize('ru', {
  custom: {
    email: {
      required: 'Электронная почта обязательна для регистрации.',
      email: 'Не верно введен адрес электронной почты.'
    }
  }
})

export default {
  mixins: [validateMixin],
  data () {
    return {
      email: '',
      localStorageKey: 'emailForSignIn',
      disabled: true
    }
  },
  computed: {
    ...mapGetters([
      'loading',
      'getMessage',
      'isSignedIn',
      'getLoadedAccount'
    ]),
    valid () {
      return !this.disabled && this.isValid([this.email], this.errors)
    }
  },
  watch: {
    isSignedIn (value) {
      if (value) {
        this.$localStorage.remove(this.localStorageKey)
        // this.$router.push('/')
      }
    },
    getMessage (error) {
      if (error) {
        this.email = ''
      }
    }
  },
  methods: {
    ...mapActions([
      'updateAppTitle',
      'emailSignInLink',
      'signInEmailLink'
    ]),
    async submit () {
      await this.emailSignInLink({
        email: this.email,
        url: window.location.href
      })
      this.$localStorage.set(this.localStorageKey, this.email)
    },
    clear () {
      this.email = ''
      this.$localStorage.remove(this.localStorageKey)
    }
  },
  async created () {
    console.log(this.$route)
    const email = this.$localStorage.get(this.localStorageKey)
    if (!email) {
      this.disabled = false
    }
    this.email = email
    await this.signInEmailLink({
      email: this.email, href: window.location.href
    })
    this.updateAppTitle('Регистрация')
  }
}
</script>

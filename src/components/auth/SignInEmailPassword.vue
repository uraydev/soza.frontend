<template>
  <section>
    <form @submit.prevent="submit">
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="email"
            name="email"
            label="Ваш Email"
            prepend-icon="email"
            :color="color"
            v-validate="'required|email'"
            :rules="getRules('email', errors)"
          />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="password"
            name="password"
            type="password"
            label="Ваш пароль"
            prepend-icon="lock"
            :color="color"
            v-validate="'required'"
            :rules="getRules('password', errors)"
            data-vv-validate-on="input|blur"
          />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs8 class="pt-3">
          <v-checkbox
            v-model="remember"
            label="Запомнить меня"
            :color="color"
          />
        </v-flex>
        <v-flex xs4 class="pt-2 text-xs-right">
          <v-btn
            type="submit"
            :disabled="!valid || loading('signInEmailPassword')"
            :loading="loading('signInEmailPassword')"
            color="primary"
            class="mr-0"
            depressed
          >
            Войти
            <span
              v-if="loading('signInEmailPassword')"
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
      <v-flex xs12 class="text-xs-center pt-3">
        <p>Не зарегистрированы? <router-link to="/auth/signup" class="orange--text">Это займет минуту!</router-link></p>
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
      required: 'Поле не может быть пустым.',
      email: 'Необходимо указать действующий адрес электронной почты.'
    },
    password: {
      required: 'Пароль не может быть пустым.'
    }
  }
})

export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    }
  },
  mixins: [validateMixin],
  data () {
    return {
      email: '',
      password: '',
      remember: false
    }
  },
  computed: {
    ...mapGetters([
      'loading',
      'isSignedIn',
      'getLoadedAccount'
    ]),
    valid () {
      return this.isValid([
        this.email,
        this.password
      ], this.errors)
    }
  },
  watch: {
    isSignedIn (value) {
      if (value) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    ...mapActions([
      'updateAppTitle',
      'setPersistence',
      'signInEmailPassword'
    ]),
    async submit () {
      await this.setPersistence(this.remember)
      await this.signInEmailPassword(this)
    }
  },
  async created () {
    await this.updateAppTitle('Вход')
  }
}
</script>

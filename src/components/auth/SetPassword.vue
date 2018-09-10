<template>
  <section>
    <v-layout row wrap>
      <v-flex xs12>
        <p>Пароль должен быть не менее 8 символов и содержать цифры, а также латинские буквы в верхнем и нижнем регистре..</p>
      </v-flex>
    </v-layout>
    <form @submit.prevent="submit">
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="password"
            name="password"
            type="password"
            label="Ваш пароль"
            prepend-icon="lock"
            required
            :color="color"
            v-validate="'required|min:8|strong_password'"
            :rules="getRules('password', errors)"
          />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Ваш пароль еще раз"
            prepend-icon="lock"
            :color="color"
            v-validate="'required|confirmed:password'"
            :rules="getRules('confirmPassword', errors)"
            data-vv-validate-on="input|blur"
          />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 class="pt-2">
          <v-btn :disabled="!valid" @click="submit" color="primary" class="ml-0" depressed>
            Зарегистрироваться
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
import { Validator } from 'vee-validate'
import validateMixin from '@/mixins/validate'

Validator.extend('strong_password', {
  validate: value => new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})').test(value)
})

Validator.localize('ru', {
  custom: {
    password: {
      required: 'Пароль не может быть пустым.',
      min: 'В целях безопасности, пароль не может быть менее 8 символов.',
      strong_password: 'Пароль обязательно должен включать цифры и латинские буквы как в верхнем, так и в нижнем регистре.'
    },
    confirmPassword: {
      required: 'Необходимо подтвердить пароль',
      confirmed: 'Пароли не совпадают.'
    }
  }
})

export default {
  mixins: [validateMixin],
  data () {
    return {
      valid: true,
      password: '',
      confirmPassword: '',
      disabled: false,
      color: 'primary'
    }
  },
  computed: {
    ...mapGetters([
      'loaded',
      'getLoadedAccount',
      'getLoadedAppTitle',
      'getMessage'
    ]),
    valid () {
      return this.isValid([
        this.password,
        this.confirmPassword
      ], this.errors)
    }
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
    this.$store.dispatch('loadAppTitle', 'Ввод пароля')
  }
}
</script>

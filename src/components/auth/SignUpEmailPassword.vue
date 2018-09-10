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
          />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
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
            required
            color="primary"
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
            color="primary"
            v-validate="'required|confirmed:password'"
            :rules="getRules('confirmPassword', errors)"
            data-vv-validate-on="input|blur"
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
            Зарегистрироваться
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
      <v-flex xs12 class="text-xs-center pt-3">
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

Validator.extend('strong_password', {
  validate: value => new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})').test(value)
})

Validator.localize('ru', {
  custom: {
    email: {
      required: 'Электронная почта обязательна для регистрации.',
      email: 'Не верно введен адрес электронной почты.'
    },
    displayName: {
      required: 'Обязательно ввести имя пользоавтеля.',
      max: 'Имя пользователя долно быть от 3 до 20 символов.',
      min: 'Имя пользователя долно быть от 3 до 20 символов.'
    },
    password: {
      required: 'Как же вы без пароля?',
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
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
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
      return this.isValid([
        this.displayName,
        this.email,
        this.password,
        this.confirmPassword
      ], this.errors)
    }
  },
  watch: {
    isSignedIn (value) {
      if (value) {
        this.$router.push('/')
      }
    },
    getError (error) {
      if (error) {
        this.password = ''
        this.confirmPassword = ''
      }
    }
  },
  methods: {
    ...mapActions([
      'signUpEmailPassword',
      'updateAppTitle'
    ]),
    async submit () {
      await this.signUpEmailPassword(this)
    },
    clear () {
      this.displayName = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
    }
  },
  async created () {
    this.updateAppTitle('Регистрация')
  }
}
</script>

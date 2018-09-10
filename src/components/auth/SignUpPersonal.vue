<template>
  <section>
    <v-layout row wrap>
      <v-flex xs12>
        <p>У нас приняты настоящие имена и фамилии.</p>
      </v-flex>
    </v-layout>
    <form @submit.prevent="submit">
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="firstName"
            name="firstName"
            type="text"
            label="Имя"
            required
            color="primary"
            v-validate="'required'"
            :rules="getRules('firstName', errors)"
          />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="lastName"
            name="lastName"
            type="text"
            label="Фамилия"
            required
            color="primary"
            v-validate="'required'"
            :rules="getRules('lastName', errors)"
          />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="dateOfBirth"
            persistent
            lazy
            full-width
            width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="dateOfBirth"
              label="Дата рождения"
              prepend-icon="event"
              color="primary"
              v-validate="'required'"
              :rules="getRules('dateOfBirth', errors)"
              readonly
            />
            <v-date-picker v-model="dateOfBirth" :locale="locale" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat @click="modal = false">Отмена</v-btn>
              <v-btn flat color="primary" @click="$refs.dialog.save(dateOfBirth)">Выбрать</v-btn>
            </v-date-picker>
          </v-dialog>
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
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      modal: false,
      disabled: false,
      locale: 'ru'
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
      this.firstName = ''
      this.lastName = ''
      this.dateOfBirth = ''
    }
  },
  async created () {
    this.updateAppTitle('Регистрация')
  }
}
</script>

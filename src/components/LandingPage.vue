<template>
  <v-container fluid class="pa-0">
    <v-jumbotron color="primary" dark>
      <v-container fill-height class="py-5">
        <v-layout row wrap>
          <v-flex md8>
            <h1 class="display-4">
              <app-logo />
            </h1>
            <p class="display-2">
              Социальные карты!
            </p>
          </v-flex>
          <v-flex md4>
            <v-container>
              <v-layout>
                <v-flex xs12>
                  <h3 class="display-1">Вход</h3>
                  <sign-in-form color="white" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <v-container grid-list-xl>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <h3 class="display-1">
            Карты решающие поблемы!
          </h3>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center>
        <template v-for="(item, index) in advatages">
          <v-flex xs12 md3 :key="index">
            <v-card class="elevation-0 transparent">
              <v-card-text class="text-xs-center">
                <v-icon x-large class="green--text text--darken-3" v-text="item.icon" />
              </v-card-text>
              <v-card-title primary-title class="layout justify-center">
                <div class="headline text-xs-center">{{ item.title }}</div>
              </v-card-title>
              <v-card-text>
                {{ item.text }}
              </v-card-text>
            </v-card>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
    <v-container grid-list-xl>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <h3 class="display-3">
            <span>
              <app-logo />
            </span> &mdash; это:
          </h3>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center>
        <template v-for="(item, index) in advatages">
          <v-flex xs12 md3 :key="index">
            <v-card class="elevation-0 transparent">
              <v-card-text class="text-xs-center">
                <v-icon x-large class="green--text text--darken-3" v-text="item.icon" />
              </v-card-text>
              <v-card-title primary-title class="layout justify-center">
                <div class="headline text-xs-center">{{ item.title }}</div>
              </v-card-title>
              <v-card-text>
                {{ item.text }}
              </v-card-text>
            </v-card>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import SignInForm from '@/components/auth/SignInEmailPassword'

export default {
  data () {
    return {
      advatages: [
        {
          icon: 'location_on',
          title: 'Места',
          text: 'Отметьте на карте любое место, опишите почему вы выбрали это место.'
        },
        {
          icon: 'alarm_on',
          title: 'События',
          text: 'Пригласите подписчиков на мероприятие. Укажите время и число учатсников.'
        },
        {
          icon: 'assignment_turned_in',
          title: 'Заявки',
          text: 'Проблемы требуют решения. Подайте заявку и следите за стутсом исполнения.'
        },
        {
          icon: 'check',
          title: 'Чекпойнты',
          text: 'Отмечайте посещения мест или голосуйте за понравившиеся места.'
        }
      ]
    }
  },
  components: {
    'sign-in-form': SignInForm
  }
}
</script>

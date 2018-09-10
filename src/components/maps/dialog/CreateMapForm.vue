<template>
  <form @submit.prevent="submit">
    <v-layout row wrap>
      <v-flex xs12 sm4 md3 class="pt-4">
        <div class="mx-auto align-center" style="width: 80%">
          <v-avatar
            color="grey lighten-4"
            :size="205"
            tile
          >
            <img :src="imageURL" />
          </v-avatar>
          <v-btn
            raised
            color="primary"
            @click="onPickFile"
            class="ml-0"
            flat
          >
            Загрузить изобраение
          </v-btn>
          <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/*"
            @change="onFilePicked"
          >
        </div>
      </v-flex>
      <v-flex xs12 sm8 md9>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              v-model="name"
              name="name"
              label="Название карты"
              prepend-icon="map"
              required
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-select
              :items="types"
              v-model="type"
              label="Тип карты"
              prepend-icon="location_on"
              class="input-group--focused"
              item-value="value"
              hint="В зависимости от типа карты определяется способ взаимодействия с участниками"
              persistent-hint
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <vuetify-google-autocomplete
              name="terrian"
              id="terrian"
              label="Территория"
              prepend-icon="public"
              required
              :clearable="true"
              placeholder="Начните вводить название города..."
              :value="terrianName"
              @placechanged="getAddressData"
              types="(cities)"
              country="ru"
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              v-model="zoom"
              name="zoom"
              type="number"
              min="0"
              max="18"
              number
              label="Масштаб"
              prepend-icon="zoom_in"
              hint="От 0 до 18"
              persistent-hint
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              v-model="caption"
              name="caption"
              label="Краткое описание"
              multi-line
              hint="Отображается в списке карт и на странице карты."
              persistent-hint
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              v-model="description"
              name="description"
              label="Подробное описание"
              multi-line
              hint="Отображается на странице описания карты"
              persistent-hint
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-checkbox v-model="activity" label="Разрешить пользовательскую активность" color="primary" />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-checkbox v-model="privacy" label="Это приватная карта" color="primary" />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-btn
              type="submit"
              color="primary"
              :disabled="loading('createMap')"
              :loading="loading('createMap')"
              class="mr-0"
              depressed
            >
              Создать карту
              <span
                v-if="loading('createMap')"
                slot="loader"
                class="custom-loader"
              >
                  <v-icon light>cached</v-icon>
                </span>
            </v-btn>
            <v-btn @click="clear">Очистить</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </form>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import config from '../../../middlewares/config'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
Vue.use(VuetifyGoogleAutocomplete, { apiKey: config.gmap.key })

export default {
  data () {
    return {
      name: '',
      description: '',
      caption: '',
      privacy: false,
      type: 'places',
      terrianName: '',
      terrian: null,
      activity: true,
      zoom: 14,
      image: '',
      imageURL: '',
      disabled: false,
      types: [
        {
          value: 'places',
          text: 'Места'
        },
        {
          value: 'events',
          text: 'События'
        },
        {
          value: 'orders',
          text: 'Заявки'
        },
        {
          value: 'checkpoint',
          text: 'Маршруты'
        },
        {
          value: 'poll',
          text: 'Опрос'
        },
        {
          value: 'blockchain',
          text: 'Блокчейн',
          disabled: true
        }
      ]
    }
  },

  computed: {
    ...mapGetters([
      'loading',
      'getLoadedAccount'
    ])
  },

  methods: {
    ...mapMutations([
      'setError',
      'setDialogActivity'
    ]),

    ...mapActions([
      'updateAppTitle',
      'createMap'
    ]),

    getAddressData (addressData, placeResultData) {
      if (addressData) {
        this.terrian = addressData
      }
      if (placeResultData) {
        this.terrianName = placeResultData.formatted_address
      }
    },

    onPickFile () {
      this.$refs.fileInput.click()
    },

    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        this.setError({
          code: 'maps/create-add-image',
          file: 'Файл не валидный.'
        })
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageURL = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },

    async submit () {
      await this.createMap({
        activity: this.activity,
        caption: this.caption,
        description: this.description,
        image: this.image,
        name: this.name,
        owner: this.getLoadedAccount.uid,
        privacy: this.privacy,
        terrian: this.terrian,
        type: this.type,
        zoom: +this.zoom
      })
      this.setDialogActivity(false)
      this.clear()
      this.$router.go(this.$router.currentRoute)
    },

    clear () {
      this.activity = true
      this.caption = ''
      this.description = ''
      this.image = ''
      this.name = ''
      this.privacy = false
      this.terrian = null
      this.terrianName = ''
      this.type = 'places'
      this.zoom = 14
    }
  },

  watch: {},

  async created () {
    await this.updateAppTitle('Новая карта')
  }
}
</script>

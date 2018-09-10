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
              v-model="title"
              name="name"
              label="Заголовок"
              prepend-icon="location_on"
              required
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              v-model="caption"
              name="caption"
              label="Краткое описание"
              prepend-icon="announcement"
              multi-line
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-checkbox v-model="comments" label="Разрешить комментарии" color="primary" />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-btn
              type="submit"
              color="primary"
              :disabled="loading('createMapPoint')"
              :loading="loading('createMapPoint')"
              class="mr-0"
              depressed
            >
              Добавить пойнт
              <span
                v-if="loading('createMapPoint')"
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
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      title: '',
      caption: '',
      comments: true,
      image: '',
      imageURL: '',
      disabled: false
    }
  },
  computed: {
    ...mapGetters([
      'loading',
      'getLoadedMap',
      'getLoadedAccount',
      'getDialogActivity',
      'getCreatedMapPoint'
    ]),
    active: {
      get () {
        return this.getDialogActivity
      },
      set (value) {
        this.setDialogActivity(value)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setSnack',
      'setCreatedMapPoint',
      'setDialogActivity',
      'setMapViewMode'
    ]),

    ...mapActions([
      'createMapPoint'
    ]),

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
      await this.createMapPoint({
        author: this.getLoadedAccount.uid,
        caption: this.caption,
        comments: this.comments,
        image: this.image,
        location: {
          lat: this.getCreatedMapPoint.location.lat(),
          lng: this.getCreatedMapPoint.location.lng()
        },
        mapId: this.getLoadedMap.id,
        title: this.title,
        type: this.type
      })
      this.setCreatedMapPoint(null)
      this.setMapViewMode(true)
      this.setDialogActivity(false)
      this.clear()
      this.setSnack('Место успешно добавлено!')
    },

    clear () {
      this.title = ''
      this.caption = ''
      this.type = 'place'
      this.comments = true
      this.image = ''
      this.imageURL = ''
    }
  }
}
</script>

<template>
  <v-card :color="data.color" :to="data.url" dark flat hover>
    <slot :data="data">
      <v-card-media v-if="data.image" :src="data.image" height="200px">
      </v-card-media>
      <v-card-title primary class="title">
        {{ data.title }}
      </v-card-title>
      <v-card-text>
        <p v-if="data.meta" class="subtitle">{{ data.meta }}</p>
        <div v-if="data.content" class="content">
          {{ data.content }}
        </div>
      </v-card-text>
    </slot>
  </v-card>
</template>

<script>
export default {
  props: {
    align: {
      type: String,
      default: 'left'
    },
    color: {
      type: String,
      default: 'primary'
    },
    data: {
      type: Object,
      default: {
        title: '',
        meta: '',
        image: '',
        content: '',
        url: '#',
        color: 'cyan darken-2'
      }
    }
  }
}
</script>

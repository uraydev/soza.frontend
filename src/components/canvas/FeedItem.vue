<template>
  <v-list-tile v-else avatar :to="url">
    <v-list-tile-avatar>
      <img :src="image" />
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title v-html="title" />
      <v-list-tile-sub-title v-html="meta" />
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    meta: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: 'http://via.placeholder.com/150x150'
    }
  }
}
</script>

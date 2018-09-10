<template>
  <v-card class="pa-3 transparent" flat>
    <v-card-media class="pa-3">
      <v-avatar
        :tile="tile"
        :size="150"
        color="grey lighten-4"
      >
        <img src="http://via.placeholder.com/150x150" alt="avatar">
      </v-avatar>
    </v-card-media>
    <v-card-text class="text-xs-center">
                    <span class="title">
                      Some user Name
                    </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {}
}
</script>

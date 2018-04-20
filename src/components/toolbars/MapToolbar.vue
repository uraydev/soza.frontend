<template>
  <div>
    <v-btn icon :to="{ name: 'MapFeed' }">
      <v-icon color="primary">history</v-icon>
    </v-btn>
    <v-btn icon :to="{ name: 'Map' }">
      <v-icon color="primary">location_on</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon color="primary">supervisor_account</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon color="red">favorite_border</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon color="primary">info</v-icon>
    </v-btn>
    <v-menu>
      <v-btn icon slot="activator" dark>
        <v-icon color="primary">more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" @click="">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      view: 1,
      items: [
        {
          title: 'Редактировать'
        },
        {
          title: 'Уведомления'
        },
        {
          title: 'Скрыть'
        }
      ]
    }
  }
}
</script>

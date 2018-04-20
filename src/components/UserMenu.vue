<template>
  <v-list>
    <v-list-tile
      value="true"
      v-for="(item, i) in items"
      :key="i"
      exact
    >
      <v-list-tile-action>
        <v-icon light color="primary" v-html="item.icon"></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="item.title"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
// import { mapState } from 'vuex';

export default {
  props: {
    items: {
      type: Array,
      'default': () => []
    }
  },
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      miniVariant: false
    }
  },
  computed: {
    // ...mapState({
    //   userId: state => state.user.id,
    // }),
    // items: state => state.$store.state.user.menu,
  }
}
</script>

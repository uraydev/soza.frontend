<template>
  <v-layout row wrap>
    <v-flex g-flex md3
            v-for="n in 9"
            :key="n"
    >
      <participants-list-item />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import ParticipantsListItem from '@/components/canvas/ParticipantsListItem'

export default {
  data () {
    return {
      size: 'sm',
      items: [
        { text: 'Extra small (2px)', value: 'xs' },
        { text: 'Small (4px)', value: 'sm' },
        { text: 'Medium (8px)', value: 'md' },
        { text: 'Large (16px)', value: 'lg' },
        { text: 'Extra large (24px)', value: 'xl' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'loaded',
      'getLoadedMap'
    ])
  },
  components: {
    'participants-list-item': ParticipantsListItem
  }
}
</script>

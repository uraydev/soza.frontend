<template>
  <layout-page
    v-if="loaded('loadMapInfo')"
    :title="getLoadedPageTitle|render"
    :meta="getLoadedPageOwnerName"
    :content="getLoadedPageDescription|render"
  >
  </layout-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageCanvas from '@/components/canvas/Page'

export default {
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'loaded',
      'getLoadedPageTitle',
      'getLoadedPageAuthorName',
      'getLoadedPageThumbnail',
      'getLoadedPageContent'
    ])
  },
  methods: {
    ...mapActions([
      'loadPage',
      'updateAppTitle'
    ])
  },
  components: {
    'layout-page': PageCanvas
  },
  async created () {
    await this.loadPage(this.pageId)
    this.updateAppTitle(this.getLoadedPage.title)
  }
}
</script>


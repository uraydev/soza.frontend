<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card flat>
          <v-card-title>
            <div  class="headline">
              {{ title }}
            </div>
          </v-card-title>
          <v-card-text v-if="meta">
            <v-subheader>
              <slot name="meta" :meta="meta">
                {{ meta }}
              </slot>
            </v-subheader>
          </v-card-text>
          <v-divider />
          <v-card-text v-if="content">
            <slot name="content" :content="content">
              <div v-html="content"></div>
            </slot>
          </v-card-text>
          <v-card-actions>
            <slot name="share">
              <share-pluso />
            </slot>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  }
}
</script>

<template>
  <v-alert
    @input="onClose"
    :value="true"
    :type="type"
    dismissible
    class="my-0"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'error'
    }
  },
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>

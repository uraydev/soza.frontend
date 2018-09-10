<template>
  <v-select
    :items="items"
    v-model="inputVal"
    :item-text="text"
    :item-value="value.iso2_cc"
    :label="label"
    :color="color"
    :prepend-icon="icon"
    autocomplete
    no-data-text="Данные недоступны"
    cache-items
    @change=" "
  >
    <template slot="item" slot-scope="data">
      <v-list-tile-avatar v-if="flags">
        <flag :iso="data.item.iso2_cc.toLowerCase()"/>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>
          {{ getString(data.item, type) }}
        </v-list-tile-title>
      </v-list-tile-content>
    </template>
  </v-select>
</template>

<script>
import Vue from 'vue'
import FlagIcon from 'vue-flag-icon'
import Countries from './countries'

// TODO Sort countries by users activity
// TODO Select default country by location

Vue.use(FlagIcon)

export default {
  props: {
    type: {
      type: [String, Array],
      default: 'local_name'
    },
    flags: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: 'local_name'
    },
    value: {
      type: [String, Object]
    },
    color: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: [String, Boolean],
      default: 'public'
    }
  },
  data () {
    return {
      inputVal: this.value
    }
  },
  computed: {
    items: () => Countries.data
  },
  watch: {
    inputVal (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    getString (obj, type) {
      if (Array.isArray(type)) {
        const result = []
        type.forEach(key => {
          if (obj.hasOwnProperty(key)) {
            result.push((key === 'e164_cc') ? `(+${obj[key]})` : obj[key])
          }
        })
        return result.join(' ')
      } else if (Object.keys(obj).includes(type)) {
        return obj[type]
      }
      return null
    }
  }
}
</script>

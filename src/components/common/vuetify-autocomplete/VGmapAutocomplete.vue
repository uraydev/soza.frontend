<template>
  <v-text-field
    :name="name"
    :id="id"
    :label="label"
    :prepend-icon="prependIcon"
    :placeholder="placeholder"
    :value="value"
    :required="required"
  />
</template>

<script>
import propsBinder from 'vue2-google-maps/src/utils/propsBinder'
import downArrowSimulator from 'vue2-google-maps/src/utils/simulateArrowDown'
import getPropsValuesMixin from 'vue2-google-maps/src/utils/getPropsValuesMixin'
import { loaded } from 'vue2-google-maps/src/manager'

const props = {
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: undefined
  },
  prependIcon: {
    type: String,
    required: true
  },
  bounds: {
    type: Object
  },
  componentRestrictions: {
    type: Object
  },
  types: {
    type: Array,
    default: function () {
      return []
    }
  },
  placeholder: {
    required: false,
    type: String
  },
  selectFirstOnEnter: {
    require: false,
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  },
  options: {
    type: Object
  }
}

export default {
  mixins: [getPropsValuesMixin],
  props,
  mounted () {
    loaded.then(() => {
      const input = document.getElementById(this.id)
      const options = this._.clone(this.getPropsValues())
      if (this.selectFirstOnEnter) {
        downArrowSimulator(input)
      }
      if (typeof (window.google.maps.places.Autocomplete) !== 'function') {
        throw new Error('google.maps.places.Autocomplete is undefined. Did you add \'places\' to libraries when loading Google Maps?')
      }
      /* eslint-disable no-unused-vars */
      const finalOptions = this._.pickBy(Object.assign(
        {},
        this._.omit(options, ['options', 'selectFirstOnEnter', 'value', 'place', 'placeholder']),
        options.options
      ), (v, k) => v !== undefined)
      // Component restrictions is rather particular. Undefined not allowed
      this.$watch('componentRestrictions', v => {
        if (v !== undefined) {
          this.$autocomplete.setComponentRestrictions(v)
        }
      })
      this.$autocomplete = new window.google.maps.places.Autocomplete(input, finalOptions)
      propsBinder(this, this.$autocomplete, this._.omit(props, ['placeholder', 'place', 'selectFirstOnEnter', 'value', 'componentRestrictions']))
      this.$autocomplete.addListener('place_changed', () => {
        this.$emit('place_changed', this.$autocomplete.getPlace())
      })
    })
  }
}
</script>

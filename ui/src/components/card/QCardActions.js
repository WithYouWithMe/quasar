import Vue from 'vue'

import AlignMixin from '../../mixins/align.js'

import slot from '../../utils/slot.js'

export default Vue.extend({
  name: 'WCardActions',

  mixins: [ AlignMixin ],

  props: {
    vertical: Boolean
  },

  computed: {
    classes () {
      return `q-card__actions--${this.vertical === true ? 'vert column' : 'horiz row'} ${this.alignClass}`
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'q-card__actions',
      class: this.classes,
      on: this.$listeners
    }, slot(this, 'default'))
  }
})

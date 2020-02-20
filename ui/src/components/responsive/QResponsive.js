import Vue from 'vue'

import RatioMixin from '../../mixins/ratio.js'
import { slot } from '../../utils/slot.js'

export default Vue.extend({
  name: 'WResponsive',

  mixins: [ RatioMixin ],

  render (h) {
    return h('div', {
      staticClass: 'q-responsive',
      on: this.$listeners
    }, [
      h('div', {
        staticClass: 'q-responsive__filler overflow-hidden'
      }, [
        h('div', { style: this.ratioStyle })
      ]),

      h('div', {
        staticClass: 'q-responsive__content absolute-full fit'
      }, slot(this, 'default'))
    ])
  }
})

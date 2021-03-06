import Vue from 'vue'

import WBtn from '../btn/QBtn.js'
import WIcon from '../icon/QIcon.js'

import FabMixin from '../../mixins/fab.js'
import ListenersMixin from '../../mixins/listeners.js'

import { mergeSlot } from '../../utils/slot.js'

const anchorMap = {
  start: 'self-end',
  center: 'self-center',
  end: 'self-start'
}

const anchorValues = Object.keys(anchorMap)

export default Vue.extend({
  name: 'WFabAction',

  mixins: [ ListenersMixin, FabMixin ],

  props: {
    icon: {
      type: String,
      default: ''
    },

    anchor: {
      type: String,
      validator: v => anchorValues.includes(v)
    },

    to: [String, Object],
    replace: Boolean
  },

  inject: {
    __qFabClose: {
      default () {
        console.error('WFabAction needs to be child of WFab')
      }
    }
  },

  computed: {
    classes () {
      const align = anchorMap[this.anchor]
      return this.formClass + (align !== void 0 ? ` ${align}` : '')
    },

    onEvents () {
      return {
        ...this.qListeners,
        click: this.click
      }
    }
  },

  methods: {
    click (e) {
      this.__qFabClose()
      this.$emit('click', e)
    }
  },

  render (h) {
    const child = []

    this.icon !== '' && child.push(
      h(WIcon, {
        props: { name: this.icon }
      })
    )

    this.label !== '' && child[this.labelProps.action](
      h('div', this.labelProps.data, [ this.label ])
    )

    return h(WBtn, {
      class: this.classes,
      props: {
        ...this.$props,
        noWrap: true,
        stack: this.stacked,
        icon: void 0,
        label: void 0,
        noCaps: true,
        fabMini: true
      },
      on: this.onEvents
    }, mergeSlot(child, this, 'default'))
  }
})

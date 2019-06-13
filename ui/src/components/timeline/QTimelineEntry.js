import Vue from 'vue'

import WIcon from '../icon/QIcon.js'

export default Vue.extend({
  name: 'WTimelineEntry',

  inject: {
    __timeline: {
      default () {
        console.error('WTimelineEntry needs to be child of WTimeline')
      }
    }
  },

  props: {
    heading: Boolean,
    tag: {
      type: String,
      default: 'h3'
    },
    side: {
      type: String,
      default: 'right',
      validator: v => ['left', 'right'].includes(v)
    },

    icon: String,
    avatar: String,

    color: String,

    title: String,
    subtitle: String,
    body: String
  },

  computed: {
    colorClass () {
      return `text-${this.color || this.__timeline.color}`
    },

    classes () {
      return `q-timeline__entry--${this.side}` +
        (this.icon !== void 0 || this.avatar !== void 0 ? ' q-timeline__entry--icon' : '')
    },

    reverse () {
      return this.__timeline.layout === 'comfortable' && this.__timeline.side === 'left'
    },

    hasTitle () {
      return this.$scopedSlots.title !== void 0 || this.title
    },

    hasSubtitle () {
      return this.$scopedSlots.subtitle !== void 0 || this.subtitle
    }
  },

  render (h) {
    const defSlot = this.$scopedSlots.default !== void 0
      ? this.$scopedSlots.default()
      : []

    if (this.body !== void 0) {
      defSlot.unshift(this.body)
    }

    if (this.heading === true) {
      const content = [
        h('div'),
        h('div'),
        h(
          this.tag,
          { staticClass: 'q-timeline__heading-title' },
          defSlot
        )
      ]

      return h('div', {
        staticClass: 'q-timeline__heading',
        on: this.$listeners
      }, this.reverse === true ? content.reverse() : content)
    }

    let dot

    if (this.icon !== void 0) {
      dot = [
        h(WIcon, {
          staticClass: 'row items-center justify-center',
          props: { name: this.icon }
        })
      ]
    }
    else if (this.avatar !== void 0) {
      dot = [
        h('img', {
          staticClass: 'q-timeline__dot-img',
          domProps: { src: this.avatar }
        })
      ]
    }

    const content = [
      ...(this.hasSubtitle ? [
        h('div', { staticClass: 'q-timeline__subtitle' }, [
          h(
            'span',
            this.$scopedSlots.subtitle !== void 0
              ? this.$scopedSlots.subtitle()
              : [ this.subtitle ]
          )
        ])] : []),

      h('div', {
        staticClass: 'q-timeline__dot',
        class: this.colorClass
      }, dot),

      h('div', { staticClass: 'q-timeline__content' }, [
        ...(this.hasTitle ? [h(
          'h6',
          { staticClass: 'q-timeline__title' },
          this.$scopedSlots.title !== void 0
            ? this.$scopedSlots.title()
            : [ this.title ]
        )] : [])
      ].concat(defSlot))
    ]

    return h('li', {
      staticClass: 'q-timeline__entry',
      class: this.classes,
      on: this.$listeners
    }, this.reverse === true ? content.reverse() : content)
  }
})

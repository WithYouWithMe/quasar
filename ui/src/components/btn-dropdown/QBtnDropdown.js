import Vue from 'vue'

import BtnMixin from '../../mixins/btn.js'

import WIcon from '../icon/QIcon.js'
import WBtn from '../btn/QBtn.js'
import WBtnGroup from '../btn-group/QBtnGroup.js'
import WMenu from '../menu/QMenu.js'

import slot from '../../utils/slot.js'

export default Vue.extend({
  name: 'WBtnDropdown',

  mixins: [ BtnMixin ],

  props: {
    value: Boolean,
    split: Boolean,
    dropdownIcon: String,

    contentClass: [Array, String, Object],
    contentStyle: [Array, String, Object],

    cover: Boolean,
    persistent: Boolean,
    autoClose: Boolean,
    menuAnchor: {
      type: String,
      default: 'bottom right'
    },
    menuSelf: {
      type: String,
      default: 'top right'
    },

    disableMainBtn: Boolean,
    disableDropdown: Boolean
  },

  data () {
    return {
      showing: this.value
    }
  },

  watch: {
    value (val) {
      this.$refs.menu !== void 0 && this.$refs.menu[val ? 'show' : 'hide']()
    }
  },

  render (h) {
    const label = slot(this, 'label', [])

    const Arrow = [
      h(WIcon, {
        props: {
          name: this.dropdownIcon || this.$q.iconSet.arrow.dropdown
        },
        staticClass: 'q-btn-dropdown__arrow',
        class: {
          'rotate-180': this.showing,
          'q-btn-dropdown__arrow-container': this.split === false
        }
      })
    ]

    this.disableDropdown !== true && Arrow.push(
      h(WMenu, {
        ref: 'menu',
        props: {
          cover: this.cover,
          fit: true,
          persistent: this.persistent,
          autoClose: this.autoClose,
          anchor: this.menuAnchor,
          self: this.menuSelf,
          contentClass: this.contentClass,
          contentStyle: this.contentStyle,
          separateClosePopup: true
        },
        on: this.menuEvents
      }, slot(this, 'default'))
    )

    if (this.split === false) {
      return h(WBtn, {
        class: 'q-btn-dropdown q-btn-dropdown--simple',
        props: {
          ...this.$props,
          disable: this.disable === true || this.disableMainBtn === true,
          noWrap: true,
          round: false
        },
        on: this.nonSplitEvents
      }, label.concat(Arrow))
    }

    const Btn = h(WBtn, {
      class: 'q-btn-dropdown--current',
      props: {
        ...this.$props,
        disable: this.disable === true || this.disableMainBtn === true,
        noWrap: true,
        iconRight: this.iconRight,
        round: false
      },
      on: this.splitEvents
    }, label)

    return h(WBtnGroup, {
      props: {
        outline: this.outline,
        flat: this.flat,
        rounded: this.rounded,
        push: this.push,
        unelevated: this.unelevated,
        glossy: this.glossy,
        stretch: this.stretch
      },
      staticClass: 'q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item'
    }, [
      Btn,

      h(WBtn, {
        staticClass: 'q-btn-dropdown__arrow-container',
        props: {
          disable: this.disable === true || this.disableDropdown === true,
          outline: this.outline,
          flat: this.flat,
          rounded: this.rounded,
          push: this.push,
          size: this.size,
          color: this.color,
          stretch: this.stretch,
          textColor: this.textColor,
          dense: this.dense,
          ripple: this.ripple
        }
      }, Arrow)
    ])
  },

  methods: {
    toggle (evt) {
      this.$refs.menu && this.$refs.menu.toggle(evt)
    },

    show (evt) {
      this.$refs.menu && this.$refs.menu.show(evt)
    },

    hide (evt) {
      this.$refs.menu && this.$refs.menu.hide(evt)
    }
  },

  created () {
    this.nonSplitEvents = {
      click: e => {
        this.$emit('click', e)
      }
    }

    this.splitEvents = {
      click: e => {
        this.hide()
        this.$emit('click', e)
      }
    }

    this.menuEvents = {
      'before-show': e => {
        this.showing = true
        this.$emit('before-show', e)
      },
      show: e => {
        this.$emit('show', e)
        this.$emit('input', true)
      },
      'before-hide': e => {
        this.showing = false
        this.$emit('before-hide', e)
      },
      hide: e => {
        this.$emit('hide', e)
        this.$emit('input', false)
      }
    }
  },

  mounted () {
    this.value === true && this.show()
  }
})

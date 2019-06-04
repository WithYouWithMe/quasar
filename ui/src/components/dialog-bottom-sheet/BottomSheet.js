import Vue from 'vue'

import QDialog from '../dialog/QDialog.js'

import WIcon from '../icon/QIcon.js'
import WSeparator from '../separator/QSeparator.js'

import WCard from '../card/QCard.js'
import WCardSection from '../card/QCardSection.js'

import WItem from '../list/QItem.js'
import WItemSection from '../list/QItemSection.js'

export default Vue.extend({
  name: 'BottomSheetPlugin',

  inheritAttrs: false,

  props: {
    title: String,
    message: String,
    actions: Array,

    grid: Boolean,

    cardClass: [String, Array, Object],
    cardStyle: [String, Array, Object],

    dark: Boolean
  },

  methods: {
    show () {
      this.$refs.dialog.show()
    },

    hide () {
      this.$refs.dialog.hide()
    },

    onOk (action) {
      this.$emit('ok', action)
      this.hide()
    },

    __getGrid (h) {
      return this.actions.map(action => {
        const img = action.avatar || action.img

        return action.label === void 0
          ? h(WSeparator, {
            staticClass: 'col-all',
            props: { dark: this.dark }
          })
          : h('div', {
            staticClass: 'q-bottom-sheet__item q-hoverable q-focusable cursor-pointer relative-position',
            class: action.classes,
            attrs: { tabindex: 0 },
            on: {
              click: () => this.onOk(action),
              keyup: e => {
                e.keyCode === 13 && this.onOk(action)
              }
            }
          }, [
            h('div', { staticClass: 'q-focus-helper' }),

            action.icon
              ? h(WIcon, { props: { name: action.icon, color: action.color } })
              : (
                img
                  ? h('img', {
                    attrs: { src: img },
                    staticClass: action.avatar ? 'q-bottom-sheet__avatar' : null
                  })
                  : h('div', { staticClass: 'q-bottom-sheet__empty-icon' })
              ),

            h('div', [ action.label ])
          ])
      })
    },

    __getList (h) {
      return this.actions.map(action => {
        const img = action.avatar || action.img

        return action.label === void 0
          ? h(WSeparator, { props: { spaced: true, dark: this.dark } })
          : h(WItem, {
            staticClass: 'q-bottom-sheet__item',
            class: action.classes,
            props: {
              tabindex: 0,
              clickable: true,
              dark: this.dark
            },
            on: {
              click: () => this.onOk(action),
              keyup: e => {
                e.keyCode === 13 && this.onOk(action)
              }
            }
          }, [
            h(WItemSection, { props: { avatar: true } }, [
              action.icon
                ? h(WIcon, { props: { name: action.icon, color: action.color } })
                : (
                  img
                    ? h('img', {
                      attrs: { src: img },
                      staticClass: action.avatar ? 'q-bottom-sheet__avatar' : null
                    })
                    : null
                )
            ]),
            h(WItemSection, [ action.label ])
          ])
      })
    }
  },

  render (h) {
    let child = []

    if (this.title) {
      child.push(
        h(WCardSection, {
          staticClass: 'q-dialog__title'
        }, [ this.title ])
      )
    }

    if (this.message) {
      child.push(
        h(WCardSection, {
          staticClass: 'q-dialog__message scroll'
        }, [ this.message ])
      )
    }

    child.push(
      this.grid === true
        ? h('div', {
          staticClass: 'scroll row items-stretch justify-start'
        }, this.__getGrid(h))
        : h('div', { staticClass: 'scroll' }, this.__getList(h))
    )

    return h(QDialog, {
      ref: 'dialog',

      props: {
        ...this.$attrs,
        position: 'bottom'
      },

      on: {
        hide: () => {
          this.$emit('hide')
        }
      }
    }, [
      h(WCard, {
        staticClass: `q-bottom-sheet q-bottom-sheet--${this.grid === true ? 'grid' : 'list'}` +
          (this.dark === true ? ' q-bottom-sheet--dark' : ''),
        style: this.cardStyle,
        class: this.cardClass
      }, child)
    ])
  }
})

import WLinearProgress from '../linear-progress/QLinearProgress.js'
import WCheckbox from '../checkbox/QCheckbox.js'
import WSeparator from '../separator/QSeparator.js'

export default {
  methods: {
    getGridBody (h) {
      const item = this.$scopedSlots.item !== void 0
        ? this.$scopedSlots.item
        : scope => {
          const child = scope.cols.map(
            col => h('div', { staticClass: 'q-table__grid-item-row' }, [
              h('div', { staticClass: 'q-table__grid-item-title' }, [ col.label ]),
              h('div', { staticClass: 'q-table__grid-item-value' }, [ col.value ])
            ])
          )

          this.hasSelectionMode === true && child.unshift(
            h('div', { staticClass: 'q-table__grid-item-row' }, [
              h(WCheckbox, {
                props: {
                  value: scope.selected,
                  color: this.color,
                  dark: this.dark,
                  dense: true
                },
                on: {
                  input: val => {
                    scope.selected = val
                  }
                }
              })
            ]),

            h(WSeparator, { props: { dark: this.dark } })
          )

          return h('div', {
            staticClass: 'q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3',
            class: scope.selected === true ? 'q-table__grid-item--selected' : null
          }, [
            h('div', {
              staticClass: 'q-table__grid-item-card' + this.cardDefaultClass,
              class: this.cardClass,
              style: this.cardStyle
            }, child)
          ])
        }

<<<<<<< HEAD
      return [
        this.hideHeader === false
          ? h('div', { staticClass: 'q-table__middle' }, [
            this.loading === true
              ? h(WLinearProgress, {
                staticClass: 'q-table__linear-progress',
                props: {
                  color: this.color,
                  dark: this.dark,
                  indeterminate: true
                }
              })
              : null
          ])
          : null,

        h('div', { staticClass: 'row' }, this.computedRows.map(row => {
          const
            key = row[this.rowKey],
            selected = this.isRowSelected(key)
=======
      return h('div', { staticClass: 'row' }, this.computedRows.map(row => {
        const
          key = row[this.rowKey],
          selected = this.isRowSelected(key)
>>>>>>> 378aae54763aa4825716a409a657bed1c74c3ce7

        return item(this.addBodyRowMeta({
          key,
          row,
          cols: this.computedCols,
          colsMap: this.computedColsMap,
          __trClass: selected ? 'selected' : ''
        }))
      }))
    },

    getGridHeader (h) {
      return h('div', { staticClass: 'q-table__middle' }, [
        this.gridHeader === true
          ? h('table', { staticClass: 'q-table' }, [
            this.getTableHeader(h)
          ])
          : (this.loading === true
            ? h(QLinearProgress, {
              staticClass: 'q-table__linear-progress',
              props: {
                color: this.color,
                dark: this.dark,
                indeterminate: true
              }
            })
            : null
          )
      ])
    }
  }
}

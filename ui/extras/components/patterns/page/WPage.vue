<template lang="pug">
  q-page.w-page.row.col-12.items-start(:padding="padding")
    transition(appear enter-active-class="animated fadeIn")
      .row.col-12(:class="{ 'offset-md-2': offset, 'col-md-8': offset }")
        .row.col-12.justify-between.items-end.no-wrap
          .text-page-title {{title}}
          .row.no-wrap
            slot(name="title-right")
              w-space
          slot(name="action-btn")
        .row.q-col-gutter-md.q-mt-md.full-width
          .col-xs-12.col-sm-auto(v-if="details")
            w-info-card(:details="details")
              template(v-slot:actions)
                w-btn.full-width(:label="buttonLabel" icon-right="ao-check" color="primary" @click="$emit('btn-click')")
          .col
            w-card.full-width
              template
                w-card-section.filters(v-if="$scopedSlots.filters")
                  .row
                    slot(name="filters")
                w-separator
              w-img(:src="imgSrc")
              w-card-section.relative-position.content
                slot
                w-inner-loading(:showing="loading")
        slot(name="action-btn")
    w-page-scroller(position="bottom-right" :scroll-offset="150" :offset="[18, 18]")
      w-btn(fab icon="ao-arrow-circle-up" color="accent")
</template>

<script>
import { QPage, WPageScroller, WSpace } from "quasar";

export default {
  components: { QPage, WPageScroller, WSpace },
  name: "WPage",
  props: {
    offset: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    details: {
      type: Array,
      required: true,
      default: null,
    },
    imgSrc: {
      type: String,
      default: null,
    },
    buttonLabel: {
      type: String,
      required: true,
    },
  },
};
</script>


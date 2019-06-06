<template lang="pug">
  q-page.w-page.row.col-12.items-start(:padding="padding")
    .row.col-12(:class="{ 'offset-md-2': offset, 'col-md-8': offset }")
      .row.col-12.justify-between.items-end
        .text-page-title {{title}}
        slot(name="title-right")
          w-space
      .full-width
        slot
    w-page-scroller(position="bottom-right" :scroll-offset="150" :offset="[18, 18]")
      w-btn(fab icon="mdi-chevron-double-up" color="accent")
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
    title: {
      type: String,
      default: "",
    },
    padding: {
      type: Boolean,
      default: false,
    },
  },
};
</script>


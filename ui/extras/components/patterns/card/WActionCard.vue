<template lang="pug">
  transition(appear enter-active-class="animated slideRight")
    w-card.w-card.w-action-card.cursor-pointer(flat bordered)
      .column.full-height.justify-center.items-center(v-if="loading")
        w-spinner(size="3em" color="grey-4")
      template(v-else)
        w-img(v-if="imgSrc" :src="imgSrc" :ratio="16/9" transition="fade")
          .absolute-bottom.q-ml-sm.q-mb-xs(v-if="chipLeft")
            w-chip(:color="chipColor" :style="chipStyle") {{chipLeft}}
        .items-lower.row.justify-between.items-end(v-if="!chipLeft && (chipRight || month || day)")
          w-card.calendar.q-py-sm.q-px-md.q-ml-md(v-if="month || day")
            .column.full-height.justify-center.items-center
              .month {{month}}
              .day {{day}}
          .calendar-placeholder(v-else)
          w-chip.q-mr-md(v-if="chipRight" :color="chipColor" :style="chipStyle") {{chipRight}}
        w-card-section(v-if="title || subtitle")
          .subtitle(v-if="subtitle") {{subtitle}}
          .title(v-if="title") {{title}}
        w-card-section.details(v-if="details")
          .column
            .row.q-gutter-sm(v-for="(detail, detailIndex) in details" :key="detailIndex")
              w-icon(:name="detail.icon")
              .text-caption {{detail.text}}
</template>

<script>
import { WCard, WCardSection, WImg, WChip, WSpinner } from "quasar";

export default {
  name: "WActionCard",
  mixins: [ WCard ],
  components: { WCard, WCardSection, WImg, WChip },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    imgSrc: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
    chipLeft: {
      type: String,
      default: null,
    },
    chipRight: {
      type: String,
      default: null,
    },
    chipColor: {
      type: String,
      default: null,
    },
    chipTextColor: {
      type: String,
      default: "white",
    },
    month: {
      type: String,
      default: null,
    },
    day: {
      type: String,
      default: null,
    },
    details: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    chipStyle() {
      return {
        color: this.chipTextColor,
      };
    },
  },
};
</script>

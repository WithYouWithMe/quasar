<template lang="pug">
  w-page(:title="title" padding offset)
    template(v-slot:title-right)
      slot(name="title-right")
    w-card.q-mt-md.col-12
      w-card-section.filters
        .row
          slot(name="filters")
      w-separator
      w-card-section
        slot
</template>

<script>
import { WCard, WSeparator, WCardSection } from "quasar";

export default {
  components: { WCard, WSeparator, WCardSection },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<template lang="pug">
  .row.q-gutter-md
    .col-xs-12.col-sm-auto
      w-info-card(:details="details")
        template(v-slot:actions)
          w-btn.full-width(:label="buttonLabel" icon-right="mdi-check" color="primary" @click="$emit('btn-click')")
    .col
      w-card
        w-img(:src="imgSrc")
        w-card-section
          .text-page-title {{title}}
        w-card-section
          slot(name="description")
            div {{description}}
</template>

<script>
export default {
  props: {
    details: {
      type: Array,
      required: true,
      default: () => null,
    },
    title: {
      type: String,
      required: true,
      default: "",
    },
    description: {
      type: String,
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

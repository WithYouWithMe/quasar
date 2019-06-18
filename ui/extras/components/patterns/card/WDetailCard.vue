<template lang="pug">
  div
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
      default: null,
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
  },
};
</script>

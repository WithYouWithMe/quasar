<template lang="pug">
  w-input(v-model="val" debounce="500" label="Keywords" clearable)
    template(v-slot:prepend)
      w-icon(name="ao-search")
</template>

<script>
export default {
  name: "WSearchInput",
  props: {
    value: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      val: this.value,
    };
  },
  watch: {
    val(newValue) {
      this.$emit("input", newValue);
    },
  },
}
</script>

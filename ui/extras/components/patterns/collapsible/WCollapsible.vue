<template lang="pug">
  w-expansion-item.border.rounded-borders(v-model="showing" :header-class="headerClass" v-bubble.show.hide)
    template(v-slot:header)
      w-item-section(side)
        w-icon(:name="iconName" :color="iconColor")
      w-item-section.text-bold {{label}}
      w-item-section(side)
        .row.items-center
          span Edit
    w-separator
    w-card
      w-card-section
        slot
        slot(name="buttons")
</template>

<script>
import { WExpansionItem } from "quasar";
import messageBus from "../../../mixins/messageBus";

export default {
  name: "WCollapsible",
  mixins: [ WExpansionItem, messageBus ],
  props: {
    label: {
      type: String,
      default: false,
    },
    completed: {
      type: Boolean,
      default: undefined,
    },
    icon: {
      type: String,
      default: null,
    },
    headerClass: {
      type: String,
      default: "bg-white",
    },
  },
  data() {
    return {
      showing: false,
      isCompleted: this.completed,
    };
  },
  mounted() {
    if (this.messageBus) {
      this.messageBus.$on("validated", value => {
        this.isCompleted = value;
      });
    }
  },
  computed: {
    iconName() {
      let result;

      if (this.showing) {
        result = "ao-pen";
      } else if (this.isCompleted === true) {
        result = "ao-check-filled";
      } else if (this.isCompleted === false) {
        result = "ao-exclamation-circle-filled";
      } else {
        result = this.icon;
      }

      return result;
    },
    iconColor() {
      let result;

      if (this.showing) {
        result = "grey-8";
      } else if (this.isCompleted === true) {
        result = "positive";
      } else if (this.isCompleted === false) {
        result = "negative";
      } else {
        result = "";
      }

      return result;
    },
  },
};
</script>


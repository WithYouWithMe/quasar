<template lang="pug">
  w-field.w-date-range
    .row.text-input.items-center {{dateRangeString}}
    template(v-slot:append)
      w-icon(name="mdi-calendar")
        w-popup-proxy(ref="qDateProxy" transition-show="scale" transition-hide="scale")
          w-card.w-date-range-popup
            w-card-section.non-selectable
              .row.justify-between.items-center
                .text-subtitle1.text-bold {{dateRangeString}}
                w-btn(flat round dense icon="mdi-close" v-close-popup)
              .row.q-gutter-md
                .column.col.calendar-month.q-pt-md
                  .row.items-center.justify-between
                    w-btn(flat round dense icon="mdi-arrow-left" @click="goPrevMonth()")
                    .text-body2 {{monthsLocale[activeMonthStart] +' '+ activeYearStart}}
                    w-btn.lt-md(flat round dense icon="mdi-arrow-right" @click="goNextMonth()")
                    .gt-sm
                  .row
                    .text-body2.calendar-column(v-for="item in shortDaysLocale" :key="item") {{item}}
                  .col
                    ul.calendar-days(v-for="r in 6" :key="r")
                      li(:class="{'calendar-days-selected': isDateSelected(r, i, 'first', startMonthDay, endMonthDate), 'calendar-days-in-range': isDateInRange(r, i, 'first', startMonthDay, endMonthDate), 'calendar-days-disabled': isDateDisabled(r, i, startMonthDay, endMonthDate)}" v-for="i in numOfDays" :key="i" v-html="getDayCell(r, i, startMonthDay, endMonthDate)" @click="selectFirstItem(r, i)")
                .column.col.calendar-month.gt-sm.q-pt-md
                  .row.items-center.justify-between
                    div
                    .text-body2 {{monthsLocale[startNextActiveMonth] +' '+ activeYearEnd}}
                    w-btn(flat round dense icon="mdi-arrow-right" @click="goNextMonth()")
                  .row
                    .text-body2.calendar-column(v-for="item in shortDaysLocale" :key="item") {{item}}
                  .col
                    ul.calendar-days(v-for="r in 6" :key="r")
                      li(:class="{'calendar-days-selected': isDateSelected(r, i, 'second', startNextMonthDay, endNextMonthDate), 'calendar-days-in-range': isDateInRange(r, i, 'second', startNextMonthDay, endNextMonthDate), 'calendar-days-disabled': isDateDisabled(r, i, startNextMonthDay, endNextMonthDate)}" v-for="i in numOfDays" :key="i" v-html="getDayCell(r, i, startNextMonthDay, endNextMonthDate)" @click="selectSecondItem(r, i)")
                .column.col.calendar-presets
                  w-btn(v-for="(item, idx) in finalPresetRanges" :key="idx" flat :label="item.label" :color="presetActive === item.label ? 'primary' : ''" @click="updatePreset(item)")
                  w-btn.q-mt-md(color="primary" label="OK" @click="setDateValue()" v-close-popup)
</template>

<script>
import { WPopupProxy, WIcon, WField, WCard, WCardSection, date } from "quasar";

const defaultConfig = {};
const defaultI18n = "en";
const availableMonths = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",
    "December"],
};

const availableShortDays = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const presetRangeLabel = {
  en: {
    next7days: "Next 7 days",
    next30days: "Next 30 days",
    next60days: "Next 60 days",
    next90days: "Next 90 days",
    thisYear: "This year",
  },
};

const defaultPresets = function (i18n = defaultI18n) {
  return {
    next7days() {
      const n = new Date();
      const today = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
      const end = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() + 7));
      return {
        label: presetRangeLabel[i18n].next7days,
        active: false,
        dateRange: {
          start: today,
          end: end,
        }
      };
    },
    next30days() {
      const n = new Date();
      const today = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
      const end = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() + 30));
      return {
        label: presetRangeLabel[i18n].next30days,
        active: false,
        dateRange: {
          start: today,
          end: end,
        },
      };
    },
    next60days() {
      const n = new Date();
      const today = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
      const end = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() + 60));
      return {
        label: presetRangeLabel[i18n].next60days,
        active: false,
        dateRange: {
          start: today,
          end: end,
        },
      };
    },
    next90days() {
      const n = new Date();
      const today = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
      const end = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() + 90));
      return {
        label: presetRangeLabel[i18n].next90days,
        active: false,
        dateRange: {
          start: today,
          end: end,
        },
      };
    },
    thisYear() {
      const n = new Date();
      const today = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
      const endYear = new Date(Date.UTC(n.getFullYear(), 11, 30));
      return {
        label: presetRangeLabel[i18n].thisYear,
        active: false,
        dateRange: {
          start: today,
          end: endYear
        },
      };
    },
  };
};

export default {
  components: { WPopupProxy, WIcon, WField, WCard, WCardSection },
  name: "WDateRange",
  props: {
    configs: {
      type: Object,
      default: () => defaultConfig
    },
    i18n: {
      type: String,
      default: defaultI18n
    },
    startActiveMonth: {
      type: Number,
      default: new Date().getMonth()
    },
    startActiveYear: {
      type: Number,
      default: new Date().getFullYear()
    },
  },
  data() {
    return {
      dateRange: {},
      numOfDays: 7,
      isFirstChoice: true,
      presetActive: "",
      showMonth: true,
      activeMonthStart: this.startActiveMonth,
      activeYearStart: this.startActiveYear,
      activeYearEnd: this.startActiveYear
    };
  },
  created() {
    if (this.activeMonthStart === 11) this.activeYearEnd = this.activeYearStart + 1;
  },
  watch: {
    startNextActiveMonth(value) {
      if (value === 0) this.activeYearEnd = this.activeYearStart + 1;
    }
  },
  computed: {
    monthsLocale() {
      return this.months || availableMonths[this.i18n];
    },
    shortDaysLocale() {
      return this.shortDays || availableShortDays[this.i18n];
    },
    startMonthDay() {
      return new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 1)).getDay();
    },
    startNextMonthDay() {
      return new Date(Date.UTC(this.activeYearStart, this.startNextActiveMonth, 1)).getDay();
    },
    endMonthDate() {
      return new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 0)).getDate();
    },
    endNextMonthDate() {
      return new Date(Date.UTC(this.activeYearEnd, this.activeMonthStart + 2, 0)).getDate();
    },
    startNextActiveMonth() {
      return this.activeMonthStart >= 11 ? 0 : this.activeMonthStart + 1;
    },
    finalPresetRanges() {
      const tmp = {};
      const presets = this.presetRanges || defaultPresets(this.i18n);
      for (const i in presets) {
        const item = presets[i];
        let plainItem = item;
        if (typeof item === "function") {
          plainItem = item();
        }
        tmp[i] = plainItem;
      }
      return tmp;
    },
    dateRangeString() {
      let result;

      if (this.dateRange.start || this.dateRange.end) {
        result = `${this.getDateString(this.dateRange.start)} - ${this.getDateString(this.dateRange.end)}`;
      } else {
        result = "Choose dates";
      }

      return result;
    },
  },
  methods: {
    getDateString(d) {
      let result = "";

      if (d) {
        result = date.formatDate(d, "D MMM YYYY");
      }

      return result;
    },
    getDayIndexInMonth(r, i, startMonthDay) {
      const date = (this.numOfDays * (r - 1)) + i;
      return date - startMonthDay;
    },
    getDayCell(r, i, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay);
      // bound by > 0 and < last day of month
      return result > 0 && result <= endMonthDate ? result : "&nbsp;";
    },
    getNewDateRange(result, activeMonth, activeYear) {
      const newData = {};
      let key = "start";
      if (!this.isFirstChoice) {
        key = "end";
      } else {
        newData["end"] = null;
      }
      const resultDate = new Date(Date.UTC(activeYear, activeMonth, result));
      if (!this.isFirstChoice && resultDate < this.dateRange.start) {
        this.isFirstChoice = false;
        return { start: resultDate };
      }

      // toggle first choice
      this.isFirstChoice = !this.isFirstChoice;
      newData[key] = resultDate;
      return newData;
    },
    selectFirstItem(r, i) {
      const result = this.getDayIndexInMonth(r, i, this.startMonthDay);
      this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.activeMonthStart,
        this.activeYearStart));
      if (this.dateRange.start && this.dateRange.end) {
        this.presetActive = "";
        if (this.isCompact) {
          this.showMonth = false;
        }
      }
    },
    selectSecondItem(r, i) {
      const result = this.getDayIndexInMonth(r, i, this.startNextMonthDay);
      this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.startNextActiveMonth,
        this.activeYearEnd));
      if (this.dateRange.start && this.dateRange.end) {
        this.presetActive = "";
      }
    },
    isDateSelected(r, i, key, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay);
      if (result < 1 || result > endMonthDate) return false;

      let currDate = null;
      if (key === "first") {
        currDate = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result));
      } else {
        currDate = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, result));
      }
      return (this.dateRange.start && this.dateRange.start.getTime() === currDate.getTime()) ||
        (this.dateRange.end && this.dateRange.end.getTime() === currDate.getTime());
    },
    isDateInRange(r, i, key, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay);
      if (result < 1 || result > endMonthDate) return false;

      let currDate = null;
      if (key === "first") {
        currDate = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result));
      } else {
        currDate = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, result));
      }
      return (this.dateRange.start && this.dateRange.start.getTime() < currDate.getTime()) &&
        (this.dateRange.end && this.dateRange.end.getTime() > currDate.getTime());
    },
    isDateDisabled(r, i, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay);
      // bound by > 0 and < last day of month
      return !(result > 0 && result <= endMonthDate);
    },
    goPrevMonth() {
      const prevMonth = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 0));
      this.activeMonthStart = prevMonth.getMonth();
      this.activeYearStart = prevMonth.getFullYear();
      this.activeYearEnd = prevMonth.getFullYear();
    },
    goNextMonth() {
      const nextMonth = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 1));
      this.activeMonthStart = nextMonth.getMonth();
      this.activeYearStart = nextMonth.getFullYear();
      this.activeYearEnd = nextMonth.getFullYear();
    },
    updatePreset(item) {
      this.presetActive = item.label;
      this.dateRange = item.dateRange;
      // update start active month
      this.activeMonthStart = this.dateRange.start.getMonth();
      this.activeYearStart = this.dateRange.start.getFullYear();
      this.activeYearEnd = this.dateRange.end.getFullYear();
    },
    setDateValue() {
      this.$emit("input", this.dateRange);
    }
  }
};
</script>

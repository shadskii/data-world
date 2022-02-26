import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { CountryCode3 } from "../types/countries";

export const MIN_YEAR = 1982;
export const MAX_YEAR = 2050;

export const usePopulationParams = defineStore("population-params", () => {
  const year = ref(1993);
  const selectedCountry = ref<CountryCode3>();

  const allYears = computed(() => {
    return Array.from(
      { length: MAX_YEAR - MIN_YEAR + 1 },
      (_, i) => MIN_YEAR + i
    );
  });
  return {
    year,
    allYears,
    selectedCountry,
  };
});

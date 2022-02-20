import { defineStore } from "pinia";
import { CountryCode3 } from "../types/countries";

export const MIN_YEAR = 1982;
export const MAX_YEAR = 2050;

export const usePopulationParams = defineStore("population-params", {
  state: () => ({
    year: 1993,
    selectedCountry: "" as CountryCode3 | undefined,
  }),
});

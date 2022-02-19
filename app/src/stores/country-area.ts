import { byFips } from "country-code-lookup";
import { defineStore } from "pinia";
import { cubejsApi } from "../api";
import { CountryCode3 } from "../types/countries";

export const useCountryArea = defineStore("country-area", {
  state: () => ({
    areaMap: {} as Record<CountryCode3, number>,
    loading: false,
  }),
  getters: {
    countryArea: (state) => (countryCode3: CountryCode3) =>
      state.areaMap?.[countryCode3] ?? 0,
  },
  actions: {
    async fetch() {
      this.loading = true;

      const cubeData = await cubejsApi.load({
        dimensions: ["Areas.area", "Areas.country"],
      });
      this.areaMap = Object.fromEntries(
        cubeData.tablePivot().map((row) => {
          const countryCodeFips = row["Areas.country"] as string;
          const countryCodeIso3 = byFips(countryCodeFips)?.iso3;
          return [countryCodeIso3, row["Areas.area"]];
        })
      );
      this.loading = false;
    },
  },
});

import { defineStore } from "pinia";
import { cubejsApi } from "../api";
import { CountryCode2 } from "../types/countries";

export const useCountryArea = defineStore("country-area", {
  state: () => ({
    areaMap: {} as Record<CountryCode2, number>,
    loading: false,
  }),
  getters: {
    countryArea: (state) => (countryCode2: CountryCode2) =>
      state.areaMap?.[countryCode2] ?? 0,
  },
  actions: {
    async fetch() {
      this.loading = true;

      const cubeData = await cubejsApi.load({
        dimensions: ["Areas.area", "Areas.country"],
      });
      this.areaMap = Object.fromEntries(
        cubeData.tablePivot().map((row) => {
          return [row["Areas.country"], row["Areas.area"]];
        })
      );
      this.loading = false;
    },
  },
});

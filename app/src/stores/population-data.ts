import { defineStore } from "pinia";
import { cubejsApi } from "../api";
import { convertTo3, CountryCode2, CountryCode3 } from "../types/countries";
import { byFips } from "country-code-lookup";

export const usePopulationDataStore = defineStore("population-data", {
  state: () => ({
    minYear: 1982,
    maxYear: 2050,
    year: 1993,
    loading: false,
    populationMap: {} as Record<CountryCode3, number>,
  }),
  getters: {
    /**
     * Total population of all countries.
     */
    worldPopulation(state) {
      const { populationMap } = state;
      if (!populationMap) return 0;
      return Object.values(populationMap).reduce(
        (acc, value) => acc + value,
        0
      );
    },
  },
  actions: {
    async fetch() {
      this.loading = true;

      const cubeData = await cubejsApi.load({
        filters: [],
        dimensions: [
          "PredictedPopulation.country",
          "PredictedPopulation.population",
        ],
        measures: [],
        timeDimensions: [
          {
            dimension: "PredictedPopulation.year",
            granularity: "year",
            dateRange: [`${this.year}`, `${this.year}`],
          },
        ],
      });
      this.populationMap = Object.fromEntries(
        cubeData.tablePivot().map((row) => {
          const countryCodeFips = row["PredictedPopulation.country"] as string;
          const countryCodeIso3 = byFips(countryCodeFips)?.iso3;
          return [countryCodeIso3, row[`PredictedPopulation.population`]];
        })
      );

      this.loading = false;
    },
  },
});

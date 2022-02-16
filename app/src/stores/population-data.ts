import { defineStore } from "pinia";
import { cubejsApi } from "../api";
import { convertTo3, CountryCode2, CountryCode3 } from "../types/countries";

export const usePopulationDataStore = defineStore("population-data", {
  state: () => ({
    minYear: 1982,
    maxYear: 2050,
    year: 1993,
    loading: false,
    populationMap: {} as Record<CountryCode2, number>,
  }),
  getters: {
    populationMapCountryCode3(state) {
      const { populationMap } = state;
      if (!populationMap) return {};
      return Object.fromEntries(
        Object.entries(populationMap).map(([countryCode, value]) => {
          const countryCode3 = convertTo3(countryCode as CountryCode2);
          return [countryCode3, value];
        })
      );
    },
  },
  actions: {
    async fetch() {
      this.loading = true;

      const cubeData = await cubejsApi.load({
        filters: [],
        dimensions: ["PredictedPopulation.country"],
        measures: ["PredictedPopulation.population"],
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
          return [
            row["PredictedPopulation.country"],
            row[`PredictedPopulation.population`],
          ];
        })
      );

      this.loading = false;
    },
  },
});

import { byFips, byIso } from "country-code-lookup";
import { defineStore } from "pinia";
import { cubejsApi } from "../api";
import { CountryCode3 } from "../types/countries";

type Sex = "Male" | "Female";

export const useDetailedPopulationDataStore = defineStore(
  "detailed-population-data",
  {
    state: () => ({
      year: 1993,
      loading: false,
      sex: "Male" as Sex,
      country: "" as CountryCode3 | undefined,
      populationDetails: [] as [CountryCode3, number][],
    }),
    getters: {},
    actions: {
      async fetch() {
        if (!this.country) return;

        this.loading = true;
        const countryFips = byIso(this.country)?.fips;
        const cubeData = await cubejsApi.load({
          filters: [
            {
              member: "DetailedPopulation.country",
              operator: "equals",
              values: [countryFips!],
            },
          ],
          dimensions: [
            "DetailedPopulation.age",
            "DetailedPopulation.population",
          ],
          measures: [],
          timeDimensions: [
            {
              dimension: "DetailedPopulation.year",
              granularity: "year",
              dateRange: [`${this.year}`, `${this.year}`],
            },
          ],
        });

        this.populationDetails = Object.fromEntries(
          cubeData.tablePivot().map((row) => {
            return [
              row["DetailedPopulation.age"],
              row[`DetailedPopulation.population`],
            ];
          })
        );
        console.table(this.populationDetails);
        this.loading = false;
      },
    },
  }
);

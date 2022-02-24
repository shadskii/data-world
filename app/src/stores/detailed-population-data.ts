import { Query } from "@cubejs-client/core";
import { byFips, byIso } from "country-code-lookup";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { cubejsApi } from "../api";
import { CountryCode3 } from "../types/countries";
import { usePopulationParams } from "./population-params";

type Sex = "Male" | "Female";

export const useDetailedPopulationDataStore = defineStore(
  "detailed-population-data",
  () => {
    const populationParamStore = usePopulationParams();
    const { year, selectedCountry } = storeToRefs(populationParamStore);

    const loading = ref(false);
    const sex = ref<Sex>("Male");
    /**
     * male population for country by age.
     */
    const malePopulation = ref<[number, number][]>([]);
    /**
     * female population for country by age.
     */
    const femalePopulation = ref<[number, number][]>([]);

    const query = computed<Query>(() => {
      if (!selectedCountry.value) return {};

      const countryFips = byIso(selectedCountry.value!)?.fips;
      return {
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
          "DetailedPopulation.sex",
        ],
        timeDimensions: [
          {
            dimension: "DetailedPopulation.year",
            granularity: "year",
            dateRange: [`${year.value}`, `${year.value}`],
          },
        ],
      };
    });
    async function fetchData() {
      loading.value = true;

      malePopulation.value = [];
      femalePopulation.value = [];

      const cubeData = await cubejsApi.load(query.value);
      const data = cubeData
        .tablePivot()
        .map((row) => {
          return {
            age: row["DetailedPopulation.age"] as number,
            pop: row["DetailedPopulation.population"] as number,
            sex: row["DetailedPopulation.sex"] as Sex,
          };
        })
        .sort((a, b) => a.age - b.age);

      malePopulation.value = data
        .filter((d) => {
          return d.sex === "Male";
        })
        .map((row) => [row.age, row.pop]);
      femalePopulation.value = data
        .filter((d) => {
          return d.sex === "Female";
        })
        .map((row) => [row.age, row.pop]);

      loading.value = false;
    }

    watch(query, () => {
      if (selectedCountry.value && year.value) {
        fetchData();
      }
    });

    return {
      loading,
      sex,
      malePopulation,
      femalePopulation,
    };
  }
);

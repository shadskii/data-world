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
    const populationDetails = ref<[CountryCode3, number][]>([]);

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
        dimensions: ["DetailedPopulation.age", "DetailedPopulation.population"],
        measures: [],
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
      const cubeData = await cubejsApi.load(query.value);

      populationDetails.value = cubeData.tablePivot().map((row) => {
        return [
          row["DetailedPopulation.age"] as CountryCode3,
          row[`DetailedPopulation.population`] as number,
        ];
      });
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
      populationDetails,
    };
  }
);

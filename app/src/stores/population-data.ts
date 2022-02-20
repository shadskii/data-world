import { byFips, byIso } from "country-code-lookup";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { cubejsApi } from "../api";
import { CountryCode3 } from "../types/countries";
import { usePopulationParams } from "./population-params";

export const usePopulationDataStore = defineStore("population-data", () => {
  const loading = ref(false);
  const populationMap = ref<Record<CountryCode3, number>>();
  const populationParamStore = usePopulationParams();
  const { year } = storeToRefs(populationParamStore);

  const worldPopulation = computed(() => {
    if (!populationMap.value) return 0;
    return Object.values(populationMap.value).reduce(
      (acc, value) => acc + value,
      0
    );
  });

  async function fetchData() {
    loading.value = true;

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
          dateRange: [`${year.value}`, `${year.value}`],
        },
      ],
    });
    populationMap.value = Object.fromEntries(
      cubeData.tablePivot().map((row) => {
        const countryCodeFips = row["PredictedPopulation.country"] as string;
        const countryCodeIso3 = byFips(countryCodeFips)?.iso3;
        return [countryCodeIso3, row[`PredictedPopulation.population`]];
      })
    );

    loading.value = false;
  }
  watch(year, fetchData, { immediate: true });

  /**
   * Population ranks for each country for the given year.
   */
  const populationRanks = computed(() => {
    if (!populationMap.value) return {} as Record<CountryCode3, number>;
    return Object.fromEntries(
      Object.entries(populationMap.value)
        .sort((a, b) => b[1] - a[1])
        .map(([iso3], index) => {
          return [iso3, index + 1];
        })
    );
  });

  return {
    populationMap,
    loading,
    worldPopulation,
    populationRanks,
  };
});

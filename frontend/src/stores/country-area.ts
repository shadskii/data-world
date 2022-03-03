import { Query } from "@cubejs-client/core";
import { byFips } from "country-code-lookup";
import { defineStore, storeToRefs } from "pinia";
import { computed } from "vue";
import { useCubeQuery } from "../composables/useCube";
import type { TypedQuery } from "../composables/useCube";
import { CountryCode3 } from "../countries/countries";
import { usePopulationParams } from "./population-params";

/**
 * Country area store.
 */
export const useCountryArea = defineStore("country-area", () => {
  const populationParamStore = usePopulationParams();
  const { selectedCountry } = storeToRefs(populationParamStore);

  const query = computed<TypedQuery>(() => {
    return {
      dimensions: ["Areas.area", "Areas.country"],
    };
  });
  const { isLoading, resultSet } = useCubeQuery(query);

  /**
   * the area for each country in square kilometers.
   */
  const areaMap = computed(() => {
    if (!resultSet.value) return {} as Record<CountryCode3, number>;
    return Object.fromEntries(
      resultSet.value.tablePivot().map((row) => {
        const countryCodeFips = row["Areas.country"];
        const countryCodeIso3 = byFips(countryCodeFips)?.iso3 as CountryCode3;
        const area = row["Areas.area"];
        return [countryCodeIso3, area];
      })
    );
  });

  /**
   * the overall rank for each country's area.
   */
  const countryAreaRanks = computed(() => {
    return Object.fromEntries(
      Object.entries(areaMap.value)
        .sort((a, b) => b[1] - a[1])
        .map(([countryCode3], index) => [countryCode3, index + 1])
    );
  });

  /**
   * the area of the selected country in square kilometers.
   */
  const selectedCountryArea = computed(() => {
    if (!areaMap.value || !selectedCountry.value) return 0;

    return areaMap.value[selectedCountry.value] ?? 0;
  });

  return {
    areaMap,
    countryAreaRanks,
    isLoading,
    selectedCountryArea,
  };
});

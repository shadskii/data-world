import { Query } from "@cubejs-client/core";
import { byFips, byIso } from "country-code-lookup";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { cubejsApi } from "../api";
import { useCubeQuery } from "../composables/useCube";
import { CountryCode3 } from "../types/countries";
import { usePopulationParams } from "./population-params";

type Sex = "Male" | "Female";

export const useDetailedPopulationDataStore = defineStore(
  "detailed-population-data",
  () => {
    const populationParamStore = usePopulationParams();
    const { year, selectedCountry } = storeToRefs(populationParamStore);

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
        measures: [],
        dimensions: [
          "DetailedPopulation.age",
          "DetailedPopulation.population",
          "DetailedPopulation.sex",
          "MortalityLifeExpectancy.infantMortality",
          "MortalityLifeExpectancy.lifeExpectancy",
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

    const { isLoading, resultSet, error } = useCubeQuery(query);

    const populationData = computed(() => {
      if (!resultSet.value) return [];

      return resultSet.value
        .tablePivot()
        .map((row) => {
          return {
            age: row["DetailedPopulation.age"] as number,
            pop: row["DetailedPopulation.population"] as number,
            sex: row["DetailedPopulation.sex"] as Sex,
          };
        })
        .sort((a, b) => a.age - b.age);
    });

    /**
     * male population for country by age.
     */
    const malePopulation = computed(() => {
      return populationData.value
        .filter((d) => {
          return d.sex === "Male";
        })
        .map((row) => [row.age, row.pop]);
    });

    /**
     * female population for country by age.
     */
    const femalePopulation = computed(() => {
      return populationData.value
        .filter((d) => {
          return d.sex === "Female";
        })
        .map((row) => [row.age, row.pop]);
    });

    const infantMortality = computed(() => {
      if (!resultSet.value) return -1;

      return resultSet.value.tablePivot().at(0)?.[
        "MortalityLifeExpectancy.infantMortality"
      ]! as number;
    });

    const lifeExpectancy = computed(() => {
      if (!resultSet.value) return -1;

      return resultSet.value.tablePivot().at(0)?.[
        "MortalityLifeExpectancy.lifeExpectancy"
      ]! as number;
    });

    return {
      isLoading,
      malePopulation,
      femalePopulation,
      infantMortality,
      lifeExpectancy,
    };
  }
);

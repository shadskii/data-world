import { Query } from "@cubejs-client/core";
import { byFips } from "country-code-lookup";
import { defineStore, storeToRefs } from "pinia";
import { computed } from "vue";
import { useCubeQuery } from "../composables/useCube";
import { CountryCode3 } from "../countries/countries";
import { usePopulationParams } from "./population-params";

export const usePopulationDataStore = defineStore("population-data", () => {
  const populationParamStore = usePopulationParams();
  const { year } = storeToRefs(populationParamStore);

  const query = computed<Query>(() => {
    return {
      dimensions: [
        "PredictedPopulation.country",
        "PredictedPopulation.totalPopulation",
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
  const { isLoading, resultSet } = useCubeQuery(query);

  const populationMap = computed<Record<CountryCode3, number> | undefined>(
    () => {
      if (!resultSet.value) return {} as Record<CountryCode3, number>;
      return Object.fromEntries(
        resultSet.value.tablePivot().map((row) => {
          const countryCodeFips = row["PredictedPopulation.country"] as string;
          // country-code-lookup uses VM for Vietnam instead of VM
          const countryCodeIso3 =
            countryCodeFips === "VM" ? "VNM" : byFips(countryCodeFips)?.iso3;
          return [countryCodeIso3, row[`PredictedPopulation.totalPopulation`]];
        })
      );
    }
  );

  const { resultSet: lifeExpectancyResultset } = useCubeQuery(
    computed(() => {
      return {
        dimensions: [
          "PredictedPopulation.country",
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
    })
  );
  const lifeExpectancyMap = computed<Record<CountryCode3, number> | undefined>(
    () => {
      if (!lifeExpectancyResultset.value)
        return {} as Record<CountryCode3, number>;
      return Object.fromEntries(
        lifeExpectancyResultset.value.tablePivot().map((row) => {
          const countryCodeFips = row["PredictedPopulation.country"] as string;
          const countryCodeIso3 = byFips(countryCodeFips)?.iso3;
          return [
            countryCodeIso3,
            row[`MortalityLifeExpectancy.lifeExpectancy`],
          ];
        })
      );
    }
  );

  const { resultSet: infantMortalityResultset } = useCubeQuery(
    computed(() => {
      return {
        dimensions: [
          "PredictedPopulation.country",
          "MortalityLifeExpectancy.infantMortality",
        ],
        timeDimensions: [
          {
            dimension: "DetailedPopulation.year",
            granularity: "year",
            dateRange: [`${year.value}`, `${year.value}`],
          },
        ],
      };
    })
  );

  const infantMortalityMap = computed<Record<CountryCode3, number> | undefined>(
    () => {
      if (!infantMortalityResultset.value)
        return {} as Record<CountryCode3, number>;
      return Object.fromEntries(
        infantMortalityResultset.value.tablePivot().map((row) => {
          const countryCodeFips = row["PredictedPopulation.country"] as string;
          const countryCodeIso3 = byFips(countryCodeFips)?.iso3;
          return [
            countryCodeIso3,
            row[`MortalityLifeExpectancy.infantMortality`],
          ];
        })
      );
    }
  );

  const worldPopulation = computed(() => {
    if (!populationMap.value) return 0;
    return Object.values(populationMap.value).reduce(
      (acc, value) => acc + value,
      0
    );
  });

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
    lifeExpectancyMap,
    infantMortalityMap,
    isLoading,
    worldPopulation,
    populationRanks,
  };
});

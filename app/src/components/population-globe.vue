<script setup lang="ts">
import ChloroplethGlobe from "@/components/chloropleth-globe.vue";
import { storeToRefs } from "pinia";
import { usePopulationDataStore } from "../stores/all-population-data";
import { usePopulationParams } from "../stores/population-params";
import InspectionPane from "./inspection-pane.vue";
import YearSelect from "./year-select.vue";
import MultiSelect from "./multi-select.vue";
import { computed } from "vue";
import type { CountryCode3 } from "../types/countries";
import { byFips, byIso } from "country-code-lookup";

const populationDataStore = usePopulationDataStore();
const populationParams = usePopulationParams();
const { selectedCountry, selectedDataView, allDataViews } =
  storeToRefs(populationParams);

const {
  populationMap,
  isLoading,
  worldPopulation,
  lifeExpectancyMap,
  infantMortalityMap,
  populationRanks,
} = storeToRefs(populationDataStore);

const topPopulationCountries = computed(() => {
  if (isLoading.value) return [];
  return Object.entries(populationRanks.value)
    .sort((a, b) => {
      return a[1] - b[1];
    })
    .slice(0, 10)
    .map(([countryCode]) => {
      let country;
      try {
        country = byIso(countryCode);
      } catch (e) {}
      const name = country?.country ?? "Unknown";
      return {
        name,
        code: countryCode,
        population: populationMap.value![countryCode! as CountryCode3],
      };
    });
});

const data = computed(() => {
  if (selectedDataView.value === "Population") {
    return populationMap.value;
  } else if (selectedDataView.value === "Life Expectancy") {
    return lifeExpectancyMap.value;
  } else if (selectedDataView.value === "Infant Mortality") {
    return infantMortalityMap.value;
  }
});
const dataScale = computed(() => {
  if (selectedDataView.value === "Population") {
    return [
      100_000, 1_000_000, 10_000_000, 30_000_000, 100_000_000, 500_000_000,
      1_000_000_000, 2_000_000_000,
    ];
  } else if (selectedDataView.value === "Life Expectancy") {
    return [40, 50, 60, 65, 70, 75, 80, 85, 90];
  } else if (selectedDataView.value === "Infant Mortality") {
    return [0.5, 1, 3, 5, 10, 15, 20, 30];
  }
});
</script>
<template>
  <div class="flex flex-row">
    <InspectionPane :selected-country="selectedCountry!" />
    <div class="map bg-gray-900 relative">
      <div
        class="text-white p-2 absolute top-0 z-10 flex justify-between left-0 right-0"
      >
        <div class="flex flex-col">
          <div>
            <span class="text-2xl">
              {{ worldPopulation.toLocaleString() }}
            </span>
            <span class="font-thin"> total people </span>
          </div>
          <div class="mt-3">
            <ol class="">
              <li
                v-for="(country, index) in topPopulationCountries"
                class="text-sm"
              >
                <span class="mr-2 w-3 inline-block font-thin text-xs">
                  {{ index + 1 }}
                </span>
                <button
                  class="text-left hover:text-base hover:text-blue-300 transition-all ease-in-out"
                  @click="selectedCountry = country.code as CountryCode3"
                >
                  <span class="w-28 inline-block">
                    {{ country.name }}
                  </span>
                </button>
                <span class="font-thin ml-2">
                  {{ country.population.toLocaleString() }}
                </span>
              </li>
            </ol>
          </div>
        </div>
        <div>
          <MultiSelect v-model="selectedDataView" :values="allDataViews" />
        </div>
      </div>
      <div class="absolute z-10 p-2 bottom-0">
        <YearSelect />
      </div>
      <ChloroplethGlobe
        v-if="data"
        v-model="selectedCountry"
        :data="data"
        class="w-full h-full"
        :loading="isLoading"
        :data-scale="dataScale"
      />
    </div>
  </div>
</template>
<style scoped>
.map {
  width: calc(100% - 24rem);
}
</style>

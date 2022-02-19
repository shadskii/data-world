<script setup lang="ts">
import WorldMap from "@/components/world-map.vue";
import { ScalingSquaresSpinner } from "epic-spinners";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useCountryArea } from "../stores/country-area";
import { usePopulationDataStore } from "../stores/population-data";
import { convertTo2, CountryCode3, countryNames } from "../types/countries";
import BaseSelect from "./base-select.vue";

const populationDataStore = usePopulationDataStore();
populationDataStore.fetch();

const years = computed(() => {
  const { minYear, maxYear } = populationDataStore;
  return Array(maxYear - minYear)
    .fill(minYear)
    .map((x, i) => x + i);
});

const { populationMap, year, loading, worldPopulation } =
  storeToRefs(populationDataStore);

watch(year, () => {
  populationDataStore.fetch();
});

const selectedCountry = ref<CountryCode3 | undefined>();
const selectedCountry2 = computed(() => {
  if (!selectedCountry.value) return undefined;
  return convertTo2(selectedCountry.value);
});

const countryAreaStore = useCountryArea();
countryAreaStore.fetch();

const countryArea = computed(() => {
  return countryAreaStore.countryArea(selectedCountry.value!);
});
</script>
<template>
  <div class="flex flex-row">
    <div class="w-96 inline-block bg-gray-900 h-screen text-white">
      <div class="bg-gray-800 p-2 flex flex-row justify-between">
        <h1 class="text-2xl">World Population</h1>
      </div>
      <div class="text-left p-2" v-if="selectedCountry && populationMap">
        <img
          :src="`https://countryflagsapi.com/svg/${selectedCountry}`"
          class="h-48"
        />
        <h2 class="text-4xl mt-2">
          {{ countryNames[selectedCountry] }}
        </h2>
        <h3 class="text-xl mt-3">
          <span>
            {{ populationMap[selectedCountry!]?.toLocaleString() }}
          </span>
          <span class="text-sm"> people </span>
        </h3>
        <div>
          {{ `${countryArea.toLocaleString()} km²` }}
        </div>
      </div>
    </div>
    <div class="map bg-gray-900 relative">
      <div class="absolute top-0 right-0 text-white z-10 p-3" v-if="loading">
        <scaling-squares-spinner
          :animation-duration="1250"
          :size="30"
          color="#fff"
        />
      </div>
      <div class="absolute z-10 p-2">
        <BaseSelect :values="years" v-model="year" />
        <div class="text-white pt-2">
          {{ worldPopulation.toLocaleString() }} total people
        </div>
      </div>
      <WorldMap
        v-if="populationMap"
        v-model="selectedCountry"
        :data="populationMap"
      />
    </div>
  </div>
</template>
<style scoped>
.map {
  width: calc(100% - 24rem);
}
</style>

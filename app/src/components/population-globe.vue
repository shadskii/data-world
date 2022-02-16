<script setup lang="ts">
import WorldMap from "@/components/world-map.vue";
import { storeToRefs } from "pinia";
import { computed, ref, toRefs, watch } from "vue";
import { useCountryArea } from "../api";
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

const { populationMap, populationMapCountryCode3, year } =
  storeToRefs(populationDataStore);

watch(year, () => {
  populationDataStore.fetch();
});

const selectedCountry = ref<CountryCode3 | undefined>();
const selectedCountry2 = computed(() => {
  if (!selectedCountry.value) return undefined;
  return convertTo2(selectedCountry.value);
});
const countryArea = useCountryArea(selectedCountry);
</script>
<template>
  <div class="flex flex-row">
    <div class="w-96 inline-block bg-gray-900 h-screen text-white">
      <div class="bg-gray-800 p-2 flex flex-row justify-between">
        <h1 class="text-2xl">World Population</h1>
        <BaseSelect :values="years" v-model="year" />
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
            {{ populationMap[selectedCountry2!]?.toLocaleString() }}
          </span>
          <span class="text-sm"> people </span>
        </h3>
        <div>
          {{ `${countryArea.toLocaleString()} km²` }}
        </div>
      </div>
    </div>
    <WorldMap
      v-if="populationMapCountryCode3"
      v-model="selectedCountry"
      :data="populationMapCountryCode3"
      class="map bg-gray-900"
    />
  </div>
</template>
<style scoped>
.map {
  width: calc(100% - 24rem);
}
</style>

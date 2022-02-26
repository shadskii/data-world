<script setup lang="ts">
import WorldMap from "@/components/world-map.vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { usePopulationDataStore } from "../stores/all-population-data";
import {
  MAX_YEAR,
  MIN_YEAR,
  usePopulationParams,
} from "../stores/population-params";
import BaseSelect from "./base-select.vue";
import InspectionPane from "./inspection-pane.vue";

const populationDataStore = usePopulationDataStore();

const years = computed(() => {
  return Array(MAX_YEAR - MIN_YEAR + 1)
    .fill(MIN_YEAR)
    .map((x, i) => x + i);
});

const populationParams = usePopulationParams();
const { selectedCountry, year } = storeToRefs(populationParams);

const { populationMap, isLoading, worldPopulation } =
  storeToRefs(populationDataStore);
</script>
<template>
  <div class="flex flex-row">
    <InspectionPane :selected-country="selectedCountry!" />
    <div class="map bg-gray-900 relative">
      <div class="text-white pt-2 absolute top-0 z-10 p-2">
        <span class="text-2xl">
          {{ worldPopulation.toLocaleString() }}
        </span>
        <span class="font-thin"> total people </span>
      </div>
      <div class="absolute z-10 p-2 bottom-0">
        <BaseSelect :values="years" v-model="year" />
      </div>
      <WorldMap
        v-if="populationMap"
        v-model="selectedCountry"
        :data="populationMap"
        class="w-full h-full"
        :loading="isLoading"
      />
    </div>
  </div>
</template>
<style scoped>
.map {
  width: calc(100% - 24rem);
}
</style>

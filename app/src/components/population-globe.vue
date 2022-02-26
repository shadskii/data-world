<script setup lang="ts">
import ChloroplethGlobe from "@/components/chloropleth-globe.vue";
import { storeToRefs } from "pinia";
import { usePopulationDataStore } from "../stores/all-population-data";
import { usePopulationParams } from "../stores/population-params";
import InspectionPane from "./inspection-pane.vue";
import YearSelect from "./year-select.vue";

const populationDataStore = usePopulationDataStore();
const populationParams = usePopulationParams();
const { selectedCountry } = storeToRefs(populationParams);

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
        <YearSelect />
      </div>
      <ChloroplethGlobe
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

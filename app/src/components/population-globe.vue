<script setup lang="ts">
import WorldMap from "@/components/world-map.vue";
import { ScalingSquaresSpinner } from "epic-spinners";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useCountryArea } from "../stores/country-area";
import { usePopulationDataStore } from "../stores/population-data";
import {
  MAX_YEAR,
  MIN_YEAR,
  usePopulationParams,
} from "../stores/population-params";
import BaseSelect from "./base-select.vue";
import InspectionPane from "./inspection-pane.vue";

const populationDataStore = usePopulationDataStore();

const years = computed(() => {
  return Array(MAX_YEAR - MIN_YEAR)
    .fill(MIN_YEAR)
    .map((x, i) => x + i);
});

const populationParams = usePopulationParams();
const { selectedCountry, year } = storeToRefs(populationParams);

const { populationMap, loading, worldPopulation } =
  storeToRefs(populationDataStore);

const countryAreaStore = useCountryArea();
countryAreaStore.fetch();
</script>
<template>
  <div class="flex flex-row">
    <InspectionPane :selected-country="selectedCountry!" />
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
        class="w-full h-full"
      />
    </div>
  </div>
</template>
<style scoped>
.map {
  width: calc(100% - 24rem);
}
</style>

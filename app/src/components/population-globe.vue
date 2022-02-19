<script setup lang="ts">
import WorldMap from "@/components/world-map.vue";
import { ScalingSquaresSpinner } from "epic-spinners";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useCountryArea } from "../stores/country-area";
import { usePopulationDataStore } from "../stores/population-data";
import { CountryCode3 } from "../types/countries";
import BaseSelect from "./base-select.vue";
import InspectionPane from "./inspection-pane.vue";

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

const countryAreaStore = useCountryArea();
countryAreaStore.fetch();
</script>
<template>
  <div class="flex flex-row">
    <InspectionPane :selected-country="selectedCountry" />
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

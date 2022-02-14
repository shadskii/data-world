<script setup lang="ts">
import WorldMap from "@/components/world-map.vue";
import { computed, ref } from "vue";
import { useCountryArea, useYearPopulationData } from "../api";
import type { CountryCode3 } from "../types/countries";
import { countryNames } from "../types/countries";
import BaseSelect from "./base-select.vue";

const years = Array(2008 - 1960)
  .fill(1960)
  .map((x, i) => 1960 + i);

const selectedYear = ref<number>(1993);
const data = useYearPopulationData(selectedYear);
const dataProp = computed(() => {
  return { ...data.value };
});
const selectedCountry = ref<CountryCode3 | undefined>();
const countryArea = useCountryArea(selectedCountry);
</script>
<template>
  <div class="flex flex-row">
    <div class="w-96 inline-block bg-gray-900 h-screen text-white">
      <div class="bg-gray-800 p-2 flex flex-row justify-between">
        <h1 class="text-2xl">World Population</h1>
        <BaseSelect :values="years" v-model="selectedYear" />
      </div>
      <div class="text-left p-2" v-if="selectedCountry && data">
        <img
          :src="`https://countryflagsapi.com/svg/${selectedCountry}`"
          class="h-48"
        />
        <h2 class="text-4xl mt-2">
          {{ countryNames[selectedCountry] }}
        </h2>
        <h3 class="text-xl mt-3">
          <span>
            {{ data[selectedCountry!]?.toLocaleString() }}
          </span>
          <span class="text-sm"> people </span>
        </h3>
        <div>
          {{ `${countryArea.toLocaleString()} km²` }}
        </div>
      </div>
    </div>
    <WorldMap
      v-if="dataProp"
      v-model="selectedCountry"
      :data="dataProp"
      class="map bg-gray-900"
    />
  </div>
</template>
<style scoped>
.map {
  width: calc(100% - 24rem);
}
</style>

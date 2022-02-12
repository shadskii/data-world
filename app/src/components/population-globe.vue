<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { cubejsApi, useYearPopulationData } from "../api";
import { countryNames } from "../types/countries";
import type { CountryCode } from "../types/countries";
import WorldMap from "@/components/world-map.vue";
import BaseSelect from "./base-select.vue";

const years = Array(2008 - 1960)
  .fill(1960)
  .map((x, i) => 1960 + i);

const selectedYear = ref<number>(1993);
const data = useYearPopulationData(selectedYear);
const dataProp = computed(() => {
  return { ...data.value };
});
const selectedCountry = ref<CountryCode | null>(null);
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
      </div>
    </div>
    <WorldMap
      v-if="dataProp"
      :data="dataProp"
      class="map bg-gray-900"
      @selected="(s:CountryCode) => (selectedCountry = s)"
    />
  </div>
</template>
<style scoped>
.map {
  width: calc(100% - 24rem);
}
</style>

<script setup lang="ts">
import WorldMap from "@/components/world-map.vue";
import { computed, ref } from "vue";
import { useCountryArea, useYearPopulationData } from "../api";
import {
  convertTo2,
  convertTo3,
  CountryCode2,
  CountryCode3,
} from "../types/countries";
import { countryNames } from "../types/countries";
import BaseSelect from "./base-select.vue";

const years = Array(2050 - 1982)
  .fill(1982)
  .map((x, i) => x + i);

const selectedYear = ref<number>(1993);
const data = useYearPopulationData(selectedYear);
const dataProp = computed(() => {
  if (!data.value) return {};
  return Object.fromEntries(
    Object.entries(data.value).map(([countryCode, value]) => {
      const countryCode3 = convertTo3(countryCode as CountryCode2);
      return [countryCode3, value];
    })
  );
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
            {{ data[selectedCountry2!]?.toLocaleString() }}
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

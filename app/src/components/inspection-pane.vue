<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, toRefs } from "vue";
import { useCountryArea } from "../stores/country-area";
import { usePopulationDataStore } from "../stores/population-data";
import { CountryCode3, countryNames } from "../types/countries";

const props = defineProps<{
  selectedCountry: CountryCode3 | undefined;
}>();
const { selectedCountry } = toRefs(props);
const populationDataStore = usePopulationDataStore();

const { populationMap, year, loading, worldPopulation } =
  storeToRefs(populationDataStore);
const countryAreaStore = useCountryArea();
countryAreaStore.fetch();

const countryArea = computed(() => {
  return countryAreaStore.countryArea(selectedCountry.value!);
});
</script>
<template>
  <div class="w-96 inline-block bg-gray-900 h-screen text-white">
    <div class="bg-gray-800 p-2 flex flex-row justify-between">
      <h1 class="text-2xl">World Population</h1>
    </div>
    <div class="text-left p-2" v-if="selectedCountry && populationMap">
      <div class="h-48 mb-2">
        <img
          :alt="`${selectedCountry} flag`"
          :src="`https://countryflagsapi.com/svg/${selectedCountry}`"
          class="h-48"
        />
      </div>
      <hr />
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
</template>

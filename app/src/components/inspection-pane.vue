<script setup lang="ts">
import { ScalingSquaresSpinner } from "epic-spinners";
import { storeToRefs } from "pinia";
import { computed, toRefs } from "vue";
import { formatOrdinal } from "../formatting/number-formatting";
import { useCountryArea } from "../stores/country-area";
import { useDetailedPopulationDataStore } from "../stores/detailed-population-data";
import { usePopulationDataStore } from "../stores/population-data";
import { CountryCode3, countryNames } from "../types/countries";

const props = defineProps<{
  selectedCountry: CountryCode3 | undefined;
}>();
const { selectedCountry } = toRefs(props);
const populationDataStore = usePopulationDataStore();

const { populationMap, populationRanks } = storeToRefs(populationDataStore);
const countryAreaStore = useCountryArea();
countryAreaStore.fetch();

const countryArea = computed(() => {
  return countryAreaStore.countryArea(selectedCountry.value!);
});

const detailedPopulationStore = useDetailedPopulationDataStore();
const { populationDetails, loading } = storeToRefs(detailedPopulationStore);
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
      <h2 class="text-2xl mt-2 font-bold">
        {{ countryNames[selectedCountry] }}
      </h2>
      <div>
        {{ `${countryArea.toLocaleString()} km²` }}
      </div>
      <section class="my-2">
        <h2 class="text-lg font-bold">Population</h2>
        <span class="">
          {{ populationMap[selectedCountry!]?.toLocaleString() }}
          <span class="ordinal text-sm pl-1">
            {{ formatOrdinal(populationRanks[selectedCountry!]) }}
          </span>
        </span>
        <div
          class="flex justify-center items-center h-80 rounded-sm border-2 border-slate-700"
        >
          <scaling-squares-spinner
            v-if="loading"
            :animation-duration="1250"
            :size="30"
            color="#fff"
          />
          <column-chart
            v-else
            :data="populationDetails"
            label="population"
            xtitle="Population"
            ytitle="age"
          />
        </div>
      </section>
    </div>
  </div>
</template>

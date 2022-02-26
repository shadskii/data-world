<script setup lang="ts">
import { ScalingSquaresSpinner } from "epic-spinners";
import { storeToRefs } from "pinia";
import { computed, reactive, toRefs } from "vue";
import { formatOrdinal } from "../formatting/number-formatting";
import { useCountryArea } from "../stores/country-area";
import { useDetailedPopulationDataStore } from "../stores/detailed-population-data";
import { usePopulationDataStore } from "../stores/all-population-data";
import { CountryCode3, countryNames } from "../types/countries";
import VueApexCharts from "vue3-apexcharts";
import GenderRatioChart from "./gender-ratio-chart.vue";

const props = defineProps<{
  selectedCountry: CountryCode3 | undefined;
}>();
const { selectedCountry } = toRefs(props);
const populationDataStore = usePopulationDataStore();

const { populationMap, populationRanks } = storeToRefs(populationDataStore);
const countryAreaStore = useCountryArea();
const {
  countryAreaRanks,
  isLoading: countryAreaIsLoading,
  selectedCountryArea,
} = storeToRefs(countryAreaStore);

const detailedPopulationStore = useDetailedPopulationDataStore();
const {
  femalePopulation,
  malePopulation,
  isLoading: detailedPopulationIsLoading,
  infantMortality,
  lifeExpectancy,
  genderRatio,
} = storeToRefs(detailedPopulationStore);

const isLoading = computed(() => {
  return countryAreaIsLoading.value || detailedPopulationIsLoading.value;
});
const series = computed(() => {
  return [
    {
      name: "Male",
      data: malePopulation.value,
      color: "#2da9d8",
    },
    {
      name: "Female",
      data: femalePopulation.value,
      color: "#b73377",
    },
  ];
});

const chartOptions = computed(() => {
  return {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },

    title: {
      text: "Population by age",
      align: "left",
    },

    xaxis: {
      type: "numeric",
      min: 0,
      max: 100,
    },
    yaxis: {
      show: false,
    },
    legend: {
      horizontalAlign: "left",
    },
    theme: {
      mode: "dark",
    },
  };
});
</script>
<template>
  <div
    class="w-96 inline-block bg-gray-900 h-screen text-white overflow-y-auto"
  >
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
        {{ `${selectedCountryArea.toLocaleString()} km²` }}
        <span class="ordinal text-sm pl-1">
          - {{ formatOrdinal(countryAreaRanks[selectedCountry!]) }}
        </span>
      </div>
      <section class="my-2">
        <h2 class="text-lg font-bold">Population</h2>
        <span class="">
          {{ populationMap[selectedCountry!]?.toLocaleString() }}
          <span class="ordinal text-sm pl-1">
            - {{ formatOrdinal(populationRanks[selectedCountry!]) }}
          </span>
        </span>
        <div class="relative h-90 mt-2 border-slate-700 border-2 rounded-md">
          <div
            v-if="isLoading"
            class="absolute top-1/2 left-1/2 bottom-1/2 right-1/2 z-10"
          >
            <scaling-squares-spinner
              :animation-duration="1250"
              :size="30"
              color="#fff"
            />
          </div>
          <VueApexCharts
            type="area"
            height="350"
            :options="chartOptions"
            :series="series"
          ></VueApexCharts>
        </div>
        <div>
          <GenderRatioChart
            v-if="genderRatio"
            :male="genderRatio?.male"
            :female="genderRatio?.female"
          />
        </div>
        <div>
          <span>Infant Mortality</span> -
          <span v-if="!isLoading">
            {{ infantMortality ? `${infantMortality.toFixed(3)}%` : "unknown" }}
          </span>
        </div>
        <div>
          <span>Life Expectancy</span> -
          <span v-if="!isLoading">
            {{ lifeExpectancy ? `${lifeExpectancy.toFixed(2)}` : "unknown" }}
          </span>
        </div>
      </section>
    </div>
  </div>
</template>

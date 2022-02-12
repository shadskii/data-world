<script setup lang="ts">
import { onMounted, ref } from "vue";
import { cubejsApi } from "../api";
import type { CountryCode } from "../types/countries";
import WorldMap from "@/components/world-map.vue";

const data = ref<Record<CountryCode, number>>();
async function loadData() {
  const cubeData = await cubejsApi.load({
    order: {
      "populations.country": "asc",
    },
    filters: [],
    dimensions: ["populations.country", "populations._1960"],
  });

  data.value = Object.fromEntries(
    cubeData.tablePivot().map((row) => {
      return [row["populations.country"], row["populations._1960"]];
    })
  );
}
const selectedCountry = ref<CountryCode | null>(null);
onMounted(() => {
  loadData();
});
</script>
<template>
  <div class="flex flex-row">
    <div class="w-96 inline-block bg-gray-900 h-screen text-white p-2">
      <div class="text-left" v-if="selectedCountry && data">
        <h1 class="text-4xl">
          {{ selectedCountry }}
        </h1>
        <h3 class="text-xl mt-3">
          {{ data[selectedCountry!].toLocaleString() }}
          <span class="text-sm"> people </span>
        </h3>
      </div>
    </div>
    <WorldMap
      v-if="data"
      :data="data"
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

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { cubejsApi } from "../api";
import { CountryCode } from "../types/countries";
import WorldMap from "@/components/world-map.vue";

const chartData = ref<(string | number | boolean)[][]>([]);
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
onMounted(() => {
  loadData();
});
</script>
<template>
  <WorldMap v-if="data" :data="data" />
</template>

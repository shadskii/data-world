<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { cubejsApi } from "../api";

const chartData = ref<(string | number | boolean)[][]>([]);
async function loadData() {
  const data = await cubejsApi.load({
    order: {
      "populations.country": "asc",
    },
    filters: [],
    dimensions: ["populations.country", "populations._1960"],
  });

  chartData.value = data.tablePivot().map((row) => {
    return [row["populations.country"], row["populations._1960"]];
  });
}

onMounted(() => {
  loadData();
});
</script>
<template>
  <div>
    <bar-chart :data="chartData" />
  </div>
</template>

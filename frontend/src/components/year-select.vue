<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePopulationParams } from "../stores/population-params";
import MultiSelect from "./multi-select.vue";

const populationParams = usePopulationParams();
const { year, allYears } = storeToRefs(populationParams);
</script>
<template>
  <MultiSelect :values="allYears" v-model="year" />
</template>

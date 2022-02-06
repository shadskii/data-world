<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([["Jan", 4], ["Feb", 2], ["Mar", 10], ["Apr", 5], ["May", 3], ["Jun", 8], ["Jul", 4]])
</script>
<template>
  <div>
    <line-chart :data="data" />
  </div>
</template>
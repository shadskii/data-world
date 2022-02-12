<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: number;
  values: number[];
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();
const innerValue = computed<number>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<template>
  <select class="bg-gray-600 w-36 p-1" v-model="innerValue">
    <option v-for="number in values" :value="number" :key="number">
      {{ number }}
    </option>
  </select>
</template>

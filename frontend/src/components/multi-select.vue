<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: number | string;
  values: Readonly<number[] | string[]>;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: number | string): void;
}>();
const innerValue = computed<number | string>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<template>
  <div class="flex flex-wrap">
    <button
      v-for="(number, index) in values"
      :value="number"
      :key="number"
      :class="{
        'bg-green-800': number === innerValue,
        'bg-gray-800': number !== innerValue,
      }"
      class="text-white rounded-full border-2 text-xs px-2 py-1 mr-0.5 mb-0.5 border-slate-900"
      @click="innerValue = number"
    >
      {{ number }}
    </button>
  </div>
</template>

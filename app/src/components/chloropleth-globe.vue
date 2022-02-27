<script setup lang="ts">
import { useResizeObserver } from "@vueuse/core";
import { scaleThreshold, schemeBlues } from "d3";
import Globe, { GlobeInstance } from "globe.gl";
import { computed, onMounted, ref, watch } from "vue";
import { CountryCode3 } from "../types/countries";
import { ScalingSquaresSpinner } from "epic-spinners";

const polygonCapColor = "#011e26";
const polygonSideColor = "#013543";
const raised = 0.06;
const lowered = 0.02;
const polygonSideColorHighlight = "#202020";

const props = defineProps<{
  modelValue: CountryCode3 | undefined;
  data: Record<CountryCode3, number>;
  /**
   * Put globe into loading state.
   */
  loading: boolean;
  /**
   * The color scale to use.
   */
  dataScale: number[];
}>();

interface CountryPolygon {
  type: string;
  properties: {
    name: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  id: CountryCode3;
  __id: string;
}

const container = ref<HTMLElement | undefined>();
const emit = defineEmits<{
  (e: "update:modelValue", value: CountryCode3 | undefined): void;
}>();
const selected = computed<CountryCode3 | undefined>({
  get() {
    return props.modelValue;
  },
  set(code) {
    emit("update:modelValue", code);
  },
});

const colorScale = computed(() => {
  return scaleThreshold()
    .domain(props.dataScale)
    .range(schemeBlues[8] as Iterable<number>);
});

const globe = ref<GlobeInstance | undefined>();

onMounted(async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
  );
  const polygons = await response.json();
  globe.value = Globe();
  globe
    .value(container.value!)
    .showGraticules(true)
    .polygonsData(polygons.features)
    .polygonStrokeColor(() => "#000")
    .polygonSideColor((c) => {
      const country = c as CountryPolygon;
      return country.id === selected.value
        ? polygonSideColorHighlight
        : polygonSideColor;
    })
    .width(container.value!.clientWidth)
    .height(container.value!.clientHeight)
    .polygonCapColor((c) => {
      const country = c as CountryPolygon;
      return `${colorScale.value(props.data[country.id])}`;
    })
    .polygonAltitude(() => 0.02)
    .onPolygonClick((c) => {
      const country = c as CountryPolygon;
      selected.value = country.id;
    })
    .onPolygonHover((_hoverCountry) => {
      const hoverCountry = _hoverCountry as CountryPolygon;
      globe
        .value!.polygonAltitude((c) => {
          const country = c as CountryPolygon;
          return country === hoverCountry || country.id === selected.value
            ? raised
            : lowered;
        })
        .polygonLabel((c) => {
          const country = c as CountryPolygon;
          if (country.id !== hoverCountry.id) {
            return "";
          }
          const pop = props.data?.[country.id]?.toLocaleString() ?? "Unknown";
          return `
            <div class="bg-slate-900 p-3 rounded-md">
              <h3>${country.properties.name} (${country.id})</h3>
              <p>${pop}</p>
            </div>
          `;
        });
    })
    .polygonsTransitionDuration(200);
});

useResizeObserver(container, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;
  if (globe.value) {
    globe.value.width(width).height(height);
  }
});

watch(
  props,
  (d) => {
    globe.value?.polygonCapColor((c) => {
      const country = c as CountryPolygon;
      return `${colorScale.value(d.data[country.id]) || "#aaa"}`;
    });
  },
  { deep: true }
);
watch(selected, (code) => {
  globe.value
    ?.polygonStrokeColor((c) => {
      const country = c as CountryPolygon;
      return country.id === code ? "#fff" : "#000";
    })
    .polygonAltitude((c) => {
      const country = c as CountryPolygon;
      return country.id === code ? raised : lowered;
    })
    .polygonSideColor((c) => {
      const country = c as CountryPolygon;
      return country.id === code ? polygonSideColorHighlight : polygonSideColor;
    })
    .pathStroke((c) => {
      const country = c as CountryPolygon;
      return country.id === code ? 1 : 15;
    });
});
</script>
<template>
  <div class="relative">
    <div ref="container" class="h-screen w-full"></div>
    <div
      v-if="loading"
      class="absolute top-0 bottom-0 right-0 left-0 flex flex-row justify-center items-center pointer-events-none"
    >
      <scaling-squares-spinner
        :animation-duration="1250"
        :size="30"
        color="#fff"
      />
    </div>
  </div>
</template>

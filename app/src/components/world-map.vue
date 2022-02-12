<script setup lang="ts">
import * as d3 from "d3";
import { computed, onMounted, ref } from "vue";
import Globe from "globe.gl";
import { CountryCode } from "../types/countries";
const polygonCapColor = "#011e26";
const polygonSideColor = "#013543";
const props = defineProps<{
  data: Record<CountryCode, number>;
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
  id: CountryCode;
  __id: string;
}

const container = ref<HTMLElement | undefined>();
const emit = defineEmits<{
  (e: "selected", value: CountryCode): void;
}>();

const colorScale = d3
  .scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeBlues[7] as Iterable<number>);
onMounted(async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
  );
  const polygons = await response.json();
  const myGlobe = Globe();
  console.log(container.value?.clientHeight, container.value?.clientWidth);
  myGlobe(container.value!)
    .polygonsData(polygons.features)
    .polygonStrokeColor(() => "#000")
    .polygonSideColor(() => polygonSideColor)
    .width(container.value!.clientWidth)
    .height(container.value!.clientHeight)
    .polygonCapColor((c) => {
      const country = c as CountryPolygon;
      return `${colorScale(props.data[country.id])}`;
    })
    .polygonAltitude(() => 0.02)
    .onPolygonClick((c) => {
      const country = c as CountryPolygon;
      emit("selected", country?.id);
    })
    .onPolygonHover((_hoverCountry) => {
      const hoverCountry = _hoverCountry as CountryPolygon;
      myGlobe
        .polygonAltitude((country) => {
          return country === hoverCountry ? 0.06 : 0.02;
        })
        .polygonLabel((c) => {
          const country = c as CountryPolygon;
          return country === hoverCountry ? country.properties.name : "";
        });
    })
    .polygonsTransitionDuration(200);
});
</script>
<template>
  <div ref="container"></div>
</template>

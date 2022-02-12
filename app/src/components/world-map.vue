<script setup lang="ts">
import * as d3 from "d3";
import { computed, onMounted, ref } from "vue";
import Globe from "globe.gl";
const polygonCapColor = "#011e26";
const polygonSideColor = "#013543";

const container = ref<HTMLElement | undefined>();
defineEmits();
const colorScale = d3
  .scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeBlues[7]);
onMounted(async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
  );
  const polygons = await response.json();
  const myGlobe = Globe();
  myGlobe(container.value!)
    .polygonsData(polygons.features)
    .polygonStrokeColor(() => "#000")
    .polygonSideColor(() => polygonSideColor)
    .polygonCapColor(() => polygonCapColor)
    .polygonAltitude(() => 0.02)
    .onPolygonHover((hoverCountry) => {
      myGlobe
        .polygonAltitude((country) => {
          return country === hoverCountry ? 0.06 : 0.02;
        })
        .polygonCapColor((country) => {
          return country === hoverCountry ? "#022a35" : polygonCapColor;
        })
        .polygonLabel((country) => {
          return country === hoverCountry ? country.properties.name : "";
        });
    })
    .polygonsTransitionDuration(200);

  // .globeImageUrl(myImageUrl)

  // .pointsData(myData);
});
</script>
<template>
  <div ref="container"></div>
</template>

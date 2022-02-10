<script lang="ts" setup>
import * as d3 from "d3";
import { computed, onMounted, ref } from "vue";
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
const svgRef = ref<SVGSVGElement | null>(null);
const selectedCountry = ref<string | null>(null);
const data = new Map<string, number>();
const selectedCountryData = computed(() => {
  if (!selectedCountry.value) return null;
  return data.get(selectedCountry.value);
});

onMounted(async () => {
  await loadData();
  chartData.value.forEach((row) => {
    data.set(`${row[0]}`, +row[1]);
  });

  // The svg
  const svg = d3.select(svgRef.value);
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  // Map and projection
  const path = d3.geoPath();
  const projection = d3
    .geoMercator()
    .scale(100)
    // .center([0, 20])
    .translate([width / 2, height / 2]);

  // Data and color scale
  const colorScale = d3
    .scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(d3.schemeBlues[7]);

  // Load external data and boot
  Promise.all([
    d3.json(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    ),
  ]).then((loadData) => {
    let topo = loadData[0];

    let mouseOver = function (this: SVGElement) {
      d3.selectAll(".Country").transition().duration(200).style("opacity", 0.5);
      d3.select(this)
        .transition()
        .duration(200)
        .style("opacity", 1)
        .style("stroke", "black");
      selectedCountry.value = this.getAttribute("data-country-id");
    };

    let mouseLeave = function (this: SVGElement) {
      d3.selectAll(".Country").transition().duration(200).style("opacity", 0.8);
      d3.select(this).transition().duration(200).style("stroke", "transparent");
    };

    // Draw the map
    svg
      .append("g")
      .selectAll("path")
      .data(topo.features)
      .enter()
      .append("path")
      // draw each country
      .attr("d", d3.geoPath().projection(projection))
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      })
      .attr("data-country-id", function (d) {
        return d.id;
      })
      .style("stroke", "transparent")
      .attr("class", () => {
        return "Country";
      })
      .on("mouseover", mouseOver)
      .on("mouseleave", mouseLeave);
  });
});
</script>
<template>
  <div>
    <svg ref="svgRef" width="800" height="600"></svg>
    {{ selectedCountry }} - {{ selectedCountryData?.toLocaleString() }}
  </div>
</template>

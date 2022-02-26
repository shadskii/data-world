<script setup lang="ts">
import { computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
const props = defineProps<{
  male: number;
  female: number;
}>();

const series = computed(() => {
  return [
    {
      name: "Male",
      data: [props.male],
      color: "#2da9d8",
    },
    {
      name: "Female",
      data: [props.female],
      color: "#b73377",
    },
  ];
});

const chartOptions = computed(() => {
  return {
    chart: {
      type: "bar",
      stacked: true,
      height: 350,
      stackType: "100%",
      background: "transparent",
      toolbar: {
        show: false,
      },
      offsetX: 0,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "100%",
        columnWidht: "100%",
      },
    },
    dataLabels: {
      style: {
        fontSize: "20px",
      },
      formatter: function (val: number, opt: { seriesIndex: number }) {
        const percent = `${val.toFixed(2)}%`;
        const gender = opt.seriesIndex === 0 ? "♂" : "♀";

        return `${gender} ${percent}`;
      },
    },
    title: {
      text: "Gender Ratio",
      align: "left",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        formatter: function (val: number, opt: { seriesIndex: number }) {
          return opt.seriesIndex === 0 ? "Male" : "Female";
        },
      },
      y: {
        formatter: function (val: number) {
          return val.toFixed(2) + "%";
        },
      },
    },
    yaxis: {
      show: false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    xaxis: {
      show: false,
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    theme: {
      mode: "dark",
    },
  };
});
</script>
<template>
  <VueApexCharts
    type="bar"
    height="120"
    :options="chartOptions"
    :series="series"
  ></VueApexCharts>
</template>

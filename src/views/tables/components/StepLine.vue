<script setup lang="ts">
import { ref } from "vue"
import VueApexCharts from "vue3-apexcharts"

const series = ref([
  {
    name: "风速",
    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
  },
  {
    name: "风量",
    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
  },
  {
    name: "风向",
    data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
  },
  {
    name: "风力",
    data: [37, 67, 34, 13, 25, 68, 42, 27, 32, 86, 65, 37],
  },
  {
    name: "风压",
    data: [57, 17, 24, 89, 35, 48, 32, 67, 12, 36, 75, 27],
  },
])
const options = {
  chart: {
    height: 370,
    type: "line",
    zoom: {
      enabled: true,
    },

    dropShadow: {
      enabled: true,
      opacity: 0.1,
      blur: 5,
      left: -10,
      top: 10,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#1273eb", "#519515", "#63a9ff", "#daa81c", "#ec4f3d"],
  stroke: {
    width: [3, 3, 3, 3, 3],
    curve: "straight",
    dashArray: [0, 8, 0, 8, 0],
  },

  title: {
    text: "风速评分",
    align: "left",
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6,
    },
  },
  xaxis: {
    categories: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ],
  },
  tooltip: {
    y: [
      {
        title: {
          formatter: function (val: string) {
            return val + " (m/s)"
          },
        },
      },
      {
        title: {
          formatter: function (val: string) {
            return val + " (cmm)"
          },
        },
      },
      {
        title: {
          formatter: function (val: string) {
            return val
          },
        },
      },
    ],
  },
  grid: {
    borderColor: "#e0e6ed",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
}
</script>

<template>
  <VueApexCharts
    :options="options"
    height="400"
    width="100%"
    type="line"
    :series="series"
  />
</template>

<style scoped lang="less"></style>

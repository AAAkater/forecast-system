<script setup lang="ts">
import { ref } from "vue"
import VueApexCharts from "vue3-apexcharts"
// 数据部分
const series = ref([
  {
    name: "box",
    type: "boxPlot",
    data: [
      {
        x: new Date("2017-01-01").getTime(),
        y: [54, 66, 69, 75, 88],
      },
      {
        x: new Date("2018-01-01").getTime(),
        y: [43, 65, 69, 76, 81],
      },
      {
        x: new Date("2019-01-01").getTime(),
        y: [31, 39, 45, 51, 59],
      },
      {
        x: new Date("2020-01-01").getTime(),
        y: [39, 46, 55, 65, 71],
      },
      {
        x: new Date("2021-01-01").getTime(),
        y: [29, 31, 35, 39, 44],
      },
    ],
  },
  {
    name: "outliers",
    type: "scatter",
    data: [
      {
        x: new Date("2017-01-01").getTime(),
        y: 32,
      },
      {
        x: new Date("2018-01-01").getTime(),
        y: 25,
      },
      {
        x: new Date("2019-01-01").getTime(),
        y: 64,
      },
      {
        x: new Date("2020-01-01").getTime(),
        y: 27,
      },
      {
        x: new Date("2020-01-01").getTime(),
        y: 78,
      },
      {
        x: new Date("2021-01-01").getTime(),
        y: 15,
      },
    ],
  },
])

// 图像选项
const options = ref({
  chart: {
    type: "boxPlot",
    height: 350,
  },
  colors: ["#008FFB", "#FEB019"],
  title: {
    text: "各个误差值的箱需图",
    align: "left",
    style: {
      color: "#fff",
    },
  },
  xaxis: {
    type: "datetime",
    tooltip: {
      formatter: function (val: string) {
        return new Date(val).getFullYear()
      },
    },
    labels: {
      show: true,
      style: {
        colors: "white",
      },
    },
  },
  yaxis: {
    labels: {
      show: true,
      style: {
        colors: "white",
      },
    },
  },
  tooltip: {
    shared: false,
    intersect: true,
    theme: "dark",
  },
  legend: {
    labels: {
      colors: ["#fff", "#fff"],
    },
  },
})
</script>

<template>
  <VueApexCharts
    :options="options"
    height="400"
    width="100%"
    type="boxPlot"
    :series="series"
  />
</template>

<style lang="less" scoped></style>

<script setup lang="ts">
import { ref } from "vue"
import BoxPlot from "./BoxPlot.vue"
// import Options from "./components/Options.vue"
import Scatter from "./Scatter.vue"
import SelectTime from "./SelectTime.vue"
import StepLine from "./StepLine.vue"
const tables = ref([
  {
    title: "均方根误差 - 风速评分",
    component: Scatter,
  },
  {
    title: "均方根误差 - 风速评分",
    component: BoxPlot,
  },
  {
    title: "均方根误差 - 风速评分",
    component: StepLine,
  },
])
</script>

<template>
  <div class="mt-72 bg-transparent">
    <div class="h-12">监测评估 - 大运会赛区 - 风速评分</div>
    <div>
      <!-- 时间选择 -->
      <div
        class="my-5 flex h-40 w-full items-center justify-center rounded-lg bg-[#142850] bg-opacity-75 p-2"
      >
        <SelectTime />
      </div>
      <!-- 表格 -->
      <div
        v-for="(table, index) of tables"
        :key="index"
        class="my-4 w-full rounded-xl bg-[#142850] bg-opacity-75"
      >
        <div class="flex h-16 w-full items-center text-lg">
          <div
            class="h-10 w-4/5 bg-[url('@/assets/table_title_bg.png')] bg-cover bg-no-repeat"
          >
            {{ table.title }}
          </div>
        </div>
        <div class="h-auto w-full p-12">
          <div class="rounded-xl bg-[#142850] bg-opacity-75 p-5">
            <component :is="table.component" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>

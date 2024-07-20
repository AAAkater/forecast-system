<script setup lang="ts">
import { ref } from "vue"
import BoxPlot from "./components/BoxPlot.vue"
import Options from "./components/Options.vue"
import Scatter from "./components/Scatter.vue"
import SelectTime from "./components/SelectTime.vue"
import StepLine from "./components/StepLine.vue"
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
  <main class="flex h-full w-[90%] text-white">
    <div class="h-full w-[70%] overflow-auto p-5 scrollbar-hide">
      <div class="h-72 w-full" />
      <div class="bg-transparent">
        <div class="h-12">监测评估 - 大运会赛区 - 风速评分</div>
        <div class="rounded-lg bg-blue-500/[0.2]">
          <!-- 时间选择 -->
          <div class="my-5 flex h-16 w-full justify-center p-2">
            <SelectTime />
          </div>
          <!-- 表格 -->
          <div
            v-for="(table, index) of tables"
            :key="index"
            class="w-full"
          >
            <div class="flex h-16 w-full justify-center">
              {{ table.title }}
            </div>
            <div class="h-auto w-full p-12">
              <component :is="table.component" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-[30%] items-center justify-center p-6">
      <Options />
    </div>
  </main>
</template>

<style scoped lang="less"></style>

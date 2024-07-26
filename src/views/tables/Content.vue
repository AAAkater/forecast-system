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
    </div>
    <div class="flex w-[30%] items-center justify-center p-6">
      <Options />
    </div>
  </main>
</template>

<style scoped lang="less"></style>

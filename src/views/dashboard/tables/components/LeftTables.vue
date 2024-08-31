<script setup lang="ts">
import { ref } from "vue"
import BoxPlot from "./src/BoxPlot.vue"
// import Options from "./components/Options.vue"
import Scatter from "./src/ScatterLine.vue"
import SelectTime from "./src/SelectTime.vue"
import StepLine from "./src/StepLine.vue"
const tables = ref([
  {
    title: "均方根误差 - 风速评分",
    component: Scatter,
  },
  {
    title: "均方根误差 - 风速评分",
    component: StepLine,
  },
  {
    title: "均方根误差 - 风速评分",
    component: BoxPlot,
  },
])
</script>

<template>
  <div class="mt-64 bg-transparent">
    <div class="flex h-auto w-full items-center justify-center">
      <div
        class="h-full w-[500px] rounded-2xl border-4 border-blue-400/60 text-center font-sans text-2xl"
      >
        监测评估 - 大运会赛区 - 风速评分
      </div>
    </div>
    <div>
      <!-- 时间选择 -->
      <div
        :class="[
          'my-4 flex w-full items-center justify-center rounded-xl p-4',
          `bg-[url('@/assets/panel.png')] bg-[length:100%_100%] bg-no-repeat`,
        ]"
      >
        <SelectTime />
      </div>
      <!-- 表格 -->
      <div
        v-for="(table, index) of tables"
        :key="index"
        :class="[
          'my-4 w-full rounded-xl',
          `bg-[url('@/assets/panel.png')] bg-[length:100%_100%] bg-no-repeat`,
        ]"
      >
        <div
          :class="[
            'mt-8 h-10 w-full pl-10 pt-2 font-sans text-lg',
            `bg-[url('@/assets/card_bg.png')] bg-left bg-no-repeat`,
          ]"
        >
          {{ table.title }}
        </div>
        <div class="h-auto w-full p-12">
          <component
            :is="table.component"
            class="rounded-xl bg-blue-700/20 p-5"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>

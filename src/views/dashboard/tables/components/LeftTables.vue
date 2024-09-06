<script setup lang="ts">
import { markRaw, ref } from "vue"
import BoxPlot from "./src/BoxPlot.vue"
import ScatterLine from "./src/ScatterLine.vue"
import SelectTime from "./src/SelectTime.vue"
import StepLine from "./src/StepLine.vue"
const tables = ref([
  {
    title: "均方根误差 - 风速评分",
    component: markRaw(ScatterLine),
  },
  {
    title: "均方根误差 - 风速评分",
    component: markRaw(StepLine),
  },
  {
    title: "均方根误差 - 风速评分",
    component: markRaw(BoxPlot),
  },
])
</script>

<template>
  <div :class="['w-full bg-transparent', 'mt-40']">
    <!-- 标题 -->
    <div
      :class="[
        'mx-auto w-[500px] rounded-2xl border-4 border-blue-400/60',
        'text-center font-sans text-2xl text-white',
      ]"
    >
      监测评估 - 大运会赛区 - 风速评分
    </div>
    <!-- 时间 -->
    <div
      :class="[
        'mx-auto my-4 w-[700px] rounded-xl p-4',
        `bg-[url('@/assets/panel.png')] bg-[length:100%_100%] bg-no-repeat`,
        'flex items-center justify-center',
      ]"
    >
      <SelectTime />
    </div>
    <!-- 表格 -->
    <ul :class="['list-none', 'grid grid-cols-[1fr_1fr] gap-x-4 gap-y-4']">
      <li
        v-for="(table, index) of tables"
        :key="index"
        :class="[
          `bg-[url('@/assets/panel.png')] bg-[length:100%_100%] bg-no-repeat`,
        ]"
      >
        <div
          :class="[
            'mt-2 h-10 w-full pl-10 pt-2',
            `bg-[url('@/assets/card_bg.png')] bg-left bg-no-repeat`,
            'font-sans text-lg text-white',
          ]"
        >
          {{ table.title }}
        </div>
        <div class="h-auto w-full p-5">
          <component
            :is="table.component"
            class="rounded-xl bg-blue-700/20 p-2"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped></style>

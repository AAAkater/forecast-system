<script setup lang="ts">
import { ExpandAltOutlined } from "@ant-design/icons-vue"
import { Button, Modal } from "ant-design-vue"
import { h, markRaw, ref } from "vue"
import BoxPlot from "./src/BoxPlot.vue"
import ScatterLine from "./src/ScatterLine.vue"
import SelectTime from "./src/SelectTime.vue"
import StepLine from "./src/StepLine.vue"
const isOpen = ref(false)
const currentTable = ref({
  title: "",
  table: markRaw(BoxPlot),
})
const showTable = (newTitle: string) => {
  isOpen.value = true
  currentTable.value.title = newTitle
}

const handleOk = (e: MouseEvent) => {
  console.log(e)
  isOpen.value = false
}

const tables = ref([
  {
    title: "均方根误差 - 风速评分",
    component: markRaw(ScatterLine),
    click: () => {
      console.log("1")
      showTable("时效温度散点回归图")
    },
  },
  {
    title: "均方根误差 - 风速评分",
    component: markRaw(BoxPlot),
    click: () => {
      console.log("3")
      showTable("各个误差值的箱需图")
    },
  },
  {
    title: "均方根误差 - 风速评分",
    component: markRaw(StepLine),
    click: () => {
      console.log("2")
      showTable("风速评分")
    },
  },
])
</script>

<template>
  <div :class="['w-full bg-transparent', 'mt-36']">
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
    <ul
      :class="[
        'list-none',
        'grid grid-cols-2 gap-y-5',
        `bg-[url('@/assets/panel.png')] bg-[length:100%_100%] bg-no-repeat`,
      ]"
    >
      <li
        v-for="(table, index) of tables"
        :key="index"
        class="last:col-span-2"
      >
        <!-- 表格名 -->
        <div
          :class="[
            'mt-2 h-10 w-full px-5',
            `bg-[url('@/assets/card_bg.png')] bg-left bg-no-repeat`,
            'flex items-center justify-between',
          ]"
        >
          <div class="font-sans text-lg text-white">
            {{ table.title }}
          </div>
          <Button
            ghost
            size="large"
            shape="circle"
            :icon="h(ExpandAltOutlined)"
            @click="table.click"
          />
        </div>
        <!-- 表格本体 -->
        <div class="h-auto w-full p-4">
          <component
            :is="table.component"
            class="rounded-xl bg-blue-700/20"
          />
        </div>
      </li>
    </ul>

    <Modal
      v-model:open="isOpen"
      :title="currentTable.title"
      centered
      @ok="handleOk"
      width="2000px"
    >
      <BoxPlot tableHeight="800" />
    </Modal>
  </div>
</template>

<style lang="less" scoped></style>

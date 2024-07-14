<script setup lang="ts">
import { DownloadOutlined } from "@ant-design/icons-vue"
import { ref } from "vue"

const items = ref([
  {
    name: "风",
    icon: "wind",
  },
  {
    name: "温度",
    icon: "temperature",
  },
  {
    name: "降水",
    icon: "rain",
  },
  {
    name: "能见度",
    icon: "visibility",
  },
  {
    name: "湿度",
    icon: "humidity",
  },
])

const wind_value = ref("")
const wind_items = ref([
  {
    name: "1小时平均风",
  },
  {
    name: "1小时阵风",
  },
  {
    name: "3小时阵风",
  },
])

const test_value = ref("")
const test_items = ref([
  { name: "均方根误差" },
  { name: "平均绝对误差" },
  { name: "平均误差" },
  { name: "风速准确率" },
  { name: "风速评分" },
  { name: "风速偏强率" },
  { name: "风速散点回归" },
  { name: "空间分布图" },
])
</script>

<template>
  <div>
    <a-space-compact block>
      <a-button
        type="primary"
        class="flex"
        v-for="(item, index) of items"
      >
        <SvgIcon :name="item.icon" class="h-full w-10" />
        {{ item.name }}
      </a-button>
    </a-space-compact>

    <a-radio-group
      button-style="solid"
      v-model:value="wind_value"
    >
      <a-radio-button
        v-for="(item, index) of wind_items"
        :value="index"
        >{{ item.name }}</a-radio-button
      >
    </a-radio-group>
    <a-radio-group
      button-style="solid"
      v-model:value="test_value"
    >
      <a-radio-button
        v-for="(item, index) of test_items"
        :value="index"
        >{{ item.name }}</a-radio-button
      >
    </a-radio-group>
  </div>
</template>

<style scoped lang="less"></style>

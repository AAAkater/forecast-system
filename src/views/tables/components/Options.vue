<script setup lang="ts">
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
const activeKey = ref(0)

const checkbox_value = ref([])
</script>

<template>
  <a-tabs
    v-model:activeKey="activeKey"
    size="large"
    class="h-80 w-full bg-white"
    centered
    type="card"
  >
    <a-tab-pane
      v-for="(item, index) of items"
      :key="index"
    >
      <template #tab>
        <span>
          <SvgIcon
            :name="item.icon"
            class="h-12 w-12"
          />
          <div class="flex w-full justify-center">
            {{ item.name }}
          </div>
        </span>
      </template>

      <a-checkbox-group
        v-model:value="checkbox_value"
        style="width: 100%"
      >
        <a-row>
          <a-col
            :span="12"
            v-for="(item, index) of wind_items"
            :key="index"
          >
            <a-checkbox :value="item.name">
              {{ item.name }}
            </a-checkbox>
          </a-col>
          <a-col :span="24">
            <h5>检验方法</h5>
          </a-col>
          <a-col
            :span="12"
            v-for="(item, index) of test_items"
            :key="index"
          >
            <a-checkbox :value="item.name">
              {{ item.name }}
            </a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped lang="less"></style>

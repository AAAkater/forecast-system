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
  [{ name: "均方根误差" }, { name: "平均绝对误差" }],
  [{ name: "平均误差" }, { name: "风速准确率" }],
  [{ name: "风速评分" }, { name: "风速偏强率" }],
  [{ name: "风速散点回归" }, { name: "空间分布图" }],
])
const activeKey = ref(0)

const test_value = ref([])
const wind_value = ref([])
</script>

<template>
  <a-tabs
    v-model:activeKey="activeKey"
    class="w-full rounded-2xl bg-white"
    centered
    type="card"
  >
    <a-tab-pane
      v-for="(item, index) of items"
      :key="index"
    >
      <!-- tabs -->
      <template #tab>
        <span>
          <SvgIcon
            :name="item.icon"
            class="h-10 w-10"
          />
          <div class="flex w-full justify-center">
            {{ item.name }}
          </div>
        </span>
      </template>
      <!-- 选项 -->
      <a-radio-group
        v-model:value="wind_value"
        class="flex w-full justify-center"
        size="large"
      >
        <a-radio-button
          v-for="(item, index) of wind_items"
          :value="item.name"
        >
          {{ item.name }}
        </a-radio-button>
      </a-radio-group>
      <div class="my-10 flex w-full justify-center">检验方法</div>

      <a-radio-group
        v-model:value="test_value"
        class="my-5 flex w-full justify-center"
        size="large"
        v-for="(item, index) of test_items"
        :key="index"
      >
        <a-radio-button
          class="w-32 text-center"
          :value="item[0].name"
        >
          {{ item[0].name }}
        </a-radio-button>
        <a-radio-button
          class="w-32 text-center"
          :value="item[1].name"
        >
          {{ item[1].name }}
        </a-radio-button>
      </a-radio-group>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped lang="less"></style>

<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupOption,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/vue"
import { ref, watch } from "vue"

const tabs = ref([
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
  {
    name: "凑数的阵风",
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

const wind_value = ref("")
const test_value = ref("")

watch(wind_value, () => {
  console.log(wind_value.value)
})

watch(test_value, () => {
  console.log(test_value.value)
})
</script>

<template>
  <div class="w-full max-w-md px-2 py-16 sm:px-0">
    <TabGroup :default-index="1">
      <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab
          v-for="(tab, idx) of tabs"
          as="template"
          :key="idx"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'flex w-full justify-center rounded-lg py-2.5 text-sm font-medium leading-5',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white text-blue-700 shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            <SvgIcon
              :name="tab.icon"
              class="mr-3 h-5 w-5"
            />
            {{ tab.name }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          v-for="(tab, idx) of tabs"
          :key="idx"
          :class="[
            'rounded-xl bg-white p-3',
            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]"
        >
          <!-- 风选项按钮组 -->
          <RadioGroup
            v-model="wind_value"
            class="flex outline outline-black"
          >
            <!-- <RadioGroupLabel>wind</RadioGroupLabel> -->

            <RadioGroupOption
              v-for="(item, idx) of wind_items"
              :key="idx"
              :value="item.name"
              as="template"
              v-slot="{ active, checked }"
            >
              <button
                :class="[
                  active ? 'bg-blue-500 text-white' : 'bg-white text-black',
                  'mx-3 outline outline-blue-700',
                ]"
                v-show="item.name !== '凑数的阵风'"
              >
                <!-- <CheckIcon v-show="checked" /> -->
                {{ item.name }}
              </button>
            </RadioGroupOption>
          </RadioGroup>
          <!-- 测试方法按钮组 -->
          <RadioGroup
            v-model="test_value"
            class="outline"
          >
            <!-- <RadioGroupLabel>test</RadioGroupLabel> -->
            <RadioGroupOption
              v-for="(item, idx) of test_items"
              :key="idx"
              :value="item.name"
              as="template"
              v-slot="{ active, checked }"
            >
              <button
                :class="[
                  active ? 'bg-blue-500 text-white' : 'bg-white text-black',
                  'mx-3',
                ]"
              >
                <!-- <CheckIcon v-show="checked" /> -->
                {{ item.name }}
              </button>
            </RadioGroupOption>
          </RadioGroup>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<style scoped lang="less"></style>

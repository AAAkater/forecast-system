<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupLabel,
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
])

const test_items = ref([
  { name: "均方根误差" },
  { name: "平均绝对误差" },
  { name: "平均误差" },
  { name: "风速准确率" },
  { name: "风速评分" },
  { name: "风速偏强率" },
  { name: "风速偏弱率" },
  { name: "风速散点回归" },
  { name: "空间分布图" },
])

const wind_value = ref("1小时平均风")
const test_value = ref("均方根误差")

watch(wind_value, () => {
  console.log(wind_value.value)
})

watch(test_value, () => {
  console.log(test_value.value)
})
</script>

<template>
  <div class="w-full 2xl:max-w-md">
    <TabGroup :default-index="1">
      <TabList class="BG flex space-x-1 rounded-xl p-1">
        <Tab
          v-for="(tab, idx) of tabs"
          as="template"
          :key="idx"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'flex w-full justify-center text-nowrap rounded-lg py-2.5 text-sm font-medium leading-5',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white text-blue-700 shadow'
                : 'text-black hover:bg-red-600/20 hover:text-white',
            ]"
          >
            <SvgIcon
              :name="tab.icon"
              class="mr-2 h-5 w-5"
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
            'rounded-xl p-4',
            `bg-[url('@/assets/panel.png')] bg-[length:100%_100%] bg-no-repeat`,
          ]"
        >
          <!-- 风选项按钮组 -->
          <RadioGroup
            v-model="wind_value"
            class="grid grid-cols-[1fr_1fr] gap-x-4 gap-y-2"
          >
            <RadioGroupLabel class="sr-only">wind</RadioGroupLabel>
            <RadioGroupOption
              v-for="(item, idx) of wind_items"
              :key="idx"
              :value="item.name"
              as="template"
              v-slot="{ active, checked }"
            >
              <button
                :class="[
                  'flex w-full justify-center rounded-lg py-2.5 text-lg font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  checked
                    ? 'bg-white text-blue-700 shadow'
                    : 'bg-blue-400/20 text-blue-100',
                  active ? 'hover:bg-blue-500 hover:text-white' : '',
                ]"
              >
                <!-- <CheckIcon v-show="checked" /> -->
                {{ item.name }}
              </button>
            </RadioGroupOption>
          </RadioGroup>
          <!-- 测试方法按钮组 -->
          <div
            :class="[
              'my-5 h-8 w-full pl-10 font-sans text-xl text-white',
              `bg-[url('@/assets/card_bg.png')] bg-cover bg-left bg-no-repeat`,
            ]"
          >
            测试方法
          </div>
          <RadioGroup
            v-model="test_value"
            class="grid grid-cols-[1fr_1fr] gap-x-4 gap-y-2"
          >
            <RadioGroupLabel class="sr-only">test</RadioGroupLabel>
            <RadioGroupOption
              v-for="(item, idx) of test_items"
              :key="idx"
              :value="item.name"
              as="template"
              v-slot="{ active, checked }"
            >
              <button
                :class="[
                  'flex justify-center rounded-lg py-2.5 text-lg font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  checked
                    ? 'bg-white text-blue-700 shadow'
                    : 'bg-blue-400/20 text-blue-100',
                  active ? 'hover:bg-blue-500 hover:text-white' : '',
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

<style scoped lang="less">
.BG {
  background: linear-gradient(220.55deg, #7cf7ff 0%, #4b73ff 100%);
}
</style>

<script setup lang="ts">
// import {
//   BankOutlined,
//   ControlOutlined,
//   GlobalOutlined,
//   TeamOutlined,
// } from "@ant-design/icons-vue"
import { TransitionRoot } from "@headlessui/vue"
import { onMounted, ref } from "vue"
import Options from "./components/Options.vue"
import TimeTable from "./components/TimeTable.vue"
const items = ref([
  {
    figures: 15,
    unit: "座",
    title: "服务城市",
    icon: "city",
  },
  {
    figures: 2600,
    unit: "台",
    title: "终端设备",
    icon: "device_2",
  },
  {
    figures: 88.6,
    unit: "km²",
    title: "覆盖面积",
    icon: "earth_2",
  },
  {
    figures: 3000,
    unit: "天",
    title: "保障天数",
    icon: "people",
  },
])

const isVisible = ref(false)
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 500)
})
</script>

<template>
  <TransitionRoot
    appear
    :show="isVisible"
    as="template"
    enter="transform transition duration-1000"
    enter-from="-translate-y-full"
    enter-to="translate-y-0"
    leave="transform transition duration-1000"
    leave-from="translate-y-0"
    leave-to="-translate-y-full"
  >
    <header
      class="fixed mb-5 h-32 w-full bg-[url('@/assets/head_bg.png')] bg-cover bg-top bg-no-repeat text-white"
    >
      <div class="flex h-16 justify-between">
        <TimeTable />
        <!-- <MiddleTitle /> -->
        <div class="font-mono text-5xl">多源融合及次百米级临近预报</div>
        <Options />
      </div>
      <div class="flex items-center justify-center">
        <ul class="flex list-none p-2">
          <li
            v-for="(item, index) of items"
            :key="index"
            class="mx-6 flex"
          >
            <SvgIcon
              :name="item.icon"
              class="h-10 w-10"
            />
            <div>
              <h1>
                {{ `${item.figures}${item.unit}` }}
              </h1>
              <h1>
                {{ item.title }}
              </h1>
            </div>
          </li>
        </ul>
      </div>
    </header>
  </TransitionRoot>
</template>

<style scoped lang="less"></style>

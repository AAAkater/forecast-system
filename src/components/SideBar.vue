<script setup lang="ts">
import { message } from "ant-design-vue"
import { ref } from "vue"

const items = ref([
  {
    title: "首页",
    icon: "home",
    click: () => {
      message.info("首页")
    },
  },
  {
    title: "设备布局",
    icon: "device",
    click: () => {
      message.info("设备布局")
    },
  },
  {
    title: "多源融合",
    icon: "multiple",
    click: () => {
      message.info("多源融合")
    },
  },
  {
    title: "各点预报",
    icon: "earth",
    click: () => {
      message.info("各点预报")
    },
  },
  {
    title: "实时检验",
    icon: "graph",
    click: () => {
      message.info("实时检验")
    },
  },
])
</script>

<template>
  <aside class="flex w-28">
    <ul class="list-none mx-auto">
      <li
        v-for="(item, index) of items"
        :key="index"
        class="flex justify-center my-8 mx-0 active:bg-blue-700/[0.5] hover:bg-blue-700/[0.5] rounded-md"
      >
        <div @click="item.click" class="p-1">
          <SvgIcon
            :name="item.icon"
            class="h-10 w-10 mx-auto"
          />
          <div
            class="text-center w-full text-white text-base mt-2"
          >
            {{ item.title }}
          </div>
        </div>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="less"></style>

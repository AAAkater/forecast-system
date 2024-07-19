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
  <aside class="fixed left-0 flex h-full w-28 items-center justify-center">
    <ul class="mx-auto list-none">
      <li
        v-for="(item, index) of items"
        :key="index"
        class="mx-0 my-8 flex justify-center rounded-md hover:bg-blue-700/[0.5] active:bg-blue-700/[0.5]"
      >
        <div
          @click="item.click"
          class="p-1"
        >
          <SvgIcon
            :name="item.icon"
            class="mx-auto h-10 w-10"
          />
          <div class="mt-2 w-full text-center text-base text-white">
            {{ item.title }}
          </div>
        </div>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="less"></style>

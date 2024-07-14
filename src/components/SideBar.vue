<script setup lang="ts">
import { message } from "ant-design-vue"
import { ref, type Ref } from "vue"
import menu1 from "@/assets/menu-1.png"
import menu2 from "@/assets/menu-2.png"
import menu3 from "@/assets/menu-3.png"
import menu4 from "@/assets/menu-4.png"
import menu5 from "@/assets/menu-5.png"

const menu = ref([
  {
    title: "首页",
    imgSrc: menu1,
    click: () => {
      message.info("首页")
    },
  },
  {
    title: "设备布局",
    imgSrc: menu2,
    click: () => {
      message.info("设备布局")
    },
  },
  {
    title: "多源融合",
    imgSrc: menu3,
    click: () => {
      message.info("多源融合")
    },
  },
  {
    title: "各点预报",
    imgSrc: menu4,
    click: () => {
      message.info("各点预报")
    },
  },
  {
    title: "实时检验",
    imgSrc: menu5,
    click: () => {
      message.info("实时检验")
    },
  },
])
</script>

<template>
  <aside class="flex w-28">
    <ul class="list-none">
      <li
        v-for="(item, index) of menu"
        class="flex justify-center my-5 mx-0"
      >
        <div @click="item.click" class="p-1">
          <img :src="item.imgSrc" class="h-16 w-auto" />
          <span class="text-center w-full text-white">
            {{ item.title }}
          </span>
        </div>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="less"></style>

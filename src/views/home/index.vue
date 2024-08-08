<script lang="ts" setup>
import { ref } from "vue"

import { useRouter } from "vue-router"
const router = useRouter()

const items = ref([
  {
    name: "主页",
    click: () => {
      router.push("/dashboard/home")
    },
  },
  {
    name: "设备布局",
    click: () => {
      router.push("/dashboard/device")
    },
  },
  {
    name: "多源融合",
    click: () => {
      router.push("/dashboard/multiple")
    },
  },
  {
    name: "格点预报",
    click: () => {
      router.push("/dashboard/forecast")
    },
  },
  {
    name: "实时监测",
    click: () => {
      router.push("/dashboard/tables")
    },
  },
])
</script>
<template>
  <div class="h-screen w-full">
    <ul class="p-0">
      <li
        class="my-3 list-none"
        v-for="(item, idx) of items"
        :key="idx"
      >
        <button @click="item.click">{{ item.name }}</button>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped></style>

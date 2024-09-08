<script setup lang="ts">
import FanSvg from "@/assets/icons/home/fan.svg"
import HomeSvg from "@/assets/icons/home/home.svg"
import MapSvg from "@/assets/icons/home/map.svg"
import NetSvg from "@/assets/icons/home/net.svg"
import SubeSvg from "@/assets/icons/home/sube.svg"
import { ref } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()

const items = ref([
  {
    name: "主页",
    icon: HomeSvg,
    click: () => {
      router.push("/dashboard/home")
    },
  },
  {
    name: "设备布局",
    icon: MapSvg,
    click: () => {
      router.push("/dashboard/device")
    },
  },
  {
    name: "多源融合",
    icon: SubeSvg,
    click: () => {
      router.push("/dashboard/multiple")
    },
  },
  {
    name: "格点预报",
    icon: NetSvg,
    click: () => {
      router.push("/dashboard/forecast")
    },
  },
  {
    name: "实时监测",
    icon: FanSvg,
    click: () => {
      router.push("/dashboard/tables")
    },
  },
])
</script>

<template>
  <div
    :class="[
      'absolute bottom-20 left-1/2 z-20 -translate-x-1/2',
      'flex items-center justify-around',
    ]"
  >
    <img
      src="@/assets/arrowLeft.png"
      class="h-14 w-auto"
    />
    <ul :class="['z-10 flex list-none p-0']">
      <li
        v-for="item of items"
        :key="item.name"
      >
        <button
          @click="item.click"
          class="mx-4 w-24"
        >
          <div class="flex w-full items-center justify-center">
            <div
              :class="[
                `bg-[url('@/assets/iconDec.png')] bg-[length:100%_100%] bg-no-repeat`,
                'absolute h-20 w-20 animate-spin',
              ]"
            />
            <img
              :src="item.icon"
              :class="['h-10 w-auto']"
            />
            <!-- <component :is="item.icon" /> -->
          </div>
          <div class="mt-8 font-medium text-white">
            {{ item.name }}
          </div>
        </button>
      </li>
    </ul>
    <img
      src="@/assets/arrowRight.png"
      class="h-14 w-auto"
    />
  </div>
</template>

<style lang="less" scoped></style>

<script setup lang="ts">
import bg_1 from "@/assets/bg_1.jpg"
import bg_3 from "@/assets/bg_3.png"

import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import NavigationBar from "./src/NavigationBar/index.vue"
import SideBar from "./src/SideBar/index.vue"
const route = useRoute()

const routeMap: Record<string, string> = {
  "/dashboard/home": bg_1,
  "/dashboard/device": "",
  "/dashboard/multiple": "",
  "/dashboard/forecast": "",
  "/dashboard/tables": bg_3,
}
const bgSrc = ref(routeMap[route.fullPath])
watch(route, (newRoute) => {
  bgSrc.value = routeMap[newRoute.fullPath] || ""
})
</script>

<template>
  <div
    :class="[
      'flex h-screen w-full justify-end',
      `bg-cover bg-fixed bg-no-repeat`,
    ]"
    :style="{ backgroundImage: `url('${bgSrc}')` }"
  >
    <navigation-bar />
    <side-bar />
    <router-view />
  </div>
</template>

<style scoped lang="less"></style>

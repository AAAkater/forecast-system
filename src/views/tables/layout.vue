<script setup lang="ts">
import SideBar from "@/components/SideBar.vue"
import NavigationBar from "@/components/NavigationBar.vue"
import Content from "./components/Content.vue"
</script>

<template>
  <div
    class="h-screen w-full flex flex-col bg-[url('@/assets/bg.jpg')] bg-no-repeat bg-cover"
  >
    <navigation-bar />
    <div
      class="flex flex-1 w-full outline outline-yellow-500"
    >
      <side-bar />
      <Content />
    </div>
  </div>
</template>

<style scoped lang="less"></style>

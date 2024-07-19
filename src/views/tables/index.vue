<script setup lang="ts">
import NavigationBar from "@/components/NavigationBar/index.vue"
import SideBar from "@/components/SideBar.vue"
import Content from "./Content.vue"
</script>

<template>
  <div
    class="flex h-screen w-full justify-end bg-[url('@/assets/bg_2.jpg')] bg-cover bg-fixed bg-no-repeat"
  >
    <navigation-bar />
    <SideBar />
    <Content />
  </div>
</template>

<style scoped lang="less"></style>

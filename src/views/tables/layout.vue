<script setup lang="ts">
import SideBar from "@/components/SideBar.vue"
import NavigationBar from "@/components/NavigationBar.vue"
</script>

<template>
  <div
    class="h-screen w-full flex flex-col bg-[url('@/assets/bg.jpg')] bg-no-repeat bg-cover"
  >
    <navigation-bar />
    <div class="flex flex-grow w-full">
      <side-bar />
      <main class="w-auto">main</main>
    </div>
  </div>
</template>

<style scoped lang="less"></style>

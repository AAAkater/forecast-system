<script setup lang="ts">
import NavigationBar from "./src/NavigationBar/index.vue"
import SideBar from "./src/SideBar/index.vue"
</script>

<template>
  <div
    :class="[
      'flex h-screen w-full justify-end',
      `bg-[url('@/assets/pageBg.png')] bg-cover bg-fixed bg-no-repeat`,
    ]"
  >
    <navigation-bar />
    <side-bar />
    <router-view />
  </div>
</template>

<style scoped lang="less"></style>

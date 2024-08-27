<script setup lang="ts">
import ListBox from "./src/ListBox.vue"
import ChinaMap from "./src/maps/index.vue"
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center">
    <ChinaMap />
    <ListBox />
  </div>
</template>

<style scoped lang="less"></style>

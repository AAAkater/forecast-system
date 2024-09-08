<script setup lang="ts">
import { onMounted } from "vue"
import { stars_nest } from "./stars.js"
onMounted(() => {
  stars_nest()
})
</script>

<template>
  <canvas
    id="canvas"
    :class="['absolute left-0 top-0 z-0 h-screen w-full']"
  />
</template>

<style lang="less" scoped></style>

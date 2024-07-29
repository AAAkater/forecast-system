<script setup lang="ts">
import { message } from "ant-design-vue"
import { onMounted } from "vue"

onMounted(() => {
  message.info("设备")
})
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center">设备</div>
</template>

<style scoped lang="less"></style>

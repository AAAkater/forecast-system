<script setup lang="ts">
import { message } from "ant-design-vue"
import { onMounted } from "vue"

onMounted(() => {
  message.info("主页")
})
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center">home</div>
</template>

<style scoped lang="less"></style>

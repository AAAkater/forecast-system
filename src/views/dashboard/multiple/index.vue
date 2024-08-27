<script setup lang="ts">
import { message } from "ant-design-vue"
import { onMounted } from "vue"

onMounted(() => {
  message.info("多源融合")
})
</script>

<template>
  <div class="h-screen w-full">
    <iframe
      class="h-screen w-full"
      src="https://www.ventusky.com/?p=33.1;107.3;4&l=wind-10m&t=20240508/02&src=link&w=0IAKtpv2A"
    />
  </div>
</template>

<style scoped lang="less"></style>

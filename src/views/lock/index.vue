<script setup lang="ts">
import LockForm from "./src/LockForm.vue"
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center">
    <video
      :class="[
        'z-[-1] h-screen w-full object-cover',
        'absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]',
      ]"
      autoplay
      loop
      muted
    >
      <source
        src="@/assets/video/lock.mp4"
        type="video/mp4"
      />
    </video>
    <LockForm />
  </div>
</template>

<style scoped lang="less"></style>

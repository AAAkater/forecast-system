<script lang="ts" setup></script>

<template>
  <div
    :class="[
      'invisible absolute z-10 h-[400px] w-[400px] bg-black p-3',
      'flex items-center justify-center',
    ]"
  >
    <slot name="text"></slot>
  </div>
</template>

<style scoped lang="less"></style>

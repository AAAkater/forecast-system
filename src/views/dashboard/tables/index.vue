<script setup lang="ts">
import Tables from "./components/LeftTables.vue"
import Options from "./components/RightOptions.vue"
</script>

<template>
  <main
    :class="[
      'h-full w-[90%] text-white',
      'overflow-auto scrollbar-hide xl:flex',
    ]"
  >
    <!-- 表格 -->
    <div
      :class="['h-full w-full overflow-auto p-5 scrollbar-hide', 'xl:w-[70%]']"
    >
      <Tables />
    </div>
    <!-- 选项 -->
    <div
      :class="[
        'flex w-full items-start justify-center p-0',
        'xl:w-[30%] xl:items-center xl:p-6',
      ]"
    >
      <Options />
    </div>
  </main>
</template>

<style scoped lang="less"></style>

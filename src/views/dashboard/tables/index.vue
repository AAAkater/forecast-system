<script setup lang="ts">
// import Options from "./components/Options.vue"
import NewOptions from "./components/NewOptions.vue"
import Tables from "./components/tables.vue"
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
    <div :class="['flex w-full items-center justify-center p-6', 'xl:w-[30%]']">
      <!-- <Options /> -->
      <NewOptions />
    </div>
  </main>
</template>

<style scoped lang="less"></style>

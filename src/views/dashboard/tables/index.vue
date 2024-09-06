<script setup lang="ts">
import Tables from "./components/LeftTables.vue"
import Options from "./components/RightOptions.vue"
</script>

<template>
  <main
    :class="[
      'ml-40 block h-screen w-full overflow-auto scrollbar-hide',
      '2xl:flex',
    ]"
  >
    <!-- 表格 -->
    <div
      :class="[
        'h-full w-full overflow-auto scrollbar-hide',
        'tables_width 2xl:w-[70%]',
      ]"
    >
      <Tables />
    </div>
    <!-- 选项 -->
    <div
      :class="[
        'flex w-full items-start justify-center p-0',
        'options_width 2xl:w-[30%] 2xl:items-center 2xl:p-6',
      ]"
    >
      <Options />
    </div>
  </main>
</template>

<style scoped lang="less">
@media (min-width: 1750px) {
  .tables_width {
    width: 80%;
  }
  .options_width {
    width: 20%;
  }
}
</style>

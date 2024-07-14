<script setup lang="ts">
import scattercharts from "./scattercharts.vue"
import boxplot from "./boxplot.vue"
import stepline from "./stepline.vue"
import Options from "./Options.vue"
</script>

<template>
  <main
    class="w-full flex-1 outline outline-white h-[37.50rem] flex"
  >
    <div
      class="scrollable-container h-full w-[62.50rem] outline"
    >
      <scattercharts />
      <boxplot />
      <stepline />
    </div>
    <Options />
  </main>
</template>

<style scoped lang="less">
.scrollable-container {
  overflow: auto;
}

.scrollable-container::-webkit-scrollbar {
  display: none;
}
</style>

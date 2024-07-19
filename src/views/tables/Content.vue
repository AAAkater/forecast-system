<script setup lang="ts">
import BoxPlot from "./components/BoxPlot.vue"
import Options from "./components/Options.vue"
import Scatter from "./components/Scatter.vue"
import SelectTime from "./components/SelectTime.vue"
import StepLine from "./components/StepLine.vue"
</script>

<template>
  <main class="flex h-full w-[90%] text-white">
    <div class="scrollbar-hide h-full w-[70%] overflow-auto p-5">
      <div class="h-72 w-full" />
      <div class="bg-transparent">
        <div class="flex w-full justify-center">
          <SelectTime />
        </div>
        <div>
          <div>均方根误差 - 风速评分</div>
          <Scatter />
        </div>
        <div>
          <div>均方根误差 - 风速评分</div>
          <BoxPlot />
        </div>
        <div>
          <div>均方根误差 - 风速评分</div>
          <StepLine />
        </div>
      </div>
    </div>
    <div class="flex w-[30%] items-center justify-center p-6">
      <Options />
    </div>
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

<script setup lang="ts">
import dayjs from "dayjs"
import { computed, onBeforeUnmount, onMounted, ref } from "vue"

const weeks = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
]
const day = dayjs().format("YYYY年MM月DD日")
const time = ref(dayjs().add(1, "second").format("HH:mm:ss"))
const week = dayjs().day()

const dWeek = computed(() => weeks[week])

let timeId: number | null = null

onMounted(() => {
  timeId = setInterval(() => {
    time.value = dayjs().add(1, "second").format("HH:mm:ss")
  }, 1000)
})

onBeforeUnmount(() => {
  // 组件销毁前清除定时器
  if (timeId) {
    clearInterval(timeId)
  }
})
</script>

<template>
  <div class="flex w-80 items-center justify-center font-mono">
    <div class="flex">
      <div class="flex items-center justify-center text-3xl">
        {{ time }}
      </div>
      <div class="ml-7">
        <div>{{ day }}</div>
        <div>{{ dWeek }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less"></style>

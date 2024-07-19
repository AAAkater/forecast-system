<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue"
interface formatTime {
  year: number
  month: number
  day: number
  weekday: string
  time: string
}
const now = new Date()
const week_days = new Array(
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
)
const currentTime: Ref<formatTime> = ref({
  year: now.getFullYear(),
  month: now.getMonth(),
  day: now.getDay(),
  weekday: week_days[now.getDay()],
  time: now.toLocaleTimeString(),
})
function getFormattedDateTime() {
  const now = new Date()
  let _time: formatTime = {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDay(),
    weekday: week_days[now.getDay()],
    time: now.toLocaleTimeString(),
  }
  currentTime.value = _time
}
onMounted(() => {
  setInterval(getFormattedDateTime, 1000)
})
</script>

<template>
  <div class="flex w-72 items-center justify-center">
    <div class="flex">
      <div class="flex items-center justify-center text-3xl">
        {{ currentTime.time }}
      </div>
      <div class="ml-7">
        <p>
          {{
            `${currentTime.year}年${currentTime.month}月${currentTime.day}日`
          }}
        </p>
        <p>
          {{ currentTime.weekday }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less"></style>

<script lang="ts" setup>
import { Map } from "@/utils/mapInit"
import { onMounted, ref } from "vue"

const mapRef = ref<HTMLElement>()
const labelRef = ref<HTMLElement>()

onMounted(() => {
  const ChinaMap = new Map(mapRef.value!, labelRef.value!)
})
</script>

<template>
  <div class="relative h-screen w-full">
    <div ref="labelRef"></div>
    <div
      ref="mapRef"
      class="h-screen w-full"
    ></div>
  </div>
</template>

<style scoped lang="less"></style>

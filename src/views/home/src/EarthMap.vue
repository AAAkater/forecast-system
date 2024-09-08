<script setup lang="ts">
import EarthMap from "@/assets/css_globe_diffuse.jpg"
// import AtmosphereBg from "@/assets/css_globe_halo.png"
import { GlobeComponent } from "echarts-gl/components"
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { ref } from "vue"
import VChart from "vue-echarts"
use([GlobeComponent, CanvasRenderer])
const option = ref({
  globe: {
    // environment: "transparent",
    baseTexture: EarthMap,
    shading: "color",
    atmosphere: {
      show: true,
    },
    light: {
      ambient: {
        intensity: 0.1,
      },
      main: {
        intensity: 1.5,
      },
    },
    viewControl: {
      autoRotateDirection: "ccw",
      autoRotate: true,
      autoRotateSpeed: 20,
      autoRotateAfterStill: 1,
      zoomSensitivity: 0,
    },
    width: 660,
    height: 660,
    left: "10%",
    top: "9%",
    zlevel: 10,
  },
})
</script>

<template>
  <div
    :class="[
      'h-[800px] w-[800px]',
      'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    ]"
  >
    <img
      src="@/assets/plane.png"
      class="moveA absolute h-32 w-auto"
    />
    <img
      src="@/assets/sun.png"
      :class="['absolute -right-60 top-60 z-30', 'moveB h-48 w-auto']"
    />

    <!-- 背景 -->
    <div
      :class="[
        'absolute z-20 h-[800px] w-[800px]',
        `bg-[url('@/assets/css_globe_halo.png')] bg-cover bg-no-repeat`,
      ]"
    />
    <!-- 地球 -->
    <VChart :option="option" />
  </div>
</template>

<style lang="less" scoped>
@keyframes moveUpDownA {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes moveUpDownB {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
.moveA {
  animation: moveUpDownA 3s infinite;
}
.moveB {
  animation: moveUpDownB 3s infinite;
}
</style>

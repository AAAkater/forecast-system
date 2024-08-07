<script setup lang="ts">
// import { message } from "ant-design-vue"
// import { onMounted } from "vue"

import LeftTitle from "./src/LeftTitle.vue"
import RightForm from "./src/RightForm.vue"
</script>

<template>
  <div
    :class="['block h-screen w-full overflow-auto scrollbar-hide', 'md:flex']"
  >
    <video
      :class="[
        'z-[-1] h-screen w-full object-cover',
        'absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]',
      ]"
      autoplay
      loop
      muted
    >
      <source
        src="@/assets/video/bg.mp4"
        type="video/mp4"
      />
    </video>

    <div :class="['h-1/3 w-full', 'md:h-screen md:w-1/2']">
      <LeftTitle />
    </div>
    <div :class="['h-2/3 min-h-[800px] w-full', 'md:h-screen md:w-1/2']">
      <RightForm />
    </div>
  </div>
</template>

<style scoped lang="less"></style>

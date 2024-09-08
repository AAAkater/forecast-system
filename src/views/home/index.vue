<script lang="ts" setup>
import EarthMap from "./src/EarthMap.vue"
import InfoButton from "./src/InfoButton.vue"
import NavigationMenu from "./src/NavigationMenu.vue"
import StarsBackground from "./src/StarsBackground.vue"
</script>
<template>
  <div
    :class="[
      'flex h-screen w-full items-center justify-center',
      `bg-[url('@/assets/home_bg.jpg')] bg-[length:100%_100%] bg-no-repeat`,
    ]"
  >
    <EarthMap />
    <NavigationMenu />
    <StarsBackground />
    <InfoButton />
  </div>
</template>
<style lang="less" scoped></style>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: "",
  },
  svgClass: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "#000",
  },
})
</script>

<template>
  <svg :class="svgClass">
    <use :xlink:href="`#icon-${name}`" :fill="color" />
  </svg>
</template>

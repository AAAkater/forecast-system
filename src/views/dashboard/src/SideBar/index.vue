<script setup lang="ts">
import DeviceSvg from "@/assets/icons/device.svg"
import ForecastSvg from "@/assets/icons/earth.svg"
import GraphSvg from "@/assets/icons/graph.svg"
import HomeSvg from "@/assets/icons/home.svg"
import MultipleSvg from "@/assets/icons/multiple.svg"
import { RadioGroup, RadioGroupOption, TransitionRoot } from "@headlessui/vue"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const items = ref([
  {
    title: "首页",
    icon: HomeSvg,
    click: () => {
      router.push("/dashboard/home")
    },
  },
  {
    title: "设备布局",
    icon: DeviceSvg,
    click: () => {
      router.push("/dashboard/device")
    },
  },
  {
    title: "多源融合",
    icon: MultipleSvg,
    click: () => {
      router.push("/dashboard/multiple")
    },
  },
  {
    title: "各点预报",
    icon: ForecastSvg,
    click: () => {
      router.push("/dashboard/forecast")
    },
  },
  {
    title: "实时检验",
    icon: GraphSvg,
    click: () => {
      router.push("/dashboard/tables")
    },
  },
])

const selected = ref(items.value[0])
// onMounted(() => {
//   // console.log(to.fullPath)
//   switch (router.currentRoute.value.fullPath) {
//     case "/dashboard/home":
//       selected.value = items.value[0]
//       break
//     case "/dashboard/device":
//       selected.value = items.value[1]
//       break
//     case "/dashboard/multiple":
//       selected.value = items.value[2]
//       break
//     case "/dashboard/forecast":
//       selected.value = items.value[3]
//       break
//     case "/dashboard/tables":
//       selected.value = items.value[4]
//       break
//   }
// })
const isVisible = ref(false)
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 500)
})
</script>

<template>
  <TransitionRoot
    appear
    :show="isVisible"
    as="template"
    enter="transform transition duration-1000"
    enter-from="-translate-x-full"
    enter-to="translate-x-0"
    leave="transform transition duration-1000"
    leave-from="translate-x-0"
    leave-to="-translate-x-full"
  >
    <aside class="fixed left-8 flex h-full items-center justify-center">
      <RadioGroup
        v-model="selected"
        class="rounded-2xl border-4 border-blue-400/60 bg-blue-400/20 p-1 xl:p-2"
      >
        <RadioGroupOption
          as="template"
          v-for="(item, idx) in items"
          :key="idx"
          :value="item.title"
          v-slot="{ active, checked }"
          :class="[
            'my-8 flex h-20 w-20 justify-center rounded-md',
            'sm_option',
          ]"
        >
          <div
            @click="item.click"
            :class="[
              checked ? 'bg-blue-400' : 'bg-blue-500/20',
              active ? '' : 'hover:bg-emerald-200/15',
              'w-full p-1 shadow-lg',
            ]"
          >
            <div>
              <img
                :src="item.icon"
                :class="['sm_image', 'mx-auto h-10 w-10']"
              />
              <div
                class="sm_text mt-2 w-full text-nowrap text-center text-base text-white"
              >
                {{ item.title }}
              </div>
            </div>
          </div>
        </RadioGroupOption>
      </RadioGroup>
    </aside>
  </TransitionRoot>
</template>

<style scoped lang="less">
@media not all and (min-width: 1700px) {
  .sm_option {
    height: 3.5rem;
    width: 3.5rem;
    margin: 0.75rem auto;
  }

  .sm_image {
    height: 1.25rem;
    width: 1.25rem;
  }
  .sm_text {
    font-size: 0.75rem /* 12px */;
    line-height: 1rem /* 16px */;
  }
}
</style>

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
            'my-3 flex justify-center rounded-md',
            'xl:my-8 xl:h-20 xl:w-20',
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
                :class="['mx-auto xl:h-10 xl:w-10', 'h-5 w-5']"
              />
              <div
                class="mt-2 w-full text-nowrap text-center text-xs text-white xl:text-base"
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

<style scoped lang="less"></style>

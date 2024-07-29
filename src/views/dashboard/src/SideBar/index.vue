<script setup lang="ts">
import DeviceSvg from "@/assets/icons/device.svg"
import ForecastSvg from "@/assets/icons/earth.svg"
import GraphSvg from "@/assets/icons/graph.svg"
import HomeSvg from "@/assets/icons/home.svg"
import MultipleSvg from "@/assets/icons/multiple.svg"
import { Menu, MenuItem, MenuItems, TransitionRoot } from "@headlessui/vue"
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
    <aside class="fixed left-0 flex h-full w-28 items-center justify-center">
      <Menu>
        <MenuItems :static="true">
          <MenuItem
            v-for="(item, index) of items"
            :key="index"
            v-slot="{ active }"
            class="hover: mx-0 my-8 flex h-20 w-20 justify-center rounded-md"
          >
            <div
              @click="item.click"
              class="mt-2 w-full p-1 text-center text-white shadow-lg"
              :class="{ 'bg-blue-700/[0.5]': active }"
            >
              <div>
                <!-- <SvgIcon
                  :name="item.icon"
                  class="mx-auto h-10 w-10"
                /> -->
                <img
                  :src="item.icon"
                  class="mx-auto h-10 w-10"
                />
                <div class="mt-2 w-full text-center text-base text-white">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
    </aside>
  </TransitionRoot>
</template>

<style scoped lang="less"></style>

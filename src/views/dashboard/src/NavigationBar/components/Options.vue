<script setup lang="ts">
import LockoutSvg from "@/assets/icons/LockOut.svg"
import LogoutSvg from "@/assets/icons/LoginOut.svg"
import screenfull from "screenfull"
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
// 管理员选项
const options = ref([
  {
    name: "锁屏",
    icon: LockoutSvg,
    click: () => {
      router.push("/lock")
    },
  },
  {
    name: "登出",
    icon: LogoutSvg,
    click: () => {
      router.push("/login")
    },
  },
])
// 全屏
const isFull = ref(false)
const expandOut = () => {
  if (isFull.value) {
    screenfull.exit()
    isFull.value = false
    return
  }
  screenfull.request()
  isFull.value = true
}
</script>

<template>
  <div class="flex w-72 items-center justify-evenly">
    <div class="flex w-full items-center justify-evenly">
      <a-button
        @click="expandOut"
        size="large"
        class="flex w-24"
      >
        <SvgIcon
          :name="isFull ? 'CancelExpandOut' : 'ExpandOut'"
          class="h-6 w-6"
        />
        <span class="ml-2 flex h-6 w-10 items-center justify-center">全屏</span>
      </a-button>

      <a-popover
        title=""
        placement="bottomRight"
      >
        <template #content>
          <div class="flex flex-col">
            <a-button
              v-for="(option, index) of options"
              :key="index"
              @click="option.click"
              size="large"
              class="flex w-24"
            >
              <img
                :src="option.icon"
                class="h-6 w-6"
              />
              <span class="ml-2 flex h-6 w-10 items-center justify-center">
                {{ option.name }}
              </span>
            </a-button>
          </div>
        </template>
        <a-button
          size="large"
          class="flex w-24"
        >
          <img
            src="@/assets/icons/admin.svg"
            class="h-6 w-6"
          />
          <span class="ml-2 flex h-6 w-10 items-center justify-center">
            管理
          </span>
        </a-button>
      </a-popover>
    </div>
  </div>
</template>

<style scoped lang="less"></style>

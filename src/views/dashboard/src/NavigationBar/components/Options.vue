<script setup lang="ts">
import screenfull from "screenfull"
import { ref } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const logout = () => {
  router.push("/login")
}
const lockout = () => {
  router.push("/lock")
}
// 全屏
const isFull = ref(false)
const expandOut = () => {
  if (isFull.value) {
    screenfull.exit()
    isFull.value = false
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
              @click="lockout"
              size="large"
              class="flex w-24"
            >
              <SvgIcon
                name="LockOut"
                class="h-6 w-6"
              />
              <span class="ml-2 flex h-6 w-10 items-center justify-center"
                >锁屏</span
              >
            </a-button>
            <a-button
              @click="logout"
              size="large"
              class="flex w-24"
            >
              <SvgIcon
                name="LoginOut"
                class="h-6 w-6"
              />
              <span class="ml-2 flex h-6 w-10 items-center justify-center"
                >登出</span
              >
            </a-button>
          </div>
        </template>
        <a-button
          size="large"
          class="flex w-24"
        >
          <SvgIcon
            name="admin"
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

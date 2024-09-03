<script setup lang="ts">
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons-vue"
import screenfull from "screenfull"
import { h, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
// 管理员选项
const options = ref([
  {
    name: "锁屏",
    icon: h(LockOutlined),
    click: () => {
      router.push("/lock")
    },
  },
  {
    name: "登出",
    icon: h(LogoutOutlined),
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
  <div class="flex w-64 items-center justify-evenly">
    <div class="flex w-full items-center justify-evenly">
      <a-button @click="expandOut">
        <div v-if="isFull">
          <FullscreenExitOutlined />
          取消全屏
        </div>
        <div v-else>
          <FullscreenOutlined />
          全屏
        </div>
      </a-button>

      <a-popover
        title=""
        placement="bottomRight"
      >
        <a-button>
          <UserOutlined />
          管理
        </a-button>
        <template #content>
          <div class="flex flex-col">
            <a-button
              v-for="(option, index) of options"
              :key="index"
              @click="option.click"
            >
              <component :is="option.icon" />
              {{ option.name }}
            </a-button>
          </div>
        </template>
      </a-popover>
    </div>
  </div>
</template>

<style scoped lang="less"></style>

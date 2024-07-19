<script setup lang="ts">
import {
  ExpandOutlined,
  LockOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons-vue"
import { message } from "ant-design-vue"
import screenfull from "screenfull"
import { h, ref } from "vue"

const logout = () => {
  message.info("登出")
}
const lockout = () => {
  message.info("锁屏")
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
  <div class="flex w-72 items-center justify-center">
    <div class="flex w-full">
      <a-button
        @click="expandOut"
        ghost
        :icon="h(ExpandOutlined)"
        shape="circle"
        size="large"
      />

      <a-popover
        title=""
        placement="bottomRight"
        class="ml-20"
      >
        <template #content>
          <div class="flex flex-col">
            <a-button @click="lockout">
              <LockOutlined />
              锁屏
            </a-button>
            <a-button @click="logout">
              <LoginOutlined />
              退出
            </a-button>
          </div>
        </template>
        <a-button
          size="large"
          shape="circle"
          ghost
        >
          <template #icon>
            <UserOutlined />
          </template>
        </a-button>
      </a-popover>
    </div>
  </div>
</template>

<style scoped lang="less"></style>

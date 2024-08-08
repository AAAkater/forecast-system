<script setup lang="ts">
import { LockOutlined } from "@ant-design/icons-vue"
import { message } from "ant-design-vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
const lockPassword = ref("")
const router = useRouter()
// 验证成功
const onFinish = (password: string) => {
  // message.loading("登录中", 0)

  console.log("Success:", password)
}
// 验证失败
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo)
}

const submit = () => {
  message.success("解锁成功")
  router.push("/")
}
</script>

<template>
  <div
    class="flex h-[450px] w-[420px] flex-col justify-between rounded-lg bg-white/80 p-6 shadow-lg"
  >
    <div>
      <img
        src="@/assets/icons/logo.svg"
        class="h-14 w-auto"
      />
      <div class="mb-12 mt-4 text-4xl font-bold">锁屏中...</div>
      <a-form
        name="basic"
        :wrapper-col="{ span: 24 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <!-- 密码框 -->
        <a-form-item name="password">
          <a-input-password
            v-model:value="lockPassword"
            placeholder="密码"
            size="large"
          >
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input-password>
        </a-form-item>
        <!-- 解锁 -->
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            @click="submit"
            class="w-full"
            size="large"
          >
            解锁
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="text-center text-xs">
      © 2024数据监控与实时检验终端 蜀ICP备2021022624号-1
    </div>
  </div>
</template>

<style scoped lang="less"></style>

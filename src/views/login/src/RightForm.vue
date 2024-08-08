<script lang="ts" setup>
import { useUserStore } from "@/stores"
import { type FormState } from "@/types"
import { LockOutlined, UserOutlined } from "@ant-design/icons-vue"
import { message } from "ant-design-vue"
import { type Rule } from "ant-design-vue/es/form"
import { onMounted, reactive } from "vue"
const userStore = useUserStore()
// 表单数据
const formState = reactive<FormState>({
  username: "",
  password: "",
  captcha: "",
  isRemember: userStore.remember,
})

onMounted(() => {
  // 记住密码
  if (userStore.remember) {
    formState.username = userStore.username
    formState.password = userStore.password
  }
})

// const captchaSrc = ref("")
// const getCaptcha = () => {
//   // message.success("更新验证码")
//   captchaSrc.value = captchaImg
// }
// getCaptcha()

// 校验规则
const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      message: "请输入账号",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
}

// 验证成功
const onFinish = (values: FormState) => {
  // message.loading("登录中", 0)

  console.log("Success:", values)
}
// 验证失败
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo)
}

const submit = () => {
  // 更新user
  userStore.updateInfo(formState)
  message.success("登录成功")
}
</script>
<template>
  <div class="flex h-full w-full items-center justify-center">
    <div
      class="flex h-[500px] w-4/5 max-w-96 flex-col justify-between rounded-lg bg-white/80 p-6 shadow-xl"
    >
      <div class="">
        <img
          src="@/assets/icons/logo.svg"
          class="h-14 w-auto"
        />
        <div class="my-3 text-2xl font-bold">欢迎回来!</div>
        <a-form
          :model="formState"
          name="basic"
          :wrapper-col="{ span: 24 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          :rules="rules"
        >
          <!-- 登录框 -->
          <a-form-item name="username">
            <a-input
              v-model:value="formState.username"
              placeholder="账号"
              size="large"
            >
              <template #prefix>
                <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </a-form-item>
          <!-- 密码框 -->
          <a-form-item name="password">
            <a-input-password
              v-model:value="formState.password"
              placeholder="密码"
              size="large"
            >
              <template #prefix>
                <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input-password>
          </a-form-item>
          <!-- 选项 -->
          <a-form-item name="isRemember">
            <a-flex
              justify="space-between"
              align="center"
            >
              <div>
                <a-checkbox v-model:checked="formState.isRemember">
                  记住我
                </a-checkbox>
              </div>
              <a href="">忘记密码?</a>
            </a-flex>
          </a-form-item>
          <!-- 注册与找回 -->
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              @click="submit"
              class="w-full"
              size="large"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="text-center text-xs">
        © 2024数据监控与实时检验终端 蜀ICP备2021022624号-1
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped></style>

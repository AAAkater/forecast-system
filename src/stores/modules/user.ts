import type { FormState } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"
export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref("")
    const password = ref("")
    const username = ref("")
    const isRemember = ref(false)
    const updateInfo = (newInfo: FormState) => {
      username.value = newInfo.username
      password.value = newInfo.password
      isRemember.value = newInfo.isRemember
    }
    const updateToken = (newToken: string) => {
      token.value = newToken
    }
    const removeUser = () => {
      localStorage.removeItem("user")
    }
    return {
      username,
      password,
      remember: isRemember,
      token,
      updateInfo,
      updateToken,
      removeUser,
    }
  },
  {
    persist: true,
  },
)

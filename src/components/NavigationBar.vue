<script setup lang="ts">
import {
  UserOutlined,
  ExpandOutlined,
  LoginOutlined,
  LockOutlined,
  BankOutlined,
  ControlOutlined,
  GlobalOutlined,
  TeamOutlined,
} from "@ant-design/icons-vue"
import {
  ref,
  type Ref,
  h,
  reactive,
  onMounted,
  markRaw,
} from "vue"
import { message } from "ant-design-vue"

// 左边时间部分
interface formatTime {
  year: number
  month: number
  day: number
  weekday: string
  time: string
}
const now = new Date()
const week_days = new Array(
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
)
const currentTime: Ref<formatTime> = ref({
  year: now.getFullYear(),
  month: now.getMonth(),
  day: now.getDay(),
  weekday: week_days[now.getDay()],
  time: now.toLocaleTimeString(),
})
function getFormattedDateTime() {
  const now = new Date()
  let _time: formatTime = {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDay(),
    weekday: week_days[now.getDay()],
    time: now.toLocaleTimeString(),
  }
  currentTime.value = _time
}
onMounted(() => {
  setInterval(getFormattedDateTime, 1000)
})

//中间大标题

const datas = ref([
  {
    figures: 15,
    unit: "座",
    title: "服务城市",
    icon: markRaw(BankOutlined),
  },
  {
    figures: 2600,
    unit: "台",
    title: "终端设备",
    icon: markRaw(ControlOutlined),
  },
  {
    figures: 88.6,
    unit: "km²",
    title: "覆盖面积",
    icon: markRaw(GlobalOutlined),
  },
  {
    figures: 3000,
    unit: "天",
    title: "保障天数",
    icon: markRaw(TeamOutlined),
  },
])

// 右边选项
const state = reactive({
  collapsed: false,
  selectedKeys: ["1"],
  openKeys: ["1"],
  preOpenKeys: ["1"],
})

const items = ref([
  {
    key: "1",
    icon: () => h(UserOutlined),
    label: "管理员",
    title: "管理员",
    children: [
      {
        key: "2",
        icon: () => h(LockOutlined),
        label: "锁屏",
        title: "Option 5",
        click: () => {
          message.info("锁屏")
        },
      },
      {
        key: "3",
        icon: () => h(LoginOutlined),
        label: "退出",
        title: "Option 6",
        click: () => {
          message.info("退出")
        },
      },
    ],
  },
])
</script>

<template>
  <header
    class="h-36 w-full text-white flex justify-between"
  >
    <div
      class="text-cyan-500 w-36 flex justify-center items-center"
    >
      <div>
        <div>
          {{
            `${currentTime.year}年${currentTime.month}月${currentTime.day}日`
          }}
        </div>
        <div>
          {{ currentTime.weekday }} {{ currentTime.time }}
        </div>
      </div>
    </div>

    <div class="outline outline-white">
      <h1 class="text-center">
        多源融合及次百米级临近预报
      </h1>
      <ul class="list-none flex p-4">
        <li
          v-for="(data, index) of datas"
          class="mx-4 flex outline outline-yellow-200"
        >
          <component :is="data.icon" />
          <div>
            <h1>
              {{ `${data.figures}${data.unit}` }}
            </h1>
            <h1>
              {{ data.title }}
            </h1>
          </div>
        </li>
      </ul>
    </div>

    <div class="flex outline outline-white">
      <div><ExpandOutlined /> 全屏</div>
      <div>
        <a-menu
          v-model:openKeys="state.openKeys"
          v-model:selectedKeys="state.selectedKeys"
          mode="inline"
          theme="dark"
          :inline-collapsed="state.collapsed"
          :items="items"
          class="bg-transparent"
        ></a-menu>
      </div>
    </div>
  </header>
</template>

<style scoped lang="less"></style>

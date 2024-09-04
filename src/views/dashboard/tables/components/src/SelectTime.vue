<script lang="ts" setup>
import { SearchOutlined } from "@ant-design/icons-vue"
import locale from "ant-design-vue/es/date-picker/locale/zh_CN"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import { h, ref } from "vue"
// const onChange = (value: Dayjs, dateString: string) => {
//   console.log("Selected Time: ", value)
//   console.log("Formatted Selected Time: ", dateString)
// }

// const onOk = (value: Dayjs) => {
//   console.log("onOk: ", value)
// }
dayjs.locale("zh-cn")
type RangeValue = [Dayjs, Dayjs]
const selectTime = ref<RangeValue>()
const onRangeChange = (value: [Dayjs, Dayjs], dateString: [string, string]) => {
  console.log("Selected Time: ", value)
  console.log("Formatted Selected Time: ", dateString)
}

const onRangeOk = (value: [Dayjs, Dayjs]) => {
  console.log("onOk: ", value)
}
const onSearchClick = () => {
  console.log("选择的时间", selectTime.value)
}
</script>

<template>
  <div class="flex w-[500px] items-center justify-between">
    <a-range-picker
      v-model:value="selectTime"
      :show-time="{ format: 'HH:mm' }"
      format="YYYY-MM-DD HH:mm"
      :placeholder="['开始时间', '结束时间']"
      @change="onRangeChange"
      @ok="onRangeOk"
      size="large"
      class="w-80"
      :locale="locale"
    />
    <a-button
      :icon="h(SearchOutlined)"
      size="large"
      @click="onSearchClick"
    >
      查询
    </a-button>
  </div>
</template>

<style lang="less" scoped></style>

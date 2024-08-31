<script lang="ts" setup>
import { SearchOutlined } from "@ant-design/icons-vue"
import { Dayjs } from "dayjs"
import { h } from "vue"
// const onChange = (value: Dayjs, dateString: string) => {
//   console.log("Selected Time: ", value)
//   console.log("Formatted Selected Time: ", dateString)
// }

// const onOk = (value: Dayjs) => {
//   console.log("onOk: ", value)
// }

const onRangeChange = (value: [Dayjs, Dayjs], dateString: [string, string]) => {
  console.log("Selected Time: ", value)
  console.log("Formatted Selected Time: ", dateString)
}

const onRangeOk = (value: [Dayjs, Dayjs]) => {
  console.log("onOk: ", value)
}
</script>

<template>
  <div class="flex w-1/3 min-w-44 items-center justify-between">
    <a-range-picker
      :show-time="{ format: 'HH:mm' }"
      format="YYYY-MM-DD HH:mm"
      :placeholder="['开始时间', '结束时间']"
      @change="onRangeChange"
      @ok="onRangeOk"
      size="large"
      class="w-full max-w-96"
    />
    <a-button
      :icon="h(SearchOutlined)"
      size="large"
    >
      查询
    </a-button>
  </div>
</template>

<style lang="less" scoped></style>

<script lang="ts" setup>
import { Dayjs } from "dayjs"

const onChange = (value: Dayjs, dateString: string) => {
  console.log("Selected Time: ", value)
  console.log("Formatted Selected Time: ", dateString)
}

const onOk = (value: Dayjs) => {
  console.log("onOk: ", value)
}

const onRangeChange = (value: [Dayjs, Dayjs], dateString: [string, string]) => {
  console.log("Selected Time: ", value)
  console.log("Formatted Selected Time: ", dateString)
}

const onRangeOk = (value: [Dayjs, Dayjs]) => {
  console.log("onOk: ", value)
}
</script>

<template>
    <a-range-picker
      :show-time="{ format: 'HH:mm' }"
      format="YYYY-MM-DD HH:mm"
      :placeholder="['开始时间', '结束时间']"
      @change="onRangeChange"
      @ok="onRangeOk"
      size="large"
    />
</template>

<style lang="less" scoped></style>

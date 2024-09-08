<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue"
import { h, ref } from "vue"
const isOpen = ref<boolean>(false)

const showModal = () => {
  isOpen.value = true
}
const handleOk = (e: MouseEvent) => {
  console.log(e)
  isOpen.value = false
}
</script>

<template>
  <div :class="['z-20']">
    <a-button
      type="primary"
      shape="circle"
      :icon="h(PlusOutlined)"
      @click="showModal"
    />
    <a-modal
      v-model:open="isOpen"
      title="系统说明"
      centered
      width="1000px"
    >
      <div class="indent-8 font-medium">
        <p>
          本系统是由成都信息工程大学电子工程学院（大气探测学院）研制的可对海上船载探测设备、陆地探测设备、空中机载气象雷达、天上卫星多种气象探测设备的观测资料进行数据质控、融合，即对点、线、面不同扫描方式获得的探测数据进行时间、空间四个维度的插值、逐步订正分析和三维变分，获得三维风场、三维温度场、三维云分析场等格点数据。从而弥补不同探测设备在空间扫描上的盲区，弥补多种探测设备协同观测中由于扫描步长不同导致的时间间隙，获得目标区域各气象要素更加精细化的三维分析场。
        </p>
        <br />
        <p>
          同时，本系统将基于以上精准的融合资料作为区域数值模式的初始场、作为人工智能算法的训练素材，为目标区域提供以上两种技术的6小时及以内的中小尺度临近预报，并进行实时检验。
        </p>
      </div>
      <template #footer>
        <a-button
          type="primary"
          key="back"
          @click="handleOk"
        >
          确定
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<style lang="less" scoped></style>

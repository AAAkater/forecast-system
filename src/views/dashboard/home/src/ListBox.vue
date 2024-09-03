<script setup lang="ts">
import { AimOutlined, CheckOutlined } from "@ant-design/icons-vue"
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue"
import { ref } from "vue"
const options = [
  { name: "全国", places: ["全部城市"] },
  {
    name: "机场",
    places: [
      "成都双流机场",
      "成都天府机场",
      "重庆江北机场",
      "昆明长水机场",
      "贵州龙洞堡机场",
      "新疆喀什机场",
      "丽江机场",
      "西宁机场",
      "迪庆机场",
    ],
  },
  { name: "城市", places: ["琼州海峡", "连云港", "日照"] },
  { name: "冬奥会赛区", places: ["张家口赛区", "延庆赛区", "京津冀赛区"] },
]
const selected = ref(options[0].places[0])
</script>

<template>
  <div class="fixed right-12 top-1/3 z-10 w-52">
    <div
      :class="[
        'my-2 pl-4 text-sm text-white',
        `bg-[url('@/assets/card_bg.png')] bg-[length:100%_100%] bg-left bg-no-repeat`,
      ]"
    >
      城市位置
    </div>
    <Popover
      v-slot="{ open }"
      class="relative"
    >
      <div class="flex h-16 items-center justify-between">
        <img
          src="@/assets/icons/city_2.svg"
          class="ml-4 h-12"
        />
        <div class="">
          <div class="text-white">当前城市 共计15座</div>
          <PopoverButton
            :class="[
              open ? 'text-white' : 'text-black',
              'flex h-8 w-32 items-center justify-center rounded-md text-base font-medium',
              'hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75',
              'bg-blue-400/50',
            ]"
          >
            <div>{{ selected }}</div>
          </PopoverButton>
        </div>
      </div>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          :class="[
            'absolute left-1/2 mt-3 -translate-x-1/2 transform overflow-auto px-4 scrollbar-hide',
            'z-10 h-[450px]',
          ]"
        >
          <RadioGroup
            v-model="selected"
            v-for="option in options"
          >
            <!-- 按钮组名 -->
            <RadioGroupLabel class="text-sm text-white">
              {{ option.name }}
            </RadioGroupLabel>
            <!-- 按钮 -->
            <RadioGroupOption
              as="template"
              v-for="(place, idx) in option.places"
              :key="idx"
              :value="place"
              v-slot="{ active, checked }"
            >
              <div
                :class="[
                  active
                    ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                    : '',
                  checked ? 'bg-sky-900/75 text-white' : 'bg-white',
                  'relative my-1 flex w-40 cursor-pointer rounded-lg py-2 shadow-md focus:outline-none',
                ]"
              >
                <div class="flex w-full items-center justify-around">
                  <AimOutlined />
                  <RadioGroupLabel
                    as="p"
                    :class="checked ? 'text-white' : 'text-gray-900'"
                    class="text-sm font-medium"
                  >
                    {{ place }}
                  </RadioGroupLabel>
                  <div class="flex items-center justify-center">
                    <CheckOutlined v-show="checked" />
                  </div>
                </div>
              </div>
            </RadioGroupOption>
          </RadioGroup>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<style scoped lang="less"></style>

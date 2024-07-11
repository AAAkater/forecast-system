import "@/assets/main.css"

import { createApp } from "vue"
import pinia from "@/stores"
import router from "@/router"
import App from "./App.vue"
import Antd from "ant-design-vue"
// import "ant-design-vue/dist/reset.css"
const app = createApp(App)
app.use(Antd)
app.use(pinia)
app.use(router)

app.mount("#app")

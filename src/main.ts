import "./main.css"

import router from "@/router"
import pinia from "@/stores"
import Antd from "ant-design-vue"
import "virtual:svg-icons-register"
import { createApp } from "vue"
import App from "./App.vue"
// import "ant-design-vue/dist/reset.css"
const app = createApp(App)
app.use(Antd)
app.use(pinia)
app.use(router)

app.mount("#app")

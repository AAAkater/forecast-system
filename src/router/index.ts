import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("@/views/dashboard/index.vue"),
    children: [
      {
        path: "tables",
        meta: {
          title: "实时检验",
          noAuth: true,
        },
        component: () => import("@/views/dashboard/tables/index.vue"),
      },
      {
        path: "device",
        meta: {
          title: "设备布局",
          noAuth: true,
        },
        component: () => import("@/views/dashboard/device/index.vue"),
      },
      {
        path: "multiple",
        meta: {
          title: "多源融合",
          noAuth: true,
        },
        component: () => import("@/views/dashboard/multiple/index.vue"),
      },
      {
        path: "forecast",
        meta: {
          title: "各点预报",
          noAuth: true,
        },
        component: () => import("@/views/dashboard/forecast/index.vue"),
      },
      {
        path: "home",
        meta: {
          title: "主页",
          noAuth: true,
        },
        component: () => import("@/views/dashboard/home/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/lock",
    component: () => import("@/views/lock/index.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

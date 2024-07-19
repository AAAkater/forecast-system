import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/tables",
  },
  {
    path: "/",
    component: () => import("@/views/tables/index.vue"),
    children: [
      {
        path: "/tables",
        meta: {
          title: "实时检验",
          noAuth: true,
        },
        component: () => import("@/views/tables/index.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

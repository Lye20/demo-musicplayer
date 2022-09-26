import { createRouter, createWebHistory } from "vue-router"
import HomeViews from "@/views/HomeView"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeViews
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
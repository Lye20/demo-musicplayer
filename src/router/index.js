import { createRouter, createWebHistory } from "vue-router"
import HomeViews from "@/views/HomeView"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeViews
  },
  {
    path: "/new",
    name: "new",
    component: ()=>import(/* webpackChunkName: "HotView" */ "@/views/NewSongView")
  },
  {
    path: "/songlist",
    name: "songlist",
    component: ()=>import(/* webpackChunkName: "SongListView" */ "@/views/SongListView")
  },
  {
    path: "/search",
    name: "search",
    component: ()=>import(/* webpackChunkName: "SearchView" */ "@/views/SearchView")
  },
  {
    path: "/play",
    name: "play",
    component: ()=>import(/* webpackChunkName: "PlayView" */ "@/views/PlayView")
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
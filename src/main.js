import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import "@/assets/css/index.css"
import "@/assets/js"
import "@/assets/font/iconfont.css"
createApp(App).use(router).mount('#app')

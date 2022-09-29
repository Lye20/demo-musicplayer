<template>
  <TopNav v-if="showTopNav" />
  <div class="view">
    <router-view></router-view>
  </div>
  <BottomPlayer v-if="showBottomPlayer" />
</template>

<script>
  import { ref, watch } from "vue"
  import { useRoute } from "vue-router"
  import TopNav from "@/components/TopNav"
  import BottomPlayer from "@/components/BottomPlayer"
  export default {
    name: 'App',
    components: {TopNav, BottomPlayer},
    setup() {
      const route = useRoute()
      const showTopNav = ref(true)
      const showTopNavViews = new Set(["home", "new"])
      const showBottomPlayer = ref(true)
      const showBottomPlayerViews = new Set(["home", "new", "songlist"])
      watch(()=>route.name, ()=>{
        showTopNav.value = showTopNavViews.has(route.name)
        showBottomPlayer.value = showBottomPlayerViews.has(route.name)
      })
      return {
        showTopNav, 
        showBottomPlayer
      }
    }
  }
</script>

<style lang="less" scoped>
  .view {
    background-color: #f8f8f8;
  }
</style>

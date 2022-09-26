<template>
  <TopNav />
  <div class="body">
    
  </div>
  <BottomPlayer />

</template>

<script>
  import TopNav from "@/components/TopNav"
  import BottomPlayer from "@/components/BottomPlayer"
  export default {
    name: "HomeView",
    components: {TopNav, BottomPlayer}
  }
</script>

<style lang="less" scoped>
  .body {
    height: 1000px;
  }
</style>
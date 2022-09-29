<template>
  <div class="top-nav">
    <div class="nav">
      <div class="nav-container">
        <div class="nav-item" :class="{'active': active==='home'}" @click="activate('home')">推荐</div>
        <div class="nav-item" :class="{'active': active==='new'}" @click="activate('new')">新曲</div>
      </div>
      <div class="user">
       <span class="iconfont icon-xinfeng"></span>
        <img src="@/assets/user-profile.jpg" alt="">
      </div>
    </div>
    <div class="search" @click="goto('search')">
      <span class="iconfont icon-fangdajing"></span>
      <span class="text">周杰伦</span>
    </div>
  </div>
</template>

<script>
  import { computed } from "vue"
  import { useRoute, useRouter } from "vue-router"
  export default {
    name: "TopNav",
    setup(){
      const route = useRoute()
      const router = useRouter()
      const active = computed(()=>{
        return route.name
      })
      const activate = name=>{
        active.value = name
        goto(name)
      }
      const goto = name=>router.push({name})
      return {
        active,
        activate,
        goto
      }
    }
  }
</script>

<style lang="less" scoped>
  .top-nav{
    position: fixed;
    top: 0;
    width: 100%;
    min-width: 300px;
    background-color: #fff;
    z-index: 5;
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 2rem;
      margin: 0.7625rem 0.9375rem 0.125rem;
      .nav-container {
        .nav-item {
          position: relative;
          float: left;
          width: 3rem;
          height: 2rem;
          color: #666;
          text-align: center;
          line-height: 2rem;
          padding: 0 0.625rem;
          margin-right: 0.625rem;
          &.active {
            color: #555;
            font-size: 1.2rem;
            font-weight: 700;
            &:after, &:before {
              clip-path: inset(0);
            }
          }
          &:after, &:before {
            box-sizing: border-box;
            position: absolute;
            top: 0;
            left: 0; 
            display: block;
            content: "";
            width: 100%;
            height: 100%;
            border: 0.125rem solid gold;
            border-radius: 0.3125rem;
            transition: clip-path 0.4s;
          }
          &:after {
            clip-path: inset(1.1rem 0 0 2rem);
          }
          &:before {
            clip-path: inset(0 2rem 1.1rem 0);
          }
        }
      }
      .user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.8rem;
        span {
          font-size: 1.2rem;
        }
        img {
          height: 100%;
          border-radius: 50%;
          margin-left: 0.9375rem;
        }
      }
    }
    .search {
      width: 95%;
      border-radius: 0.5rem;
      padding: 0.3125rem 0;
      background-color: #e3e3e3;
      margin: 0.5125rem auto 0.3rem;
      .iconfont {
        padding-left: 0.625rem;
        padding-right: 0.4375rem;
      }
      .iconfont,.text {
        font-size: 0.875rem;
        line-height: 0.875rem;
        color: #666;
      }
    }
  }
</style>
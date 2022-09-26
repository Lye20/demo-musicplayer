<template>
  <div class="top-nav">
    <div class="nav">
      <div class="nav-container">
        <div class="nav-item" :class="{'active': nav.activeId==='1'}"><div class="text" @click="activeNav" navId="1">推荐</div></div>
        <div class="nav-item" :class="{'active': nav.activeId==='2'}"><div class="text" @click="activeNav" navId="2">歌单</div></div>
      </div>
      <div class="user">
        <span class="iconfont icon-xinfeng"></span>
        <img src="@/assets/user-profile.jpg" alt="">
      </div>
    </div>
    <div class="search">
      <span class="iconfont icon-fangdajing"></span>
      <span class="text">周杰伦</span>
    </div>
  </div>
</template>

<script>
  import {reactive} from "vue"
  export default {
    name: "TopNav",
    setup(){
      const nav = reactive({
        activeId: "1"
      })
      const activeNav = (event)=>{
        const navId = event.target.getAttribute("navId")
        console.log(event.target.getAttribute("navId"))
        nav.activeId = navId
      }
      return {
        nav,
        activeNav
      }
    }
  }
</script>

<style lang="less" scoped>
  .top-nav{
    position: fixed;
    width: 100%;
    min-width: 300px;
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 2rem;
      margin: 0.325rem 0.9375rem;
      .nav-container {
        .nav-item {
          position: relative;
          float: left;
          height: 2rem;
          width: 3.5rem;
          margin-right: 0.625rem;
          .text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 2.4rem;
            height: 1.2rem;
            line-height: 1.2rem;
            text-align: center;
            transition: all 0.1s;
          }
          &.active {
            color: #333;
            font-size: 1.2rem;
            font-weight: 700;
            &:after, &:before {
              clip-path: inset(0)
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
            transition: clip-path 0.5s;
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
      background-color: #ddd;
      margin: 0.5125rem auto;
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
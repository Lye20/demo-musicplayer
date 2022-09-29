<template>
  <div class="home">
    <div class="banner">
      <div class="swiper" :ref="(ele)=>swiper.el=ele">
        <div class="wrapper" :ref="(ele)=>swiper.wrapper=ele"
        @touchstart="swiper.touchs" @touchmove="swiper.touchm" @touchend="swiper.touche">
          <img v-for="item of swiper.items" :src="item.pic" alt="" :key="item.id" :songListId="item.id">
          <img v-if="swiper.items.length" :src="swiper.items[0].pic" alt="" :songListId="swiper.items[0].id">
        </div>
      <div class="point">
          <span :class="{'active': swiper.current%swiper.items.length===index}" 
          v-for="(item, index) of swiper.items" :key="item.id" @click="pointHandler(index)"></span>
        </div>
      </div>
    </div>
    <div class="navigator">
      <div class="nav-item" v-for="item of navList" :key="item.id">
        <img :src="item.icon" alt="">
        <span class="text">{{item.text}}</span>
      </div>
    </div>
    <div class="recommend">
      <div class="header">
        <div class="title">推荐歌单</div>
        <div class="bar"></div>
      </div>
      <ul class="recommend-list" @click="toSongList">
        <li class="recommend-item" v-for="item of recommendSongLists" :key="item.id" :songListId="item.id">
          <div class="play-count" :songListId="item.id">
            <span class="iconfont icon-gl-headphones" :songListId="item.id"></span>
            <span :songListId="item.id">{{item.formatPlayCount}}</span>
          </div>
          <img :src="item.picUrl" alt="" :songListId="item.id">
          <span :songListId="item.id">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { ref, reactive, onUnmounted } from "vue"
  import { useRouter } from "vue-router" 
  import { requestRecommendSongLists } from "@/api"
  import useSwiper from "@/hooks/swiper"
  export default {
    name: "HomeView",
    setup() {
      const router = useRouter()
      
      const swiper = reactive({
        el: null,
        wrapper: null,
      })
      useSwiper(swiper, 2000, 1000)
      const pointHandler = index=>{
        swiper.pause()
        swiper.move(index)
        swiper.run()
      }
      onUnmounted(()=>swiper.pause())
      
      const navList = reactive([
        {icon: "svg/1.svg", text: "歌手"},
        {icon: "svg/2.svg", text: "小说"},
        {icon: "svg/3.svg", text: "儿童"},
        {icon: "svg/4.svg", text: "电台"},
        {icon: "svg/5.svg", text: "专区"},
      ]) 
      
      const recommendSongLists = ref([])
      requestRecommendSongLists().then(response=>{
        recommendSongLists.value = response.data.result.map(item=>{
          const {id, picUrl, playCount, name} = item
          const formatPlayCount = (playCount / 10000).toFixed(1)+"万"
          return {id, picUrl, formatPlayCount, name}
        })
      })
      
      const toSongList = (event)=>{
        const songListId = event.target.getAttribute("songListId")
        if (songListId) router.push({name: "songlist", query: {id: songListId}})
      }
      return {
        swiper,
        pointHandler,
        navList,
        recommendSongLists,
        toSongList
      }
    }
  }
</script>

<style lang="less" scoped>
  .home {
    box-sizing: border-box;
    width: 100vw;
    min-width: 300px;
    padding: 5.7rem 2vw 3rem;
    .banner {
      .swiper {
        position: relative;
        overflow: hidden;
        .wrapper {
          transform: translateX(var(--offset, 0));
          transition: transform var(--speed, 0.5s);
          img {
            float: left;
            box-sizing: border-box;
            width: 96vw;
            min-width: 300px;
            padding: 0 1vw;
            border-radius: 0.625rem;
          }
        }
        .point {
          color: #fff;
          position: absolute;
          bottom: 0.125rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          span {
            display: inline-block;
            width: 0.3125rem;
            height: 0.3125rem;
            background-color: #fff;
            opacity: 70%;
            margin: 0 3px;
            border-radius: 50%;
          }
          .active {
            opacity: 100%;
          }
        }
      }
    }
    .navigator {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.3125rem;
      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 18%;
        height: 3.8625rem;
        color: #555;
        font-size: 0.8rem;
        background-color: #fff;
        border-radius: 0.3125rem;
        margin: 0.625rem 0;
        img {
          height: 65%;
        }
      }
    }
    .recommend {
      .header {
        .title {
          position: relative;
          width: 5rem;
          height: 2rem;
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 2rem;
          text-align: center;
        }
        .bar {
          height: 0.1875rem;
          width: 6rem;
          background-color: gold;
        }
      }
      .recommend-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-top: 0.8375rem;
        .recommend-item {
          position: relative;
          width: 30%;
          height: 9.5rem;
          border-radius: 0.625rem;
          background-color: #fff;
          margin-bottom: 0.625rem;
          overflow: hidden;
          .play-count {
            position: absolute;
            top: 0.125rem;
            right: 0.1125rem;
            .iconfont {
              margin-right: -0.1875rem;
            }
            span {
              float: left;
              color: #dddddd;
              font-size: 0.5rem;
            }
          }
          img {
            width: 100%;
            margin-bottom: 0.2125rem;
          }
          span {
            display: -webkit-box;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            line-clamp: 2;					
            -webkit-box-orient: vertical;
            color: #444;
            font-size: 0.8rem;
            line-height: 1rem;
            text-align: justify;
            padding: 0 0.1875rem;
            z-index: -1;
          }
        }
      }
    }

  }
</style>
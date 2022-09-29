<template>
  <div class="bottomPlayer">
    <div class="middle">
      <div class="name-container" ref="nameContainerEle">
        <div class="name roll" ref="nameEle">
          <span>{{name}}&nbsp;&nbsp;</span> 
          <span v-if="rolling">{{name}}&nbsp;&nbsp;</span>
        </div>
      </div>
    </div>
    <div class="img" @click="goto">
      <img src="@/assets/logo.png" ref="img" alt="">
    </div>
    <div class="buttons">
      <span class="iconfont icon-shangyishou"></span>
      <span class="iconfont icon-tingzhi" v-if="playing" @click="toggle"></span>
      <span class="iconfont icon-bofang" v-if="!playing" @click="toggle"></span>
      <span class="iconfont icon-xiayishou"></span>
      <span class="iconfont icon-yinpinliebiao"></span>
    </div>
  </div>
</template>

<script>
  import {ref, watch, onMounted} from "vue"
  import { useRouter } from "vue-router"
  export default {
    name: "BottomPlayer",
    setup() {
      const router = useRouter()
      
      const goto = ()=>{
        router.push({
          name: "play"
        })
      }

      const name = ref("World's Smallest Violin (Explicit) - AJR")
      const nameEle = ref()
      const nameContainerEle = ref()
      const rolling = ref(false)
      onMounted(()=>{
        watch(name, ()=>{
          const nameEleWidth = parseFloat(getComputedStyle(nameEle.value)["width"])
          const nameContainerEleWidth = parseFloat(getComputedStyle(nameContainerEle.value)["width"])
          if (nameEleWidth > nameContainerEleWidth) {
            nameEle.value.style.setProperty("--distance", `-${nameEleWidth}px`)
            rolling.value = true
          }
        }, {immediate: true})
      })
      
      const playing = ref(false)
      const img = ref()
      const toggle = ()=>{
        playing.value = !playing.value
      }
      onMounted(()=>{
        watch(playing, ()=>{
          img.value.style.setProperty("--playing", playing.value ? "running" : "paused")
        })
      })
      return {goto, name, nameEle, nameContainerEle, rolling, playing, img, toggle
      }
    }
  }
</script>

<style lang="less" scoped>
  .bottomPlayer {
    @leftWidth: 3.5rem;
    @rightWidth: 9.4rem;
    width: 100%;
    min-width: 300px;
    position: fixed;
    bottom: 0;
    height: 3.125rem;
    background-color: #fff;
    z-index: 5;
    &>div {
      position: relative;
      float: left;
      top: 50%;
      transform: translateY(-50%);
    }
    .middle {
      width: 100%;
      .name-container {
        margin: 0 @rightWidth 0 @leftWidth;
        overflow: hidden;
        .name {
          display: inline-block;
          line-height: 0.9rem;
          font-size: 0.9rem;
          white-space: nowrap;
        }
        .roll {
          position: relative;
          animation: roll-ani 5s linear infinite;
          @keyframes roll-ani{
            from {
              left: 0;
            }
            to {
              left: var(--distance, 0);
            }
          }
        }
      }
    }
    .img {
      width: @leftWidth;
      margin-left: -100%;
      img {
        width: 2.5rem;
        height: 2.5rem;
        margin: 0 0.5rem;
        vertical-align: bottom;
        border: 1px solid #666;
        border-radius: 50%;
        animation: rotate-ani 10s linear infinite;
        animation-play-state: var(--playing, paused);
        @keyframes rotate-ani {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      }
    }
    .buttons {
      width: @rightWidth;
      margin-left: -@rightWidth;
      height:  2rem;
      span {
        display: inline-block;
        border: none;
        background-color: transparent;
        margin-left: 0.15rem;
        padding: 0;
        opacity: 80%;
        font-size: 2rem;
      }
    }
    &:before,&:after {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: 100%;
      height: 100%;
      border-top: 2px solid #666;
    }
    &:after {
      border-color: gold;
      transform: translateX(-50%);
    }
  }
</style>
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
    <div class="img">
      <img src="@/assets/logo.png" alt="">
    </div>
    <div class="buttons">
     <button class="prev">
        <span class="iconfont icon-shangyiqu"></span>
      </button>
      <button class="play" v-show="playing" @click="toggle">
        <span class="iconfont icon-bofangzhong"></span>
      </button>
      <button class="pause" v-show="!playing" @click="toggle">
        <span class="iconfont icon-zanting"></span>
      </button>
      <button class="next">
        <span class="iconfont icon-xiayiqu"></span>
      </button>
      <button class="list">
        <span class="iconfont icon-bofangliebiao"></span>
      </button>
    </div>
  </div>
</template>

<script>
  import {ref, watch, onMounted} from "vue"
  export default {
    name: "BottomPlayer",
    setup() {
      const playing = ref(false)
      const toggle = ()=>{
        playing.value = !playing.value
      }
      
      const name = ref("World's Smallest Violin(Explicit) -AJR")
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
      
      return {
        playing,
        toggle,
        name,
        nameEle,
        nameContainerEle,
        rolling,
      }
    }
  }
</script>

<style lang="less" scoped>
  @leftWidth: 3.5rem;
  @rightWidth: 8.75rem;
  @keyframes roll-ani{
    from {
      left: 0;
    }
    to {
      left: var(--distance, 0);
    }
  }
  .bottomPlayer {
    width: 100%;
    min-width: 300px;
    position: fixed;
    bottom: 0;
    height: 3.125rem;
    border-top: 1px solid #ccc;
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
        }
      }
    }
    .img {
      width: @leftWidth;
      margin-left: -100%;
      img {
        width: 2.5rem;
        height: 2.5rem;
        padding: 0 0.5rem;
        vertical-align: bottom;
        border-radius: 50%;
      }
    }
    .buttons {
      width: @rightWidth;
      margin-left: -@rightWidth;
      button {
        display: inline-block;
        width: 1.5625rem;
        border: none;
        background-color: transparent;
        margin: 0 0.3125rem;
        padding: 0;
        span {
          font-size: 1.5625rem;
          line-height: 1.5625rem;
        }
      }
      .pause {
        transform: rotate(180deg);
      }
    }
  }
</style>
<template>
  <div class="new-songs">
    <div class="header">
      <div class="content">
        <div class="sprite">
          <div class="text">更新日期：{{date.getMonth()+1}}月{{date.getDate()}}日</div>
        </div>
      </div>
      <img class="background" src="@/assets/img/hot_music_bg_2x.jpg"/>
    </div>
    <div class="body">
      <ul class="list">
        <li class="song" v-for="(item, index) of songList.songs" :key="item.id">
          <div class="song-detail">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.ar}}-{{item.al}}</div>
          </div>
          <div class="order">{{index+1}}</div>
          <span class="iconfont icon-zanting"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { reactive } from "vue"
  import { requestNewSongs } from "@/api"
  export default {
    name: "songList",
    setup() {
      const songList = reactive({
        name: "",
        pic: "",
        playCount: "",
        tags: "",
        songs: []
      })
      const date = new Date()
      requestNewSongs().then(response=>{
        songList.songs = response.data.data.map(item=>{
          return {
            id: item.id,
            name: item.name,
            al: item.alias[0],
            ar: item.artists[0].name
          }
        })
      })
      return {
        songList,
        date
      }
    }
  }
</script>

<style lang="less" scoped>
  .new-songs {
    padding: 5.2rem 0 3rem;
    .header {
      position: relative;
      width: 100%;
      height: 9rem;
      overflow: hidden;
      .content {
        .sprite {
          position: absolute;
          top: 50%;
          left: 40%;
          transform: translate(-50%, -50%);
          width: 10.375rem;
          height: 6.0625rem;
          background: url("@/assets/img/index_icon_2x.png") no-repeat;
          background-position: -1.5rem -1.875rem;
          background-size: 100% 100%;
          z-index: 1;
          .text {
            position: absolute;
            top: 4.4rem;
            color: #eee;
            font-size: 0.5rem;
          }
        }
      }
      .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .body {
      background-color: #fff;
      overflow: hidden;
      .bar {
        font-size: 0.5rem;
        line-height: 1.3rem;
        padding: 0 0.5rem;
        color: #444;
        background-color: #ddd;
      }
      .list {
        .song {
          @leftWidth: 2rem;
          @rightWidth: 2rem;
          box-sizing: border-box;
          width: 100%;
          height: 3rem;
          padding: 0 @rightWidth 0 @leftWidth;
          overflow: hidden;
          margin-top: 0.3rem;
          .song-detail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            float: left;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border-bottom: 1px solid #999;
            .name {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              padding: 0.3125rem 0 0.2rem;
            }
            .singer {
              color: #888;
              font-size: 0.8rem;
              line-height: 1rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .order {
            position: relative;
            float: left;
            width: @leftWidth;
            margin-left: -@leftWidth;
            left: -100%;
            text-align: center;
            color: #666;
            line-height: 3rem;
          }
          .iconfont {
            position: relative;
            float: left;
            width: @rightWidth;
            margin-left: -@rightWidth;
            right: -@rightWidth;
            text-align: center;
            opacity: 70%;
            line-height: 3rem;
            transform: rotate(180deg);
          }
        }
      }
    }
  }
</style>
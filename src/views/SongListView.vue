<template>
  <div class="song-list">
    <div class="header">
      <div class="back" @click="$router.back()">
        <span class="iconfont icon-houtui"></span>
      </div>
      <div class="content">
        <img class="cover" :src="songList.pic" alt="">
        <div class="text">
          <div class="title">{{songList.name}}</div>
          <div class="tags">{{songList.tags}}</div>
        </div>
      </div>
      <img class="background" :src="songList.pic"/>
    </div>
    <div class="body">
      <div class="bar">歌曲列表</div>
      <ul class="list">
        <li class="song" v-for="(item, index) of songList.songs" :key="item.id">
          <div class="song-detail">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.ar}}-{{item.al}}</div>
          </div>
          <div class="order">{{index+1}}</div>
          <span class="iconfont icon-bofang1"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { reactive } from "vue"
  import { useRoute } from "vue-router" 
  import { requestSongList, requestSongs } from "@/api"
  export default {
    name: "songList",
    setup() {
      const route = useRoute()
      const songListId = route.query.id
      const songList = reactive({
        name: "",
        pic: "",
        playCount: "",
        tags: "",
        songs: []
      })
      requestSongList(songListId).then(response=>{
        const {name, coverImgUrl, playCount, algTags} = response.data.playlist
        Object.assign(songList, {
          name, 
          pic: coverImgUrl, 
          playCount: (playCount/10000).toFixed(1)+"万",
          tags: algTags ? algTags.join("、") : ""
        })
        return requestSongs(songListId)
      }).then(response=>{
        songList.songs = response.data.songs.slice(0, 15).map(item=>{
          return {
            id: item.id,
            name: item.name,
            al: item.al.name,
            ar: item.ar[0].name
          }
        })
        console.log(songList.songs)
      })
      return {
        songList
      }
    }
  }
</script>

<style lang="less" scoped>
  .song-list {
    padding-bottom: 3rem;
    .header {
      position: relative;
      width: 100%;
      height: 10.5rem;
      overflow: hidden;
      .back {
        position: absolute;
        top: 0.5125rem;
        left: 0.5125rem;
        opacity: 80%;
        z-index: 1;
        span {
          font-size: 1rem;
        }
      }
      .content {
        display: flex;
        justify-content: space-around;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        z-index: 1;
        .cover {
          height: 8.5rem;
        }
        .text {
          width: 50%;
          text-align: justify;
          color: #fff;
          padding: 0.4125rem 0;
          .title {
            letter-spacing: 1.5px;
            line-height: 1.3rem;
          }
          .tags {
            color: #eee;
            font-size: 0.5rem;
            line-height: 1.3rem;
          }
        }
      }
      .background {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        filter: blur(30px);
      }
    }
    .body {
      background-color: #fff;
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
          }
        }
      }
      
    }
  }
</style>
<template>
  <div class="search">
    <div class="search-box">
      <div class="back" @click="$router.back()">
        <span class="iconfont icon-houtui1"></span>
      </div>
      <div class="search-bar">
        <span class="iconfont icon-fangdajing"></span>
        <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="searchData.keyWord">
        <span class="del-button iconfont icon-shanchu1-copy" v-show="searchData.keyWord" @click="clearKeyWord"></span>
      </div>
    </div>
    <div class="hot-search">
      <div class="header">热门搜索</div>
      <ul class="list">
        <li class="item" v-for="keyWord of searchData.hotKeyWords" :key="keyWord" @click="setKeyWord(keyWord)">
          {{keyWord}}
        </li>
      </ul>
    </div>
    <div class="search-histroy">
      <ul class="list">
        <li class="item" v-for="keyWord of searchData.searchHistory" :key="keyWord">
          <div class="keyword">{{keyWord}}</div>
          <span class="left iconfont icon-lishijilu_o"></span>
          <span class="right iconfont icon-shanchu2"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { reactive } from "vue"
  import { useRouter } from "vue-router"
  import { requestHotSearch } from "@/api"
  export default {
    name: "SearchView",
    setup(){
      const router = useRouter()
      const searchData = reactive({
        keyWord: "",
        hotKeyWords: [],
        searchHistory: localStorage.getItem("searchHistory") || ["大武山美丽的妈妈","薛之谦"]
      })
      const clearKeyWord = ()=>{
        searchData.keyWord = ""
      }
      const setKeyWord = (keyWord)=>{
        searchData.keyWord = keyWord
      }
      requestHotSearch().then(response=>{
        console.log(response)
        searchData.hotKeyWords = response.data.result.hots.map(item=>item.first)
        console.log(searchData)
      })
      return {
        searchData,
        clearKeyWord,
        setKeyWord,
        router
      }
    }
  }
</script>

<style lang="less" scoped>
  .search {
    background-color: #fff;
    .search-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 4rem;
      padding: 0 0.325rem;
      border-bottom: 0.0625rem solid #ccc;
      .back {
        span {
          font-size: 1.5rem;
        }
      }
      .search-bar {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        flex-grow: 1;
        height: 2.2rem;
        margin: 0 0.3rem;
        padding: 0 0.7rem;
        border-radius: 1.1rem;
        background-color: #eee;
        .iconfont {
          font-size: 1rem;
        }
        input {
          flex-grow: 1;
          line-height: 1.7rem;
          border: none;
          outline: none;
          font-size: 1rem;
          background-color: transparent;
          margin-left: 0.35rem;
          margin-right: 0.6rem;
        }
        .del-button {
          width: 1.2rem;
          height: 1.2rem;
          line-height: 1.2rem;
          text-align: center;
          font-size: 0.5rem;
          border-radius: 50%;
          background-color: #999;
        }
      }
    }
    .hot-search {
      padding: 0 1.1rem;
      .header {
        height: 3.5rem;
        color: #666;
        line-height: 3.5rem;
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        .item {
          height: 1rem;
          border: 1px solid #ccc;
          border-radius: 1rem;
          color: #333;
          font-size: 0.9rem;
          padding: 0.5rem 0.625rem;
          margin-right: 0.6rem;
          margin-bottom: 1rem;
        }
      }
    }
    .search-histroy {
      padding: 0 0.6rem;
      .list {
        .item {
          @leftWidth: 2rem;
          @rightWidth: 2rem;
          box-sizing: border-box;
          width: 100%;
          height: 2.5rem;
          padding: 0 @rightWidth 0 @leftWidth;
          overflow: hidden;
          margin-top: 0.2rem;
          .keyword {
            display: flex;
            flex-direction: column;
            justify-content: center;
            float: left;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            color: #333;
            border-bottom: 1px solid #ccc;
          }
          .left {
            position: relative;
            float: left;
            width: @leftWidth;
            margin-left: -@leftWidth;
            left: -100%;
            text-align: center;
            color: #666;
            font-size: 1.3rem;
            line-height: 2.5rem;
          }
          .right {
            position: relative;
            float: left;
            width: @rightWidth;
            margin-left: -@rightWidth;
            right: -@rightWidth;
            text-align: center;
            opacity: 70%;
            font-size: 1rem;
            line-height: 2.5rem;
          }
        }
      }
    }
  }
</style>
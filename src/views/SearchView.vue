<template>
  <div class="search">
    <div class="search-box">
      <div class="back" @click="$router.back()">
        <span class="iconfont icon-houtui1"></span>
      </div>
      <div class="search-bar">
        <span class="iconfont icon-fangdajing"></span>
        <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="searchData.keyword" @focus="searchData.searchResult=[]">
        <span class="del-button iconfont icon-shanchu1-copy" v-show="searchData.keyword" @click="clearKeyword" ></span>
      </div>
    </div>
    <div class="default-suggestion" v-show="!searchData.keyword">
      <div class="hot-search">
        <div class="header">热门搜索</div>
        <ul class="list">
          <li class="item" v-for="keyword of searchData.hotkeywords" :key="keyword" @click="searchData.keyword=keyword">
            {{keyword}}
          </li>
        </ul>
      </div>
      <div class="search-histroy">
        <ul class="list">
          <li class="item" v-for="keyword of searchData.searchHistory" :key="keyword" @click="searchData.keyword=keyword">
            <div class="keyword">{{keyword}}</div>
            <span class="left iconfont icon-lishijilu_o"></span>
            <span class="right iconfont icon-shanchu2"></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="search-suggestion" v-show="searchData.keyword && !searchData.searchResult.length">
      <div class="confirm" @click="doSearch(searchData.keyword)">
        <span class="text">搜索"{{searchData.keyword}}"</span>
      </div>
      <ul class="list">
        <li class="item" v-for="keyword of searchData.searchSuggestion" :key="keyword" @click="doSearch(keyword)">
          <span class="text">{{keyword}}</span>
          <span class="iconfont icon-fangdajing"></span>
        </li>
      </ul>
    </div>
    <div class="search-result" v-show="searchData.searchResult.length">
      <ul class="list">
        <li class="item" v-for="item of searchData.searchResult" :key="item.id">
          <div class="left">
            <div class="name" v-html="item.name"></div>
            <div class="singer" v-html="item.ar+item.al"></div>
          </div>
          <span class="right iconfont icon-bofang1"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { reactive, watch } from "vue"
  import { useRouter } from "vue-router"
  import { requestHotSearch, requestSearchSuggestion, requestSearchResult } from "@/api"
  export default {
    name: "SearchView",
    setup(){
      const router = useRouter()
      const searchData = reactive({
        keyword: "",
        hotkeywords: [],
        searchHistory: localStorage.getItem("searchHistory") || ["大武山美丽的妈妈","薛之谦"],
        searchSuggestion: [],
        searchResult: []
      })
      const clearKeyword = ()=>{
        searchData.keyword = ""
        searchData.searchResult = []
      }
      requestHotSearch().then(response=>{
        searchData.hotkeywords = response.data.result.hots.map(item=>item.first)
      })
      watch(()=>searchData.keyword, (val)=>{
        if (val) requestSearchSuggestion(val).then(response=>{
          searchData.searchSuggestion = response.data.result.allMatch.map(item=>{
            return item.keyword
          })
        }).catch(()=>searchData.searchSuggestion = [])
      })
      const highLightKeyWord = (str, keywords, color)=>{
        keywords.split(" ").forEach(keyword=>{
          str = str.replaceAll(keyword, `<span style="color:${color}">${keyword}</span>`)
        })
        return str
      }
      const doSearch = (keyword, limit=20, offset=0)=>{
        searchData.keyword = keyword
        console.log(keyword)
        requestSearchResult(keyword, limit, offset).then(response=>{
          console.log(response)
          searchData.searchResult = response.data.result.songs.map(item=>{
            return {
              id: item.id,
              name: highLightKeyWord(item.name, keyword, "red") ,
              al: highLightKeyWord(item.al.name, keyword, "red"),
              ar: highLightKeyWord(item.ar[0].name, keyword, "red")
            }
          })
        }).catch(()=>alert("网络错误"))
      }
      return {
        searchData,
        clearKeyword,
        doSearch,
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
    .default-suggestion {
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
    .search-suggestion {
      .confirm {
        height: 2.5rem;
        line-height: 2.5rem;
        color: #0078af;
        padding: 0 0.7rem;
        border-bottom: 1px solid #ccc;
      }
      .list {
        margin-right: 1rem;
        .item {
          @leftWidth: 2rem;
          padding-left: @leftWidth;
          margin-top: 0.5rem;
          overflow: hidden;
          .iconfont {
            position: relative;
            left: -100%;
            float: left;
            width: @leftWidth;
            line-height: 2rem;
            text-align: center;
            margin-left: -@leftWidth;
          }
          .text {
            box-sizing: border-box;
            float: left;
            width: 100%;
            border-bottom: 1px solid #ccc;
            padding: 0.5rem 0;
          }
        }
      }
    }
    .search-result {
      .list {
        padding: 0 0.75rem;
        .item {
          height: 3rem;
          overflow: hidden;
          border-bottom: 1px solid #ccc;
          .left {
            float: left;
            margin-left: 0.5rem;
            margin-top: 0.5rem;
            .name {
              margin-bottom: 0.3rem;
            }
            .singer {
              color: #666;
              font-size: 0.8rem;
            }
          }
          .right {
            float: right;
            font-size: 1.5rem;
            line-height: 3rem;
            opacity: 60%;
          }
        }
      }
    }
  }
</style>
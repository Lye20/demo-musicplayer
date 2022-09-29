import {createStore} from "vuex"
import {requestPlayList, requestPlayListSongs, checkSong, requestSong, requestLyric} from "@/api"

const store = createStore({
  state: {
    playListId: localStorage.getItem('playListId') || "",
    playListName: localStorage.getItem('playListName') || "",
    playListPic: localStorage.getItem('playListPic') || "",
    playListSongs: JSON.parse(localStorage.getItem("playListSongs")) || [],
    playingIndex: localStorage.getItem('playingIndex') || 0,
    songName: "",
    songPic: "",
    songUrl: "",
    lyric: []
  },
  actions: {
    getPlayListSongs(context, id) {
      const playListData = {id}
      requestPlayList(id).then(response=>{
        Object.assign(playListData, {
          name: response.data.playlist.name,
          pic: response.data.playlist.coverImgUrl
        })
        return requestPlayListSongs(id)
      }).then(response=>{
        const songs = response.data.songs
        Object.assign(playListData, {songs})
      }).then(()=>{
        context.commit('setPlayList', playListData)
        context.dispatch("getSong", 1)
      }).catch(()=>alert("空歌单"))
    },
    getSong(context, index) {
      const songId = context.state.playListSongs[index].id
      const playingSongData = {
        name: context.state.playListSongs[index].al.name,
        pic: context.state.playListSongs[index].al.picUrl
      }
      checkSong(songId).then(response=>{
        if (response.data.success) return requestSong(songId)
        else return Promise.reject(response.data.message)
      }).then(response=>{
        const url = response.data.data[0].url
        Object.assign(playingSongData, {url})
        return requestLyric(songId)
      }).then(response=>{
        const rawLyric = response.data.lrc.lyric.split("\n")
        const lyric = []
        rawLyric.forEach(item=>{
          const ins = /\[(?<timeStamp>.+?)\](?<text>.+)/.exec(item)
          if (ins) lyric.push(ins.groups) 
        })
        Object.assign(playingSongData, {lyric})
      }).then(()=>{
        context.commit("setPlayingSong", playingSongData)
      }).catch(err=>alert(err))
    },
  },
  mutations: {
    setPlayList(state, {id, name, pic, songs}) {
      state.playListId = id
      state.playListName = name
      state.playListPic = pic
      state.playListSongs = songs
    },
    setPlayingSong(state, {name, pic, url, lyric}) {
      state.songName = name
      state.songPic = pic
      state.songUrl = url
      state.lyric = lyric
      localStorage.setItem("playListName", state.playListName)
      localStorage.setItem("playListSongs", JSON.stringify(state.playListSongs))
      localStorage.setItem('playingIndex', state.playingIndex)
    },
  }
})

export default store
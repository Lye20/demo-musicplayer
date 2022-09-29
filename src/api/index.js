import request from "./request"

export const requestSwiper = (type)=>{
  return request({
    url: "/banner",
    methods: "GET",
    params: {type}
  })
}

export const requestRecommendSongLists = ()=>{
  return request({
    url: "/personalized",
    methods: "GET",
  })
}

export const requestSongList = (id)=>{
  return request({
    url: "/playlist/detail",
    methods: "GET",
    params: {id}
  })
}

export const requestSongs = (id)=>{
  return request({
    url: "/playlist/track/all",
    methods: "GET",
    params: {id}
  })
}

export const requestNewSongs = ()=>{
  return request({
    url: "/top/song",
    methods: "GET"
  })
}

export const requestHotSearch = ()=>{
  return request({
    url: "/search/hot",
    methods: "GET"
  })
}

export const requestSearchSuggestion = (keywords)=>{
  return request({
    url: "/search/suggest",
    methods: "GET",
    params: {
      keywords,
      type: "mobile"
    }
  })
}

export const requestSearchResult = (keywords, limit, offset)=>{
  return request({
    url: "/search",
    methods: "GET",
    params: {keywords, limit, offset}
  })
}
// export const checkSong = (id)=>{
//   return request({
//     url: "/check/music",
//     methods: "GET",
//     params: {id}
//   })
// }
// export const requestSong = (id)=>{
//   return request({
//     url: "/song/url",
//     methods: "GET",
//     params: {id}
//   })
// }

// export const requestLyric = (id)=>{
//   return request({
//     url: "/lyric",
//     methods: "GET",
//     params: {id}
//   })
// }
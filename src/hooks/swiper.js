import { watch } from "vue"
import { requestSwiper } from "@/api" 
export default (swiper, delay, speed) => {
  let swiperWidth = 0
  let swiperTimer = 0
  let touchX0 = 0, touchX1 = 0
  swiper.current = 0
  swiper.items = []
  
  requestSwiper(2).then(response=>{
    const data = response.data.banners
    swiper.items = data.map(item=>({id: item.encodeId, pic: item.pic}))
    initSwiper()
    window.addEventListener("resize", initSwiper)
  }).catch(err=>console.log(err))
  
  const initSwiper = ()=>{
    swiperWidth = parseFloat(getComputedStyle(swiper.el)["width"])
    swiper.wrapper.style.width = swiperWidth * (swiper.items.length+2) + "px"
    swiper.wrapper.style.setProperty("--speed", speed/1000+"s")
    watch(()=>swiper.current, ()=>{
      swiper.wrapper.style.setProperty("--offset", `-${swiper.current*swiperWidth}px`)
    }, {immediate: true})
    runSwiper()
  }
  
  const moveSwiper = (index)=>{
    if (index === swiper.items.length+1) {
      swiper.wrapper.style.transition = "none"
      swiper.current = 0
      setTimeout(()=>{
        swiper.wrapper.style.transition = ""
        swiper.current++
      }, 10)
    } else if (index === -1) {
      swiper.wrapper.style.transition = "none"
      swiper.current = swiper.items.length
      setTimeout(()=>{
        swiper.wrapper.style.transition = ""
        swiper.current--
      }, 10)
    }
    else swiper.current = index
  }
  
  const runSwiper = ()=>{
    clearInterval(swiperTimer)
    swiperTimer = setInterval(()=>{
      moveSwiper(swiper.current+1)
    }, delay)
  }

  const pauseSwiper = ()=>{
    clearInterval(swiperTimer)
  }
  
  const touchs = (event)=>{
    pauseSwiper()
    touchX0 = event.touches[0].pageX
  }
  
  const touchm = (event)=>{
    const offset = event.touches[0].pageX - touchX0
    swiper.wrapper.style.setProperty("--offset", `-${swiper.current*swiperWidth-offset}px`)
  }
  
  const touche = (event)=>{
    const valve = 100
    touchX1 = event.changedTouches[0].pageX
    const dis = touchX1 - touchX0
    if (dis > valve) swiper.move(swiper.current-1)
    else if (dis < -valve) swiper.move(swiper.current+1)
    else swiper.wrapper.style.setProperty("--offset", `-${swiper.current*swiperWidth}px`)
    runSwiper()
  }
  Object.assign(swiper, {
    init: initSwiper,
    move: moveSwiper,
    run: runSwiper,
    pause: pauseSwiper,
    touchs: touchs,
    touchm: touchm,
    touche: touche
  })
}
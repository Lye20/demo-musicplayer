const setRem = ()=>{
  const baseSize = 16
  const deviceWidth = window.screen.width || document.documentElement.clientWidth || 375
  const width = deviceWidth < 300 ? 300 : deviceWidth
  const scale = Math.min(width/375, 2)
  document.documentElement.style.width = width + "px"
  document.documentElement.style.fontSize = baseSize * scale + "px"
}

setRem()
window.addEventListener("resize", ()=>{
  setRem()
})
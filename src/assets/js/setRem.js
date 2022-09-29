const setRem = ()=>{
  const baseSize = 16
  const deviceWidth = document.documentElement.clientWidth || window.screen.width || 375
  const width = deviceWidth < 300 ? 300 : deviceWidth
  const scale = Math.min(width/375, 2)
  document.documentElement.style.width = width + "px"
  document.documentElement.style.fontSize = baseSize * scale + "px"
}

setRem()
window.addEventListener("resize", ()=>{
  setRem()
})
import axios from "axios"
import Cookies from "js-cookie"

const defaultConfig = {
  baseURL: process.env.NODE_ENV === "production" ? "": "http://localhost:3000",
  timeout: 3000
}

function wrapper(instance) {
  instance.interceptors.request.use(config=>{
    const token = Cookies.get("token")
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })
  instance.interceptors.response.use(response=>{
    return response
  })
  return instance
}

export default function request(config){
  const ins = axios.create()
  wrapper(ins)
  return ins({...defaultConfig, ...config})
}
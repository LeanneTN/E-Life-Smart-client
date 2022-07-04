//对于axios二次封装
import axios from "axios";
//引入进度条(start代表进度条开始，done方法代表进度条结束)
import nprogress from "nprogress";
//引入进度条的样式
import 'nprogress/nprogress.css'

axios.defaults.withCredentials = true;

//用于访问外部的接口
const externalAPI = axios.create({
  //基础路径，发送请求的时候，路径中会出现api
  baseURL:'/external',
  //代表请求超时的时间
  timeout:5000
})

//请求拦截器，在发请求之前，请求拦截器可以检测到，可以在请求发送出去之前做一些事情
externalAPI.interceptors.request.use((config)=>{
  //进度条开始
  nprogress.start()
  //config：配置对象，其中有一个属性很重要，即headers请求头
  return config
})

//响应拦截器
externalAPI.interceptors.response.use((res)=>{
  //进度条结束
  nprogress.done()
  //请求成功的回调函数。服务器相应数据回来以后，响应拦截器可以检测到
  return res.data
},(error)=>{
  //响应失败
  return Promise.reject(new Error('failed'))
})

//对外暴露
export default externalAPI
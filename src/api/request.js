//对于axios二次封装
import axios from "axios";
//引入进度条(start代表进度条开始，done方法代表进度条结束)
import nprogress from "nprogress";
//引入进度条的样式
import 'nprogress/nprogress.css'

axios.defaults.withCredentials = true;

//利用axios对象的create方法，创建axios实例
//request就是axios，只不过稍微配置一下
const requests = axios.create({
  //基础路径，发送请求的时候，路径中会出现api
  baseURL:'/api',
  //代表请求超时的时间
  timeout:5000
})

//请求拦截器，在发请求之前，请求拦截器可以检测到，可以在请求发送出去之前做一些事情
requests.interceptors.request.use((config)=>{
  //进度条开始
  nprogress.start()
  //config：配置对象，其中有一个属性很重要，即headers请求头
  return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
  //进度条结束
  nprogress.done()
  //请求成功的回调函数。服务器相应数据回来以后，响应拦截器可以检测到
  return res.data
},(error)=>{
  //响应失败
  return Promise.reject(new Error('failed'))
})

//对外暴露
export default requests
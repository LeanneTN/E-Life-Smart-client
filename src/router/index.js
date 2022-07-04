//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用插件
Vue.use(VueRouter);

//引入路由组件
import Home from '@/pages/home/Home'
import Main from '@/pages/home/Main'

import Login from '@/pages/account/Login';
import Register from '@/pages/account/Register';

//配置路由
export default new VueRouter({
  routes:[
    {
      path:'/home',
      component:Home,
      name: 'home',
    },
    {
      path:'/main',
      component:Main,
      name: 'main',
    },
    {
      path:'/login',
      component:Login,
      name:'login'
    },
    {
      path:'/register',
      component:Register,
      name:'register',
    },
    //重定向，在项目跑起来的时候，访问/，立即重定向到主页
    {
      path:'*',
      redirect:'/home',
    }
  ]
})
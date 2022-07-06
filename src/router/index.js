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
import AccountInfo from '@/pages/account/AccountInfo';

import Forum from '@/pages/community/Forum';
import Post from '@/pages/community/Post';

import Order from '@/pages/payment/Order';
import Payment from '@/pages/payment/Payment';

import Repair from '@/pages/repair/Repair';

import CarManagement from '@/pages/other/CarManagement';
import HealthCheck from '@/pages/other/HealthCheck';
import Volunteer from '@/pages/other/Volunteer';

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
    {
      path:'/user/accountInf',
      component:AccountInfo,
      name:'accountInf'
    },

    {
      path:'/community/forum',
      component:Forum,
      name:'forum',
    },
    {
      path:'/community/post/:id',
      component:Post,
      name:'post',
    },

    {
      path:'/payment/order',
      component:Order,
      name:'order',
    },
    {
      path:'/payment',
      component:Payment,
      name:'payment',
    },

    {
      path:'/Repair/apply',
      component:Repair,
      name:'repair',
    },


    {
      path:'/carManagement',
      component:CarManagement,
      name:'carManagement',
    },
    {
      path:'/healthCheck',
      component:HealthCheck,
      name:'healthCheck',
    },
    {
      path:'/volunteer',
      component:Volunteer,
      name:'volunteer',
    },

    //重定向，在项目跑起来的时候，访问/，立即重定向到主页
    {
      path:'*',
      redirect:'/home',
    }
  ]
})
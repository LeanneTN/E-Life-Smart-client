import Vue from 'vue'
import App from './App.vue'

import UIComponents from '@/utils/UIComponents'

//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'

Vue.config.productionTip = false

UIComponents.init();

new Vue({
  render: h => h(App),
  //注册路由，组件身上会多$route和$router属性
  router,
  //注册仓库，组件实例身上会多一个$store属性
  store
}).$mount('#app')

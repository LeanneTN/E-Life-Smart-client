import Vue from 'vue'
import App from './App.vue'

//引入buefy组件库
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

//引入element-ui组件
import { Avatar, Badge, Button, Image, Dialog, Tabs, TabPane} from 'element-ui'

//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'

Vue.config.productionTip = false

Vue.use(Buefy);

Vue.use(Avatar);
Vue.use(Badge);
Vue.use(Button);
Vue.use(Image);
Vue.use(Dialog);
Vue.use(Tabs);
Vue.use(TabPane);


//日期格式化
Date.prototype.format = function(fmt) { 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S" : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt; 
}

new Vue({
  render: h => h(App),
  //注册路由，组件身上会多$route和$router属性
  router,
  //注册仓库，组件实例身上会多一个$store属性
  store
}).$mount('#app')

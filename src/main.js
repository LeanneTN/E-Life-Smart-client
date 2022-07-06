import Vue from 'vue'
import App from './App.vue'

//引入buefy组件库
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

//引入element-ui组件
import { Avatar, Badge, Button, Image, Dialog, DatePicker, Form, Input, FormItem, Checkbox, CheckboxGroup, Option, Col, Select} from 'element-ui'

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
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Option);
Vue.use(Col);
Vue.use(Select);

new Vue({
  render: h => h(App),
  //注册路由，组件身上会多$route和$router属性
  router,
  //注册仓库，组件实例身上会多一个$store属性
  store
}).$mount('#app')

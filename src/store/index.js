import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//引入小仓库
import forum from './forum'
import account from './account';

//对外暴露Store类的一个实例
export default new Vuex.Store({
  //实现Vuex仓库模块式开发存储数据
  modules:{
    forum,
    account,
  }
});
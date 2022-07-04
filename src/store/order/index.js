import { reqOrderList } from "@/api";

const state = {
  orderList: [],
};

const actions = {
  //通过API中的接口函数调用，向服务器发请求，获取数据
  async orderList({commit}){
    let result = await reqOrderList();
    if(result.status == 0){
      commit('ORDERLIST',result.data)
    }
  },
};

const mutations = {
  ORDERLIST(state,orderList){
    state.orderList = orderList
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}
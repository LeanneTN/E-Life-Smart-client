import { reqCategoryList, reqProductListById} from "@/api";

const state = {
  categoryList: [],
  productList: [],
};

const actions = {
  //通过API中的接口函数调用，向服务器发请求，获取数据
  async categoryList({commit}){
    let result = await reqCategoryList();
    if(result.status == 0){
      commit('CATEGORYLIST',result.data)
    }
  },

  //通过API中的接口函数调用，向服务器发请求，获取数据
  async productList(context, categoryId){
    let result = await reqProductListById(categoryId);
    if(result.status == 0){
      context.commit('PRODUCTLIST',result.data)
    }
  },
};

const mutations = {
  CATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  },
  PRODUCTLIST(state,productList){
    state.productList = productList;
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}
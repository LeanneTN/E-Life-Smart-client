import { reqLoginAccount } from "@/api";

//home模块的小store
const state = {
  loginAccount: null,
  token: '',
};

const mutations = {
  LOGINACCOUNT(state, loginAccount){
    state.loginAccount = loginAccount;
  },
  TOKEN(state, token){
    state.token = token;
  }
};

const actions = {
  //获取token
  token(context, token){
    context.commit('TOKEN', token);
  },

  //向服务器请求已登录的账号
  async loginAccount(context, token){
    let res = await reqLoginAccount(token);
    if(res.code == 200){
      context.commit('LOGINACCOUNT',res.data);
    }
  },

  //更改账号信息
  changeAccountInf(context, loginAccount){
    context.commit('LOGINACCOUNT', loginAccount)
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}
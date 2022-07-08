import {  reqGetAllTopic } from "@/api";

//home模块的小store
const state = {
  allTopics: [],
};

const mutations = {
  ALLTOPICS(state, allTopics){
    state.allTopics = allTopics;
  },
};

const actions = {
  //向服务器请求所有的topic
  async allTopics(context, token){
    let res = await reqGetAllTopic(token);
    if(res.code == 200){
      context.commit('ALLTOPICS',res.data);
    }
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}
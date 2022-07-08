import { reqGetAllTopic } from "@/api";
import _util from "@/utils/util";

//home模块的小store
const state = {
  allTopics: [],
  topicList: [],  //进行热度排序的话题
  topicTime: [],  //进行时间排序的话题
};

const mutations = {
  ALLTOPICS(state, allTopics){
    state.allTopics = allTopics;
  },
  TOPICLIST(state){
    let temp = [];
    console.log('我被调用了');
    for(let topic of state.allTopics)
      temp.push(_util.copy(topic))
    //state.topicList = state.allTopics.sort((a,b)=>{ return b.response-a.response})
    state.topicList = temp.sort((a,b)=>{ return b.response-a.response})
    // this.allTopics = temp;
  },
  TOPICTIME(state){
    let temp = [];
    for(let topic of state.allTopics)
      temp.push(_util.copy(topic))
    // state.topicTime = state.allTopics.sort((a,b)=>{ 
    //   return new Date(b.lastReplyTime).getTime() > new Date(a.lastReplyTime).getTime() ? 1 : -1})
     state.topicTime = temp.sort((a,b)=>{ 
       return new Date(b.lastReplyTime).getTime() > new Date(a.lastReplyTime).getTime() ? 1 : -1})

    //this.allTopics = temp;
  }
};

const actions = {
  //向服务器请求所有的topic
  async allTopics(context, token){
    let res = await reqGetAllTopic(token);
    if(res.code == 200){
      context.commit('ALLTOPICS',res.data);
    }
  },
  topicList(context){
    console.log('我被调用了2')
    context.commit('TOPICLIST');
  },
  topicTime(context){
    context.commit('TOPICTIME');
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}
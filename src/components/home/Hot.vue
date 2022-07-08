<template>
  <div class="hot">
    <h6>热门话题</h6>
    <hr class="dropdown-divider" aria-role="menuitem">
    <div @click="goTopic(topic)" v-for="topic,i in topicList" :key="i" >
      <div class="columns">
        <div class="line column is-1">{{i+1}}、</div>
        <div class="line column is-9">{{topic.title}}</div>
        <div class="line column is-2">{{topic.response}}</div>
      </div>

      <hr class="dropdown-divider" aria-role="menuitem">
    </div>
      
  </div>
</template>

<script>
export default {
  name:'Hot',
  methods: {
    goTopic(){
      //进行路由跳转到话题页面
    }
  },
  props: {
    topicList: [],
    
  }
  
}
</script>

<style scoped lang='less'>
  .hot {
    border-radius: 4px;
    background: #f5f5f5;
    padding: 2%;
    margin-top: 3%;
    h6{
      font-size: 14px;
    }
    .line{
      font-size: 14px;
      padding-bottom: 0px;
    }
    .columns:hover{
      cursor: pointer;
    }
  }
</style>
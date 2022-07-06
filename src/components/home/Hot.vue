<template>
  <div class="hot">
    <h6>热门话题</h6>
    <hr class="dropdown-divider" aria-role="menuitem">
    <div v-for="topic,i in hotTopics" :key="i">
      {{i}}{{topic.title}}
      {{topic.time}}{{topic.views}}{{topic.response}}
    </div>
      
  </div>
</template>

<script>
export default {
  name:'Hot',
  mounted() {
    //获取热门话题
    this.hotTopics = [
      {
        title: '前端测试',
        time: new Date().format("yyyy-MM-dd"),
        views: '2.5k',
        response: 123
      },

    ]
  },
  data() {
    return {
      hotTopics: []
    }
  },
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
  }
</style>
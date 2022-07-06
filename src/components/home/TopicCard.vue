<template>
  <div class="topic-card">
    <div class="columns">
      <div class="column is-two-fifths inner-box-img">
          <el-image
          class="topic-img"
          style="width: 192px; height: 120px; border-radius: 2px"
          :src="topicData.img"
          fit="cover"></el-image>
      </div>

      <div class="column inner-box-info">
        <div class="title-content">
          <h6 class="title">{{topicData.title}}</h6>
          <h6 class="content">{{topicData.content}}</h6>
        </div>
        <div class="icons columns">
            <div class="column">{{topicData.lastReplyTime.format("yyyy-MM-dd")}}</div>
            <div class="column">{{topicData.lastReplyUser.userName}}</div>
            <div class="column">{{topicData.response}}</div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
export default {
  name:'TopicCard',
  props: {
    topicData:{
      img: '',
      title: '',
      content: '',
      response: 0,
      lastReplyTime: {},
      lastReplyUser: {},
    },
  }
}
</script>

<style scoped lang='less'>
  .topic-card{
    background: #f5f5f5;
    border-radius: 4px;
    margin-top: 4%;
    .inner-box-img{
      padding: 1%;
      padding-bottom: 0%;
      padding-left: 3%;
    }
    .inner-box-info {
      padding: 1%;
      padding-top: 2%;
      .title-content{
        height: 90px;
        .title {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 4%;
        }
        .content {
          font-size: 13px;
        }
      }

      .icons{
        font-size: 13px;
      }
    }
  }
</style>
<template>
  <div class="topic-card">
    <div class="columns">
      <div class="column is-two-fifths inner-box-img">
          <el-image
          class="topic-img"
          style="width: 192px; height: 120px; border-radius: 2px"
          :src="topicData.img"
          :fit="cover"></el-image>
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
Date.prototype.format = function(fmt) { 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S" : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt; 
}

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
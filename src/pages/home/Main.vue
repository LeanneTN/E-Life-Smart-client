<template>
  <div class="columns">
    <div class="column1">
      <div class="account-info">
        <div class="avatar" @click="changeAvatar"> 
          <el-avatar :size="80" :src="circleUrl"></el-avatar>
        </div>
        <h6>{{loginAccount.userName}}</h6>
        <div>
          <a href="#">个人信息</a>
          &nbsp;
          <b>|</b>
          &nbsp;
          <a href="#">退出登录</a>
        </div>
      </div>
      <div class="quick-link">
        快捷功能
      </div>
    </div>
    <div class="column2">
      <section>
        <b-carousel
            :indicator="indicator"
            :indicator-background="indicatorBackground"
            :indicator-inside="indicatorInside"
            :indicator-mode="indicatorMode"
            :indicator-position="indicatorPosition"
            :indicator-style="indicatorStyle">
            <b-carousel-item v-for="(imgPath, i) in imgsPath" :key="i">
                <section>
                  <img class="news" :src="imgPath">
                </section>
            </b-carousel-item>
        </b-carousel>
      </section>
      
      <TopicCard :topicData="topicData"/>
      
    </div>
    <div class="column3">
      <Autocomplete/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Autocomplete from '@/components/home/Autocomplete.vue'
import TopicCard from '@/components/home/TopicCard.vue'
export default {
  name:'Main',
  components: {
    Autocomplete,
    TopicCard
  },
  data () {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"],
      imgsPath: [
        require(''+'@/assets/images/home/1.png'+''),
        require(''+'@/assets/images/home/2.png'+''),
        require(''+'@/assets/images/home/3.png'+''),
        require(''+'@/assets/images/home/4.png'+''),
      ],
      topicData:{
        img: require(''+'@/assets/images/home/1.png'+''),
        title: '这是标题',
        content: '这是内容',
        response: 999,
        lastReplyTime: new Date(),
        lastReplyUser: {
          userName: '张三',
        },
      },
    }
  },
  computed:{
    ...mapState({
      //注入state参数
      loginAccount: state=>state.account.loginAccount,
      token: state=>state.account.token,
    })
  },
  methods: {
    changeAvatar(){
      console.log('修改头像')
    },
  },
}
</script>

<style scoped lang='less'>



  .columns{
    background: #E6E6E6;
    margin-bottom: 0;
    padding-top: 3%;
    padding-bottom: 3%;

    .column1{
      width: 25%;
      padding-left: 6%;
      text-align: center;
      .account-info {
        padding: 6%;
        background: #f5f5f5;
        border-radius: 4px;
        font-size: 14px;
        .avatar :hover {
          cursor: pointer;
        }
      }

      .quick-link{
        margin-top: 6%;
        padding: 6%;
        background: #f5f5f5;
        border-radius: 4px;
        font-size: 14px;
      }
    }

    .column2{
      width: 45%;
      padding-left: 2%;
      padding-right: 2%;
      .news{
        border-radius: 8px;
      }
    }

    .column3{
      width: 30%;
      padding-right: 6%;
    }
  }
</style>
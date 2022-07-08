<template>
  <div class="columns">
    <div class="column1">
      <div class="account-info">
        <div class="avatar" @click="goPage('accountInfo')"> 
          <el-avatar :size="80" :src="circleUrl"></el-avatar>
        </div>
        <h6>{{loginAccount ? loginAccount.userName : '***'}}</h6>
        <div>
          <router-link class="link" :to="{name: 'accountInfo'}">
            个人中心
          </router-link>
          &nbsp;
          <b>|</b>
          &nbsp;
          <a href="#" @click="logout">退出登录</a>
        </div>
      </div>
      <QuickLink/>
    </div>
    <div class="column2">
      <section>
        <b-carousel>
            <b-carousel-item v-for="(imgPath, i) in imgsPath" :key="i">
                <section>
                  <img class="news" :src="imgPath">
                </section>
            </b-carousel-item>
        </b-carousel>
      </section>
      
      <hr class="dropdown-divider" aria-role="menuitem">

      <div class="recommend">
        推荐话题：
        <el-button 
        @click="getRecommend"
        class="refresh" 
        size="small" 
        icon="el-icon-refresh-right">换一组</el-button>
      </div>

      <TopicCard v-for="topic,index in recommendTopics" :key="index" :topicData="topic"/>
      
    </div>
    <div class="column3">
      <Autocomplete/>
      <Hot :topicList="topicList.slice(0,5)"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Autocomplete from '@/components/home/Autocomplete.vue'
import TopicCard from '@/components/home/TopicCard.vue'
import Hot from '@/components/home/Hot.vue'
import QuickLink from '@/components/home/QuickLink.vue'
import _util from "@/utils/util";
export default {
  name:'Main',
  components: {
    Autocomplete,
    TopicCard,
    Hot,
    QuickLink,
  },
  async mounted() {
    //获取所有的新闻信息
    await this.$store.dispatch('allTopics', this.token);
    this.$store.dispatch('topicList');
    this.randomScramble();
    this.getRecommend();
  },
  data () {
    return {
      allTopicsCopy: [],
      recommendTopics: [],
      currentIndex: 0,

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
        lastReplyUser: '张三',
      },
    }
  },
  computed:{
    ...mapState({
      //注入state参数
      loginAccount: state=>state.account.loginAccount,
      token: state=>state.account.token,
      allTopics: state=>state.forum.allTopics,
      topicList: state=>state.forum.topicList,
    })
  },
  methods: {
    //进行页面跳转的函数
    goPage(page){
      this.$router.push({name: page});
    },
    //下线
    async logout(){
        console.log('准备下线');
        console.log(this.token);
      let res = await reqSignOut();
      this.$store.dispatch('loginAccount', this.token);
      if(res.status == 200){
        //跳往主页
        this.$router.push({name:'home'});
      }else{
        //跳往登录界面
        this.$router.push({name:'login'});
      }
    },

    //随机打乱allTopics
    randomScramble(){
      for(let topic of this.allTopics)
        this.allTopicsCopy.push(_util.copy(topic))
      for(let i = 0;i < this.allTopicsCopy.length;i++){
        let randomIndex = Math.floor(Math.random()*this.allTopicsCopy.length);
        let temp = this.allTopicsCopy[i];
        this.allTopicsCopy[i] = this.allTopicsCopy[randomIndex];
        this.allTopicsCopy[randomIndex] = temp;
      }
    },

    //获取5个topic展示到推荐里
    getRecommend(){
      this.recommendTopics = [];
      let count = 0;
      while(count < 5 && this.allTopicsCopy != 0){
        this.recommendTopics.push(this.allTopicsCopy[this.currentIndex++]);
        if(this.currentIndex == this.allTopicsCopy.length)
          this.currentIndex = 0;
        count++;
      }
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
    }

    .column2{
      width: 45%;
      padding-left: 2%;
      padding-right: 2%;
      .news{
        border-radius: 8px;
      }
      .recommend{
        padding-bottom: 8px;
        .refresh{
          float: right;
        }
      }
    }

    .column3{
      width: 30%;
      padding-right: 6%;
    }
  }
</style>
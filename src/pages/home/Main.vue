<template>
  <div class="columns">
    <div class="column1">
      <div class="account-info">
        <div class="avatar" @click="goPage('accountInfo')"> 
          <el-avatar :size="80" :src="circleUrl"></el-avatar>
        </div>
        <h6>{{loginAccount.userName}}</h6>
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
      
      <TopicCard :topicData="topicData"/>
      
    </div>
    <div class="column3">
      <Autocomplete/>
      <Hot/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Autocomplete from '@/components/home/Autocomplete.vue'
import TopicCard from '@/components/home/TopicCard.vue'
import Hot from '@/components/home/Hot.vue'
import QuickLink from '@/components/home/QuickLink.vue'
export default {
  name:'Main',
  components: {
    Autocomplete,
    TopicCard,
    Hot,
    QuickLink,
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
    }
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
    }

    .column3{
      width: 30%;
      padding-right: 6%;
    }
  }
</style>
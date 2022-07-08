<template>
  <div class="columns forum">
    <div class="column is-two-thirds">
      <el-button size="small" type="primary">按时间排序</el-button>
      <el-button size="small" type="primary">按热度排序</el-button>
      <el-button @click="dialogVisible=true" size="small" type="primary" icon="el-icon-plus">创建</el-button>

      <el-dialog
        title="创建话题"
        :visible.sync="dialogVisible"
        width="30%">

        <el-form label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="workingTopic.title"></el-input>
          </el-form-item>

          <el-form-item label="封面">
            <el-input v-model="workingTopic.img"></el-input>
          </el-form-item>

          <el-form-item label="内容">
            <el-input type="textarea" v-model="workingTopic.content"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="createTopic">创 建</el-button>
        </span>
      </el-dialog>

      <TopicCard :topicData="topicData"/>
      <TopicCard v-for="topic in topicList" :key="topic.id" :topicData="topic"/>


    </div>
    <div class="column">
      <Autocomplete/>
      <Hot/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Autocomplete from '@/components/home/Autocomplete.vue';
import TopicCard from '@/components/home/TopicCard.vue';
import Hot from '@/components/home/Hot.vue';
import { reqCreateTopic, reqGetAllTopic } from '@/api/index';

export default {
  name:'Forum',
  components: {
    Autocomplete,
    TopicCard,
    Hot,
  },
  async mounted() {
    await this.getAllTopics();
  },
  data () {
    return {
      dialogVisible: false,

      workingTopic: {
        title: '',
        img: '',
        content: '',
      },

      topicList: [],

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
    async createTopic(){
      console.log('创建话题');
      this.workingTopic.fromUser = this.loginAccount.id;
      this.workingTopic.createTime = new Date();
      this.workingTopic.lastReplyTime = new Date();
      this.workingTopic.lastReplyUser = this.loginAccount.userName; 

      let res = await reqCreateTopic(this.workingTopic, this.token);
      if(res.code == 200){
        this.$message({
          message: '创建话题成功！',
          type: 'success'
        });
        this.clearWorkingTopic();
        this.dialogVisible = false;
      }else
        this.$message.error('创建话题失败！');
    },

    clearWorkingTopic(){
      this.workingTopic.title = '';
      this.workingTopic.img = '';
      this.workingTopic.content = '';
    },

    async getAllTopics(){
      let res = await reqGetAllTopic(this.token);
      console.log(res);
      if(res.code == 200)
        this.topicList = res.data;
    }
  },
}
</script>

<style scoped lang='less'>
  .forum {
    margin: 5% 11% 5% 11%;
    box-shadow: lightgray 0px 0px 2px 1px;
    padding-bottom: 3%;
  }
</style>
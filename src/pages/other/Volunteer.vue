<template>
  <div>
    <!-- 这是志愿活动的界面 -->
    <div v-if="volunteer.code===200" class="border">
      
    </div>
    <div v-if="volunteer.code===442" class="border">
      <h2 style="text-align:center; font-size: larger;">志愿者申请</h2>
      <fieldset>
        <legend>个人信息</legend>
      <el-form ref="form">
        <el-form-item label="姓名" size = 'small'>
          <el-input v-model="name" size = 'small'></el-input>
        </el-form-item>
        <el-form-item label="空闲时间（每周）">
          <el-input v-model="freeTime"></el-input>
        </el-form-item>
      </el-form>
      </fieldset>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { volunteerGetter } from '@/api'
export default {
  name:'Volunteer',
  data(){
    return{
      volunteer:{},
      name:'',
      freeTime:'',
      totalTime:''
    }
  },
  mounted:async function(){
    let res = await volunteerGetter(this.token)
    console.log(res)
    this.volunteer = res
  },
  methods:{
    
  },
  computed:{
    ...mapState({
      token: state=>state.account.token
    }),
  }
}
</script>

<style scoped lang='less'>
  .border{
    margin: 10px;
  }
.el-form-item{
  width: 300px;
}
fieldset{
  border:2px solid #DCDFE6;  text-align:left; border-radius: 8px;margin: 0 auto;width:50%;
}
</style>
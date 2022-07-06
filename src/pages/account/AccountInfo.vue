<template>
  <div class="columns">
    <div class="column left-nav">
      <el-tabs tab-position="left" style="min-height: 300px;">
        <el-tab-pane class="tab-pane" label="账号管理">
          <div class="header">
            <el-image
              style="width: 32px; height: 32px;"
              :src="require(''+'@/assets/images/account/password.png'+'')"
              fit="cover"
            ></el-image><span>账号管理</span>
          </div>        
          <hr>
          <h6>登录账号：</h6>
          <section>
            <b-field label="登录手机">
              <b-input v-model="loginAccount.phoneNumber" disabled></b-input>
              <b-button class="change-btn" type="is-success" outlined>更换号码</b-button>
            </b-field>
            <b-field label="登录密码">
              <b-input value="********" disabled></b-input>
              <b-button class="change-btn" type="is-success" outlined>修改密码</b-button>
            </b-field>
          </section>
        </el-tab-pane>
        <el-tab-pane label="个人资料">配置管理</el-tab-pane>
        <el-tab-pane label="修改头像">角色管理</el-tab-pane>
        <el-tab-pane label="实名认证">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
    <div class="column is-one-third"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name:'AccountInfo',
  computed:{
    ...mapState({
      //注入state参数
      loginAccount: state=>state.account.loginAccount,
      token: state=>state.account.token,
    })
  },
}
</script>

<style scoped lang='less'>
  .left-nav {
    padding-left: 10%;
    padding-top: 8%;
    .tab-pane{
      padding-left: 10%;
      .header{
        span{
          font-size: 24px;
          font-weight: bold;
          margin-left: 10px;
        }
      }
      h6{
        font-size: 20px;
        margin-bottom: 10px;
      }
      .change-btn{
        margin-left: 10px;
      }
    }
  }
</style>
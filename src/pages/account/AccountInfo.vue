<template>
  <div class="columns">
    <div class="column left-nav">
      <el-tabs tab-position="left" style="min-height: 300px;">
        <el-tab-pane class="tab-pane" label="账号管理">
          <div class="columns">
            <div class="column is-1 icon">
              <el-image
                style="width: 32px; height: 32px;"
                :src="require(''+'@/assets/images/account/password.png'+'')"
                fit="cover"
              ></el-image>
            </div>
            <div class="column label">
              账号管理
            </div>
          </div>

          <hr class="dropdown-divider" aria-role="menuitem">
          
          <h6>登录账号：</h6>
          <section>
            <b-field label="登录手机">
              <b-input v-model="loginAccount.phoneNumber" disabled v-show="loginAccount.phoneNumber!=null"></b-input>
              <b-button class="change-btn" type="is-success" outlined v-show="loginAccount.phoneNumber!=null">更换号码</b-button>
              <b-input value="未进行绑定" disabled v-show="loginAccount.phoneNumber==null"></b-input>
              <b-button class="change-btn" type="is-primary" outlined v-show="loginAccount.phoneNumber==null">立即绑定</b-button>
            </b-field>
            <b-field label="登录密码">
              <b-input value="********" disabled></b-input>
              <b-button class="change-btn" type="is-success" outlined>修改密码</b-button>
            </b-field>
          </section>
        </el-tab-pane>
        <el-tab-pane class="tab-pane" label="个人资料">
          <div class="columns">
            <div class="column is-1 icon">
              <el-image
                style="width: 32px; height: 32px;"
                :src="require(''+'@/assets/images/account/account.png'+'')"
                fit="cover"
              ></el-image>
            </div>
            <div class="column label">
              个人资料
            </div>
          </div>

          <hr class="dropdown-divider" aria-role="menuitem">
        
          <section>
            <b-field>
              <b-tag icon="account-check-outline">
                <b>UID：&nbsp;{{loginAccount.id}}</b>
              </b-tag>
            </b-field>
            <b-field label="用户名：">
              <b-input v-model="loginAccount.userName" disabled></b-input>
            </b-field>

            <b-field label="姓名：" :type="loginAccount.name==null ? 'is-danger' : 'is-success'">
              <b-input v-show="loginAccount.name==null" value="您未进行填写" disabled></b-input>
              <b-input v-show="loginAccount.name!=null" v-model="loginAccount.name" disabled></b-input>
            </b-field>

            <b-field label="性别：">
              <b-radio v-model="loginAccount.sex" name="name" native-value="男" disabled>男</b-radio>
              <b-radio v-model="loginAccount.sex" name="name" native-value="女" disabled>女</b-radio>
            </b-field>

            <b-field label="楼栋：" :type="loginAccount.buildingNumber==null ? 'is-danger' : 'is-success'">
              <b-input v-show="loginAccount.buildingNumber==null" value="您未进行填写" disabled></b-input>
              <b-input v-show="loginAccount.buildingNumber!=null" v-model="loginAccount.name" disabled></b-input>
            </b-field>

            <b-field label="房号：" :type="loginAccount.roomNumber==null ? 'is-danger' : 'is-success'">
              <b-input v-show="loginAccount.roomNumber==null" value="您未进行填写" disabled></b-input>
              <b-input v-show="loginAccount.roomNumber!=null" v-model="loginAccount.name" disabled></b-input>
            </b-field>

            <b-field>
              <b-button class="account-btn" type="is-primary">修改</b-button>
            </b-field>


          </section>

        </el-tab-pane>

        <el-tab-pane class="tab-pane" label="修改头像">
          <div class="columns">
            <div class="column is-1 icon">
              <el-image
                style="width: 32px; height: 32px;"
                :src="require(''+'@/assets/images/account/avatar.png'+'')"
                fit="cover"
              ></el-image>
            </div>
            <div class="column label">
              修改头像
            </div>
          </div>

          <hr class="dropdown-divider" aria-role="menuitem">
          
          <h6>上传头像图片：</h6>

        </el-tab-pane>
          <el-tab-pane class="tab-pane" label="实名认证">
            <div class="columns">
              <div class="column is-1 icon">
                <el-image
                  style="width: 32px; height: 32px;"
                  :src="require(''+'@/assets/images/account/idCard.png'+'')"
                  fit="cover"
                ></el-image>
              </div>
              <div class="column label">
                实名认证
              </div>
            </div>

            <hr class="dropdown-divider" aria-role="menuitem">
            
            <section>
              <b-field label="正面图片的URL" label-position="on-border">
                <b-input placeholder="请输入正面图片的URL"></b-input>
              </b-field>
              <b-field label="反面图片的URL" label-position="on-border">
                <b-input placeholder="请输入反面图片的URL"></b-input>
              </b-field>

              <b-field>
                <b-button class="account-btn" type="is-primary">修改</b-button>
              </b-field>


            </section>
          </el-tab-pane>
        </el-tabs>
    </div>
    <div class="column is-one-third"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name:'AccountInfo',
  data() {
    return {
      imageUrl: ''
    };
  },
  computed:{
    ...mapState({
      //注入state参数
      loginAccount: state=>state.account.loginAccount,
      token: state=>state.account.token,
    })
  },
  methods: {

  },
}
</script>

<style scoped lang='less'>
  .left-nav {
    padding-left: 10%;
    padding-top: 5%;
    padding-bottom: 5%;
    .tab-pane{
      padding-left: 10%;
      .label{
        font-size: 18px;
        margin-top: 4px;
      }
      h6{
        font-size: 16px;
        margin-bottom: 10px;
      }
      .change-btn{
        margin-left: 10px;
      }
      .account-btn{
        float: right;
      }
    }
  }
</style>
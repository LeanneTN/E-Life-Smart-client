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
              <b-button class="change-btn" type="is-success" outlined v-show="loginAccount.phoneNumber!=null" @click="dialogVisible = true">更换号码</b-button>
              <b-input value="未进行绑定" disabled v-show="loginAccount.phoneNumber==null"></b-input>
              <b-button class="change-btn" type="is-primary" outlined v-show="loginAccount.phoneNumber==null" @click="dialogVisible = true">立即绑定</b-button>

              <el-dialog
                title="绑定手机号"
                :visible.sync="dialogVisible"
                width="30%">
                <section>
                  <div class="bind-phone">
                    <b-field 
                      :type="phoneStatus" 
                      :message="phoneMsg"
                      label="手机号" 
                      label-position="on-border"
                    >
                      <b-input v-model="bindPhone" placeholder="手机号"></b-input>
                    </b-field>
                  </div>

                  <div class="bind-phone">
                    <b-field 
                      :type="codeStatus" 
                      :message="codeMsg"
                      label="验证码" 
                      label-position="on-border" 
                      grouped
                    >
                      <b-input class="code-input" v-model="code" placeholder="请输入验证码"></b-input>
                      <p class="control">
                          <b-button 
                            type="is-primary"
                            ref="sendBtn" 
                            class="button is-primary"
                            @click="sendPhoneCode"
                            :disabled="sendDisable"
                          >
                            {{prompt}}
                          </b-button>
                      </p>
                    </b-field>
                  </div>

                </section>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="bindPhoneNumber">绑 定</el-button>
                </span>
              </el-dialog>
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
import _util from "@/utils/util";
import { reqPhoneCode, reqCheckPhone } from "@/api";
export default {
  name:'AccountInfo',
  data() {
    return {
      dialogVisible: false, //验证手机号的Dialog是否显示
      bindPhone: '',  //准备绑定的手机号
      passedPhone: '',  //刚刚通过校验的手机号
      phoneMsg: '', //有关手机号的错误提示
      phoneStatus: '',
      code: '',  //填写的验证码
      codeMsg: '',  //有关验证码的错误提示
      codeStatus: '',
      sendCode: '', //真实的验证码
      wait: 60, //倒计时
      sendDisable: false, //发送按钮是否可用
      prompt: '获取验证码',


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
    //获取验证码
    async sendPhoneCode(){
      let result = await this.checkPhone();
      if(result){
        this.sendCode= '1234';

        this.timer();
        // let res = await reqPhoneCode(this.passedPhone);
        // if(res.status == 200)
        //   this.sendCode = res.data
      }
    },

    //为账号绑定手机
    bindPhoneNumber(){
      if(this.code){
        //再校验一边手机号(防止更改)
        if(this.passedPhone == this.bindPhone){
          if(this.code == this.sendCode){
            this.dialogVisible = false;
            this.$message({
              message: '绑定成功！',
              type: 'success'
            });
            this.$store.dispatch('loginAccount', this.token);
            this.clearBindPhone();
          }else{
            this.codeMsg="验证码错误！";
            this.codeStatus="is-danger";
          }
        }else{
          this.phoneMsg="请重新获取验证码！"
          this.phoneStatus="is-danger";
        }
      }else{
        this.codeMsg="验证码不能为空";
        this.codeStatus="is-danger";
      }
    },

    //检查手机号正不正常
    async checkPhone(){
      this.codeMsg='';
      this.codeStatus='';
      //首先检验手机号是否合法
      if(!_util.isPhone(this.bindPhone)){
        console.log(this.bindPhone)
        this.phoneMsg = '请输入正确的手机号！';
        this.phoneStatus = 'is-danger';
        return false;
      }
      else{
        //检查手机号是否已经被占用了
        let res = await reqCheckPhone(this.bindPhone);
        if(res.code == 200){
          this.phoneMsg = '';
          this.phoneStatus = 'is-success';
          this.passedPhone = this.bindPhone;
          return true;
        }else{
          this.phoneMsg = '该手机号已进行过绑定！';
          this.phoneStatus = 'is-danger';
          return false;
        }
      }  
    },

    //点击获取验证码之后的倒计时
    timer() {
      if(this.wait == 0){
        this.sendDisable = false;
        this.wait = 60
        this.prompt = '获取验证码';
      }else{
        this.sendDisable = true;
        this.prompt = `${this.wait}秒后重发`
        this.wait--;
        setTimeout(() => {this.timer()}, 1000);
      }
    },

    //清空绑定手机号的表单
    clearBindPhone(){
      this.bindPhone = '';
      this.passedPhone = '';
      this.phoneMsg = '';
      this.phoneStatus = '';
      this.code = '';
      this.codeMsg = '';
      this.codeStatus = '';
      this.sendCode = '';
      this.wait = 60;
      this.sendDisable = false;
      this.prompt = '获取验证码';
    }
              
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
      .bind-phone{
        padding-bottom: 20px;
        .code-input{
          max-width: 204px;
        }
      }
    }
  }
</style>
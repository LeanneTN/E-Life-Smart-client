<template>
  <div class="login-container">
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a @click="changeMode" :class="{'current':showAccountForm}">账户登录</a>
            </li>
            <li>
              <a @click="changeMode" :class="{'current':!showAccountForm}" style="border-right: 0;">手机登录</a>
            </li>
          </ul>

          <div class="content">
            <form v-show="showAccountForm" @submit.prevent>
              <div class="input-text clearFix">
                <span class="user icon"></span>
                <input v-model="userName" type="text" placeholder="用户名">
                <span class="error-msg">{{userNameMsg}}</span>
              </div>

              <div class="input-text clearFix">
                <span class="pwd icon"></span>
                <input v-model="password" type="password" placeholder="密码">
                <span class="error-msg">{{passwordMsg}}</span>
              </div>

              <div class="input-text clearFix">
                <span class="icon"></span>
                <input v-model="code" type="text" class="code" placeholder="验证码">
                <img 
                  :src="captcha"
                  @click="getCaptcha"
                  style="width: 100px;height: 32px;margin-left: 25px"
                />
                <span class="error-msg">{{codeMsg}}</span>
              </div>

              <button @click="loginByPassword" class="btn">登&nbsp;&nbsp;录</button>
            </form>

            <form v-show="!showAccountForm" @submit.prevent>
              <div class="input-text clearFix">
                <span class="user icon"></span>
                <input v-model="phone" type="text" placeholder="手机号">
                <span class="error-msg">{{phoneMsg}}</span>
              </div>

              <div class="input-text clearFix">
                <span class="icon"></span>
                <input v-model="phoneCode" type="text" class="code" placeholder="验证码">
                <input 
                  ref="sendBtn" 
                  class="sendPhoneCode" 
                  type="button"
                  value="获取验证码"
                  @click="sendPhoneCode"
                />
                <span class="error-msg">{{phoneCodeMsg}}</span>
              </div>

              <button class="btn" @click="loginByPhone">登&nbsp;&nbsp;录</button>
            </form>

            <div class="call clearFix">
              <router-link class="register" to="/register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { reqCaptcha, reqLoginByAccount, reqLoginByPhone, reqPhoneCode, reqCheckPhone } from "@/api";
  import _util from "@/utils/util";
  export default {
    name: 'Login',
    async mounted(){
      await this.getCaptcha();
    },
    data() {
      return {
        wait: 60,
        captcha : '',
        showAccountForm: true,
        userName: '',
        password: '',
        code: '',
        userNameMsg : '',
        passwordMsg : '',
        codeMsg : '',
        phone: '',
        phoneCode: '',
        phoneMsg : '',
        phoneCodeMsg : '',
        imgCode: '',
        sendCode: '',
      }
    },
    methods: {
      //改变登录方式
      changeMode(){
        this.showAccountForm = !this.showAccountForm;
      },

      //刷新验证码
      async getCaptcha(){
        let res = await reqCaptcha();
        console.log(res);
        this.captcha = 'data:image/jpg;base64,' + res.data.codeStr;
        this.imgCode = res.data.code;
      },

      //账号密码登录
      async loginByPassword(){
        let formData={
          userName : this.userName,
          password : this.password,
          code : this.code,
          imgCode : this.imgCode
        };
        //对表单数据进行判断
        let result = this.checkFormData(formData);
        //此时表单验证不通过
        if(!res.code){      
            this.userNameMsg = result.userNameMsg;
            this.passwordMsg = result.passwordMsg;
            this.codeMsg = result.codeMsg;
        }
        //初步验证通过，向服务器发送登录请求
        else{ 
          let res = await reqLoginByAccount(this.userName, this.password);
          console.log(res);   
          //登录成功
          if(res.code == 200){
            //将该用户的token存储到store中
            this.$store.dispatch('token', res.data.token); 
            //向服务器发送请求，获取该用户的account，保存到store中，以便后续使用
            this.$store.dispatch('loginAccount', res.data.token);  
            //进行页面跳转
            this.$router.push({name:'main'});
          }else if(res.code == 401){
            this.passwordMsg = '用户名或密码错误！';
            this.codeMsg = ''
            this.getCaptcha();
          }
        }
      },

      //检验账号密码登录表单
      checkFormData(formData){
        let result={
          status: false,
          userNameMsg: ' ',
          passwordMsg: ' ',
          codeMsg: ' '
        };
        if(!_util.checkValue('require',formData.userName)){
          result.userNameMsg='账号不能为空';
          return result;
        }
        else if(!_util.checkValue('require',formData.password)){
          result.passwordMsg='密码不能为空';
          return result;
        }
        else if(!_util.checkValue('require',formData.code)){
          result.codeMsg='验证码不能为空';
          return result;
        }else if(this.code != this.imgCode){
          result.codeMsg='验证码错误！';
          this.getCaptcha();
          return result;
        }
        //验证通过
        res.code=true;
        return result;
      },

      //校验手机号码
      isPhone(phone) {
        let myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(phone)) {
            return false;
        } else {
            return true;
        }
      },

      //发送手机验证码
      async sendPhoneCode(){
        //手机号为空
        if(!_util.checkValue('require',this.phone))
          this.phoneMsg = '手机号不能为空！';
        else if(!this.isPhone(this.phone))
          this.phoneMsg = '请输入正确的手机号！'
        //开始请求验证码
        else{
          //首先请求该号码是否存在
          let res = await reqCheckPhone(this.phoneCode);
          //这证明该手机号不存在
          if(res.code == 200){
            this.phoneMsg = '该手机号未绑定！';
            return;
          }
          this.phoneMsg = '';
          res = await reqPhoneCode(this.phone);
          if(res.status == 200){
            //成功获取验证码
            this.timer();
            this.sendCode = res.data;
          }
        }
      },

      //手机验证码登录
      async loginByPhone(){
        let formData={
          phone : this.phone,
          phoneCode : this.phoneCode,
          sendCode : this.sendCode
        };
        //对表单数据进行判断
        let result = this.checkPhoneFormData(formData);
        //此时初次验证未通过
        if(!result.status){ 
          this.phoneMsg = res.phoneMsg;
          this.phoneCodeMsg = res.phoneCodeMsg;
        }
        //初步验证通过，开始向服务器发送请求
        else{
          let res = await reqLoginByPhone(this.phone);
          //登录成功
          if(res.status == 200){
            //将该用户的token存储到store中
            this.$store.dispatch('token', res.data.token); 
            //向服务器发送请求，获取该用户的account，保存到store中，以便后续使用
            this.$store.dispatch('loginAccount', res.data.token);  
            //进行页面跳转
            this.$router.push({name:'main'});
          }
        }
      },

      //检验手机登录表单：
      checkPhoneFormData:function (formData) {
        let result={
          status: false,
          phoneMsg: ' ',
          phoneCodeMsg: ' '
        };
        if(!_util.checkValue('require',formData.phone)){
          result.phoneMsg='手机号不能为空！';
          return result;
        }
        else if(!_util.checkValue('require',formData.phoneCode)){
          result.phoneCodeMsg='验证码不能为空！';
          return result;
        }else if(formData.phoneCode != formData.sendCode){
          result.phoneCodeMsg='验证码错误！';
          return result;
        }
        //初步通过验证
        result.status = true;
        return result;
      },

      //点击获取验证码之后的倒计时
      timer() {
        if(this.wait == 0){
          this.$refs.sendBtn.disabled = true;
          this.$refs.sendBtn.style.borderColor="1e9fff";
          this.$refs.sendBtn.style.background="1e9fff";
          this.$refs.sendBtn.style.cursor="pointer";
          this.$refs.sendBtn.value = '获取验证码';
        }else{
          this.$refs.sendBtn.disabled = true;
          this.$refs.sendBtn.style.borderColor="fbfbfb";
          this.$refs.sendBtn.style.background="#ccc";
          this.$refs.sendBtn.style.cursor="not-allowed";
          this.$refs.sendBtn.value = `${this.wait}秒后重发`;
          this.wait--;
          setTimeout(() => {this.timer()}, 1000);
        }
    }
    },
  }
</script>

<style lang="less" scoped>
.login-container {
  margin: 0;
  padding: 0ex 0ex 0ex 0ex;
  width: 100%;
  color: #333;
  background-color: #FFF;
  border-width: 0;
  .login-wrap {
    height: 500px;
    background: white;

    .login {
      width: 100%;
      height: 487px;
      margin: 0 auto;
      background: url(../../assets/images/loginbg.jpg) no-repeat;
    }

    .loginform {
      width: 420px;
      height: 406px;
      box-sizing: border-box;
      background: #fff;
      float: right;
      top: 45px;
      position: relative;
      padding: 20px;
      margin-right: 5%;

      .tab {

        li {
          width: 50%;
          float: left;
          text-align: center;

          a {
            width: 100%;
            display: block;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: 700;
            color: #333;
            border: 1px solid #ddd;
            box-sizing: border-box;
            text-decoration: none;
            cursor: pointer;
          }

          .current {
            border-bottom: none;
            border-top-color: #28a3ef;
            color: #e1251b;
          }
        }
      }

      .content {
        width: 380px;
        height: 316px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-top: none;
        padding: 18px;


        form {
          margin: 15px 0 18px 0;
          font-size: 12px;
          line-height: 18px;

          .input-text {
            margin-bottom: 16px;

            .error-msg{
              top: 100%;
              left: 40px;
              color: red;
              margin: 15px 0 18px 0;
              font-size: 12px;
              line-height: 18px;
            }

            .icon {
              float: left;
              width: 37px;
              height: 32px;
              border: 1px solid #ccc;
              box-sizing: border-box;
              border-radius: 2px 0 0 2px;
            }

            .user{
              background: url(../../assets/images/icons.png) no-repeat -10px -201px;
            }

            .pwd {
              background: url(../../assets/images/icons.png) no-repeat -72px -201px;
            }

            .code{
              width: 176px;
            }

            .sendPhoneCode{
              width: 100px;
              height: 32px;
              margin-left: 25px;
              background-color: #e1251b;
              border-radius: 2px;
              font-size: 14px;
              font-family: 微软雅黑;
              border: 1px solid #e1251b;
              color: #fff;
              cursor: pointer;
            }

            input {
              width: 302px;
              height: 32px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              border-left: none;
              float: left;
              padding-top: 6px;
              padding-bottom: 6px;
              font-size: 14px;
              line-height: 22px;
              padding-right: 8px;
              padding-left: 8px;

              border-radius: 0 2px 2px 0;
              outline: none;
            }
          }

          .setting {
            label {
              float: left;
            }

            .forget {
              float: right;
            }
          }

          .btn {
            margin-top: 15px;
            background-color: #e1251b;
            padding: 6px;
            border-radius: 0;
            font-size: 16px;
            font-family: 微软雅黑;
            word-spacing: 4px;
            border: 1px solid #e1251b;
            color: #fff;
            width: 100%;
            height: 36px;
            outline: none;
            cursor: pointer;
          }
        }

        .call {
          margin-top: 30px;

          ul {
            float: left;

            li {
              float: left;
              margin-right: 5px;
            }
          }

          .register {
            float: right;
            font-size: 15px;
            line-height: 38px;
          }

          .register:hover {
            color: #4cb9fc;
            text-decoration: underline;
          }
        }

      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }

}
</style>
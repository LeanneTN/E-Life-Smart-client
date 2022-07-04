<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link class="register" to="/login" target="_blank">登录</router-link>
        </span>
      </h3>

      <div class="content">
        <label>用户名:</label>
        <input @blur="checkUserName" v-model="userName" type="text" placeholder="请输入用户名">
        <span class="error-msg">{{userNameMsg}}</span>
      </div>
      
      <div class="content">
        <label>登录密码:</label>
        <input @blur="checkPassword" v-model="password" type="password" placeholder="请输入你的登录密码">
        <span class="error-msg">{{passwordMsg}}</span>
      </div>

      <div class="content">
        <label>确认密码:</label>
        <input @blur="checkPassword" v-model="confirm" type="password" placeholder="请输入确认密码">
        <span class="error-msg">{{confirmMsg}}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input @blur="checkCode" v-model="code" type="text" placeholder="请输入验证码" style="width: 145px;">
        <img 
          :src="captcha"
          @click="getCaptcha"
          style="width: 100px;height: 38px;margin-left: 25px;position: absolute;"
        />
        <span class="error-msg">{{codeMsg}}</span>
      </div>

      <div class="content">
        <label>&nbsp;</label>
        <span class="btn">
          <button @click="newAccount">完成注册</button>
        </span>
      </div>
      
    </div>
  </div>
</template>

<script>
  import _util from "@/utils/util";
  import { mapState } from 'vuex';
  import { reqUserName, reqRegister, reqCaptcha } from "@/api";
  export default {
    name: 'Register',
    data() {
      return {
        captcha : '',
        userName: '',
        password: '',
        confirm: '',
        code: '',
        imgCode: '',
        userNameMsg : '',
        passwordMsg : '',
        confirmMsg: '',
        codeMsg : '',
        validation: {
          userName: false,
          password: false,
          code: false
        },
      }
    },
    async mounted(){
      await this.getCaptcha();
    },
    // computed:{
    //   ...mapState({
    //     //注入state参数
    //     loginAccount: state=>state.account.loginAccount,
    //   })
    // },
    methods: {
      //刷新验证码
      async getCaptcha(){
        let res = await reqCaptcha();
        console.log(res);
        this.captcha = 'data:image/jpg;base64,' + res.data.codeStr;
        this.imgCode = res.data.code;
      },

      //校验用户名
      async checkUserName(){
        if(!this.userName){
          this.userNameMsg = '用户名不能为空！';
          this.validation.userName = false;
        }
        //向服务器请求用户名是否已经存在
        else{
          let res = await reqUserName(this.userName);
          console.log('请求账号是否存在...');
          console.log(res);
          if(res.code == 499){
            this.userNameMsg = '用户名被占用！';
          }
          else if(res.code == 200){
            this.userNameMsg = '';
            this.validation.userName = true;
          }
        }   
      },

      //校验密码
      checkPassword(){
        if(!this.password){
          this.passwordMsg = '密码不能为空';
          this.validation.password = false;
        }
        else{
          this.passwordMsg = '';
          if(this.confirm !== this.password){
            this.confirmMsg = '两次输入的密码不一致！';
            this.validation.password = false;
          }     
          else{
            this.confirmMsg = '';
            this.validation.password = true;
          }
        }
      },

      //校验验证码
      checkCode(){
        if(!this.code){
          this.codeMsg = '请输入验证码！';
          this.validation.code = false;
        }
        else{
          this.codeMsg = '';
          this.validation.code = true;
        }
      },

      //进行注册
      async newAccount(){
        //通过了所有校验
        if(this.validation.userName && this.validation.password && this.validation.code && this.code == this.imgCode){
          let res = await reqRegister(this.userName, this.password);
          console.log('请求注册...');
          console.log(res);
          if(res.code == 200){
            //将该用户的token存储到store中
            this.$store.dispatch('token', res.data.token); 
            //向服务器发送请求，获取该用户的account，保存到store中，以便后续使用
            this.$store.dispatch('loginAccount', res.data.token);  
            //进行页面跳转
            this.$router.push({name:'main'});  
          }
        }else{
          this.codeMsg = '验证码错误！';
          this.getCaptcha();
        }
      }
    },
  }
</script>

<style lang="less" scoped>
.register-container {

  .register {
    margin: 0;
    padding: 0ex 0ex 0ex 0ex;
    width: 99%;
    height: 500px;
    color: #333;
    background-color: #FFF;
    border-width: 0;
    

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div {
      margin-block: 32px;
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 35%;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 485px;
        color: red;
        font-size: 12px;
        line-height: 18px;
      }

      .btn {
        line-height: 36px;
  
        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
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
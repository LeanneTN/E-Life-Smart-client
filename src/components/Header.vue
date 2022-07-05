<template>
    <b-navbar :shadow="true" :fixed-top="true" type="is-light">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/images/logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>

        <template #start>
            <b-navbar-item href="#" v-show="loginAccount==null">
                <b>&nbsp;主页&nbsp;</b>
            </b-navbar-item>
            <b-navbar-item href="#" v-show="loginAccount==null">
                <b>&nbsp;反馈&nbsp;</b>
            </b-navbar-item>
            <b-navbar-item href="#" v-show="loginAccount==null">
                <b>&nbsp;帮助&nbsp;</b>
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="div" v-show="loginAccount==null">
                <div class="buttons">
                    <router-link class="button is-primary" to="/login">
                        <strong>登录</strong>
                    </router-link>
                    <router-link class="button is-gray" to="/register">
                        <strong>注册</strong>
                    </router-link>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import { mapState } from 'vuex';
import { reqSignOut } from '@/api/index';
export default {
  name:'Header',
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    //下线
    async signOut(){
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
  computed:{
    ...mapState({
      //注入state参数
      loginAccount: state=>state.account.loginAccount,
      token: state=>state.account.token,
    })
  },
}
</script>

<style scoped>
</style>

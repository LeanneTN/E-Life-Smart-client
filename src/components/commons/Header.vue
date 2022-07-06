<template>
    
<div>
    <!-- 这是未登录时展示的 -->
    <b-navbar :shadow="true" :fixed-top="true" type="is-light" v-if="loginAccount==null">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../../assets/images/logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>

        <template #start>
            <b-navbar-item href="#">
                <b>&nbsp;主页&nbsp;</b>
            </b-navbar-item>
            <b-navbar-item href="#">
                <b>&nbsp;反馈&nbsp;</b>
            </b-navbar-item>
            <b-navbar-item href="#">
                <b>&nbsp;帮助&nbsp;</b>
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="div">
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

    <!-- 这是登录时展示的 -->
    <b-navbar :shadow="true" :fixed-top="true" type="is-light" v-if="loginAccount!=null">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/main' }">
                <img
                    src="../../assets/images/logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>

        <template #start>
            <b-navbar-item @click="goPage('main')" v-show="loginAccount!=null">
                <b>&nbsp;主页&nbsp;</b>
            </b-navbar-item>
            <b-navbar-item @click="goPage('forum')" v-show="loginAccount!=null">
                <b>&nbsp;社区&nbsp;</b>
            </b-navbar-item>
            <b-navbar-item @click="goPage('repair')" v-show="loginAccount!=null">
                <b>&nbsp;报修&nbsp;</b>
            </b-navbar-item>
            <b-navbar-item @click="goPage('payment')" v-show="loginAccount!=null">
                <b>&nbsp;缴费&nbsp;</b>
            </b-navbar-item>
            <b-navbar-dropdown label="其他">
                <b-navbar-item @click="goPage('carManagement')">
                    车辆管理
                </b-navbar-item>
                <b-navbar-item @click="goPage('healthCheck')">
                    健康打卡
                </b-navbar-item>
                <b-navbar-item @click="goPage('volunteer')">
                    志愿活动
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template #end>
            <b-dropdown
                position="is-bottom-left"
                append-to-body
                aria-role="menu">

                <template #trigger>
                    <a class="navbar-item" role="button">
                        <span>
                            <el-badge :value="2" class="item" type="warning">
                                <el-button size="small" type="info" icon="el-icon-message-solid" circle></el-button>
                            </el-badge>
                        </span>
                    </a>
                </template>

                <b-dropdown-item custom aria-role="menuitem">
                    Logged as <b>Rafael Beraldo</b>
                </b-dropdown-item>
                <hr class="dropdown-divider">
                <b-dropdown-item has-link aria-role="menuitem">
                    <a href="https://google.com" target="_blank">
                        <b-icon icon="link"></b-icon>
                        Google (link)
                    </a>
                </b-dropdown-item>
            </b-dropdown>
            <b-dropdown
                position="is-bottom-left"
                append-to-body
                aria-role="menu">
                <template #trigger>
                    <a class="navbar-item" role="button">
                        <span>
                            <i class="el-icon-user-solid"></i>
                        </span>
                    </a>
                </template>


                <b-dropdown-item value="home" aria-role="menuitem">
                    <b-icon icon="home"></b-icon>
                    主页
                </b-dropdown-item>
                <b-dropdown-item value="products" aria-role="menuitem">
                    <b-icon icon="account-box"></b-icon>
                    个人信息
                </b-dropdown-item>

                <hr class="dropdown-divider" aria-role="menuitem">

                <b-dropdown-item value="logout" aria-role="menuitem">
                    <b-icon icon="logout"></b-icon>
                    注销
                </b-dropdown-item>
            </b-dropdown>
        </template>     
    </b-navbar>
</div>




</template>

<script>
import { mapState } from 'vuex';
import { reqSignOut } from '@/api/index';
export default {
  name:'Header',
  data() {
    return {
        navigation: 'home'
    }
  },
  created() {
    // 在页面加载时读取sessionStorage
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  mounted() {

  },
  methods: {
    //进行页面跳转的函数
    goPage(page){
        this.$router.push({name: page});
    },

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

<style lang="less" scoped>

</style>

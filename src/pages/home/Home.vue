<template>
  <div>
    <section>
        <b-carousel
            :indicator="indicator"
            :indicator-background="indicatorBackground"
            :indicator-inside="indicatorInside"
            :indicator-mode="indicatorMode"
            :indicator-position="indicatorPosition"
            :indicator-style="indicatorStyle">
            <b-carousel-item v-for="(imgPath, i) in imgsPath" :key="i">
                <section>
                  <img :src="imgPath">
                </section>
            </b-carousel-item>
        </b-carousel>
    </section>

    <div class="card">
      <div>
        <h1>E-Life智能生活小区</h1>
        <h6>——让生活更简单！</h6>
        <h2>
          <b>·</b>&nbsp;&nbsp;停车管理
        </h2>
        <h2>
          <b>·</b>&nbsp;&nbsp;网上缴费
        </h2>
        <h2>
          <b>·</b>&nbsp;&nbsp;健康打卡
        </h2>
      </div>
      <div class="button-row">
        <b-button class="button" type="is-primary" @click="gotoLogin">已有帐号</b-button>
        <b-button class="button" type="is-primary is-light" @click="gotoRegister">立即加入</b-button>
      </div>
      
    </div>


  </div>
</template>

<script>
export default {
  name:'Home',
  data() {
    return {
      imgsPath: [
        require(''+'@/assets/images/home/1.png'+''),
        require(''+'@/assets/images/home/2.png'+''),
        require(''+'@/assets/images/home/3.png'+''),
        require(''+'@/assets/images/home/4.png'+''),
      ],
      indicator: true,
      indicatorBackground: true,
      indicatorInside: true,
      indicatorMode: 'hover',
      indicatorPosition: 'is-bottom',
      indicatorStyle: 'is-lines',
    }
  },
  methods: {
    gotoLogin(){
      this.$router.push({name:'login'});
    },
    gotoRegister(){
      this.$router.push({name:'register'});
    }
  },
}
</script>

<style scoped lang='less'>
.card{
  position: absolute;
  left: 60%;
  top: 25%;
  background: rgba(128, 128, 128, 0.75);
  width: 400px;
  height: 300px;
  color: white;
  div{
    width: 400px;
    text-align: center;
    h1 {
      margin-top: 5%;
      font-size: 32px;
    }
    h2 {
      text-align: left;
      font-size: 18px;
      margin: 2%;
      margin-left: 10%;
    }
    h6 {
      margin: 2%;
      text-align: right;
      font-size: 16px;
    }
  }
  .button-row {
    margin: 5%;
    .button{
      margin-left: 5%;
      margin-right: 10%;
    }
  }
}
</style>
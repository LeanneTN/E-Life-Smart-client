<template>
  <div class="quick-link">
    快捷功能
    <div class="columns">
      <div @click="goPage('forum')" class="column link">
        <img src="../../assets/images/home/community.png">
        社区论坛
      </div>
      <div @click="goPage('repair')" class="column link">
        <img src="../../assets/images/home/repair.png">
        网上报修
      </div>
      <div @click="goPage('payment')" class="column link">
        <img src="../../assets/images/home/payment.png">
        在线缴费
      </div>
    </div>
    <div class="columns">
      <div @click="goPage('carManagement')" class="column link">
        <img src="../../assets/images/home/car.png">
        车辆管理
      </div>
      <div @click="goPage('healthCheck')" class="column link">
        <img src="../../assets/images/home/health.png">
        健康打卡
      </div>
      <div @click="goPage('volunteer')" class="column link">
        <img src="../../assets/images/home/volunteer.png">
        志愿活动
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'QuickLink',
  methods: {
    goPage(page){
      this.$router.push({name: page});
    },
  },
}
</script>

<style scoped lang='less'>
  .quick-link{
    margin-top: 6%;
    padding: 6%;
    background: #f5f5f5;
    border-radius: 4px;
    font-size: 14px;
    .link{
      font-size: 13px;
      img{
        padding: 5px;
        margin-top: 5px;
      }
    }
    .link:hover{
      cursor: pointer;
    }
  }
</style>
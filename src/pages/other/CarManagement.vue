<template>
  <div>
    <div v-if="code===200" class="borad">

    </div>
    <div v-if="code===486" class="borad">
        <h2 style="text-align:center; font-size: larger;">您名下尚未登记车辆，请前往物业进行车牌登记</h2>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getCar } from '@/api';
export default {
  name:'CarManagement',
  data(){
    return {
      code:0
    }
  },
  mounted: async function (){
    let res = await getCar(this.token)
    this.code = res.code
  },
  computed: {
      ...mapState({
          token: (state) => state.account.token,
    }),
  }
}
</script>

<style scoped lang='less'>
  .borad{
    margin: 20px;
  }
</style>
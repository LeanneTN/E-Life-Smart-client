<template>
    <div id="health">
        <h2 style="text-align:center; font-size: larger;">每日健康申报</h2>
        <!-- 这是健康打卡界面 -->
        <el-form ref="form" :label-position="labelPosition">
            <el-form-item label="您的uid">
                <el-input v-model="uid"></el-input>
            </el-form-item>
            <el-form-item label="所在位置">
                <el-input v-model="location"></el-input>
            </el-form-item>
            <el-form-item label="当前区域风险等级">
                <el-select v-model="area_level" placeholder="请选择区域风险等级">
                    <el-option label="低风险" value="0"></el-option>
                    <el-option label="中风险" value="1"></el-option>
                    <el-option label="高风险" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="当前时间">
                <el-col :span="11">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="time"
                        style="width: 100%"
                    ></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="当前体温">
                <el-input v-model="temp"></el-input>
            </el-form-item>
            <el-form-item label="其他信息">
                <el-input type="textarea" v-model="other_info"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { healthCheckSubmit } from '@/api';
import { mapState } from 'vuex';
export default {
    name: "HealthCheck",
    data() {
        return {
            uid: "",
            temp: "",
            location:"",
            time:"",
            other_info:"",
            area_level:"",
            labelPosition:"top"
        };
    },
    methods:{
      async onSubmit(){
        let res = await healthCheckSubmit(this.uid, this.temp,
        this.location, this.time, this.other_info, this.area_level, this.token)
        console.log(res);
        alert("打卡成功")
      }
    },
    computed:{
      ...mapState({
        token: state=>state.account.token
      })
    }
};
</script>

<style scoped lang='less'>
#health{
  margin: 20px;
}

.el-form-item{
  width: 500px;
}
</style>
<template>
    <div>
        <!-- 这是健康打卡界面 -->
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="所在位置">
                <el-input v-model="location"></el-input>
            </el-form-item>
            <el-form-item label="当前区域风险等级">
                <el-select v-model="area_level" placeholder="请选择区域风险等级">
                    <el-option label="区域一" value="低风险"></el-option>
                    <el-option label="区域二" value="中风险"></el-option>
                    <el-option label="区域二" value="高风险"></el-option>
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
            <el-form-item label="今日体温范围">
                <el-checkbox-group v-model="temp">
                    <el-checkbox label="35℃以下" name="temp"></el-checkbox>
                    <el-checkbox label="35.1~36.8℃" name="temp"></el-checkbox>
                    <el-checkbox label="36.9~37.2℃" name="temp"></el-checkbox>
                    <el-checkbox label="37.3℃及以上" name="temp"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="其他信息">
                <el-input type="textarea" v-model="other_info"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "HealthCheck",
    data() {
        return {
            uid: "",
            temp: "",
            location:"",
            time:"",
            other_info:"",
            area_level:""
        };
    },
    methods:{
      onsubmit(){

      }
    }
};
</script>

<style scoped lang='less'>
</style>
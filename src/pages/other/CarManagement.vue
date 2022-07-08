<template>
    <div>
        <div v-if="code === 200" class="borad">
            <el-container>
                <el-aside width="200px">
                    <table id="info">
                        <tr>
                            <td>您的车牌:</td>
                            <td>{{ carNum }}</td>
                        </tr>
                        <tr>
                            <td>您的车位:</td>
                            <td>{{ parkingPlace }}</td>
                        </tr>
                        <tr>
                            <td>车位类型:</td>
                            <td>{{ parkingType }}</td>
                        </tr>
                        <tr>
                            <td>需缴纳总费用:</td>
                            <td>{{ totalMoney }}</td>
                        </tr>
                        <tr>
                            <td align="center">
                                <el-button type="primary" @click="parkInvoker"
                                    >停车</el-button
                                >
                            </td>
                            <td align="center">
                                <el-button type="primary" @click="leaveInvoker"
                                    >离开</el-button
                                >
                            </td>
                        </tr>
                    </table>
                </el-aside>
                <el-main>
                    <el-table
                        :data="tableData"
                        style="width: 100%"
                        max-height="600"
                        :header-cell-style="{ 'text-align': 'center' }"
                        :cell-style="{ 'text-align': 'center' }"
                    >
                        <el-table-column
                            prop="parkingNum"
                            label="车位号"
                            width="150"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="start"
                            label="停车时间"
                            width="200"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="end"
                            label="离开时间"
                            width="150"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="totalPrice"
                            label="需缴费用"
                            width="150"
                        >
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </div>

        <div v-if="code === 486" class="borad">
            <h2 style="text-align: center; font-size: larger">
                您名下尚未登记车辆，请前往物业进行车牌登记
            </h2>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { getCar, getParkRecord, park, leave } from "@/api";
export default {
    name: "CarManagement",
    data() {
        return {
            code: 0,
            carNum: "",
            parkingPlace: "",
            parkingType: "",
            totalMoney: 0,
            start: 0,
            end: 0,
            tableData: [],
            car: {}
        };
    },
    mounted: async function () {
        let res = await getCar(this.token);
        this.code = res.code;
        this.carNum = res.data.id;
        let temp = await getParkRecord(this.token, res.data);
        if (temp.code === 487) alert("您当前没有停车记录");
        else if (temp.code === 200) {
            this.tableData = temp.data;
            this.car = res.data;
        }
        let temps = await getParkRecord(this.token, this.car);
        this.tableData = temps.data;
        for(const element of temps.data){
          this.totalMoney += element.totalPrice
        }
    },
    computed: {
        ...mapState({
            token: (state) => state.account.token,
        }),
    },
    methods: {
        async parkInvoker() {
          let res = await park(this.token, this.carNum)
          if(res.code === 200){
            alert("停车成功")
            let temp = await getParkRecord(this.token, this.car);
            this.tableData = temp.data;
            this.totalMoney = 0;
            for(const element of temp.data){
              this.totalMoney += element.totalPrice
            }
            console.log(this.totalMoney)
          }else if(res.code === 486){
            alert("车已在库中")
          }else{
            alert("服务器忙，稍后再试")
          }
        },

        async leaveInvoker() {
          let res = await leave(this.token, this.carNum)
          if(res.code === 200){
            alert("成功离开")
            console.log(this.car)
            let temp = await getParkRecord(this.token, this.car);
            this.tableData = temp.data;
            this.totalMoney = 0;
            for(const element of temp.data){
              this.totalMoney += element.totalPrice
            }
            console.log(this.totalMoney)
          }
          else if(res.code === 487){
            alert("无停车记录")
          }else{
            alert("服务器忙，稍后再试")
          }
        },
    },
};
</script>

<style scoped lang='less'>
.borad {
    margin: 20px;
}
.el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
}
#info {
    margin-top: 20%;
    line-height: 40px;
    text-align: left;
}
</style>
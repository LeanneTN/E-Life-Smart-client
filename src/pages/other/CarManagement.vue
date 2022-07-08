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
                                <el-button type="primary" @click="park"
                                    >停车</el-button
                                >
                            </td>
                            <td align="center">
                                <el-button type="primary" @click="leave"
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
import { getCar, getParkRecord } from "@/api";
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
        }
    },
    computed: {
        ...mapState({
            token: (state) => state.account.token,
        }),
    },
    methods: {
        park() {

        },

        leave() {

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
<template>
    <div>
        <!-- 这是志愿活动的界面 -->
        <div v-if="volunteer.code === 200" class="border">
            <el-container>
                <el-aside width="200px">
                    <table id="info">
                        <tr>
                            <td>姓名:</td>
                            <td>{{ name }}</td>
                        </tr>
                        <tr>
                            <td>id:</td>
                            <td>{{ id }}</td>
                        </tr>
                        <tr>
                            <td>空闲时间:</td>
                            <td>{{ freeTime }}</td>
                        </tr>
                        <tr>
                            <td>总服务时间:</td>
                            <td>{{ totalTime }}</td>
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
                            prop="id"
                            label="任务编号"
                            width="150"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="event"
                            label="任务内容"
                            width="200"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="totalTime"
                            label="任务时长"
                            width="150"
                        >
                        </el-table-column>
                        <el-table-column align="right">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)"
                                    >接受</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </div>
        <div v-if="volunteer.code === 442" class="border">
            <h2 style="text-align: center; font-size: larger">志愿者申请</h2>
            <fieldset>
                <legend>个人信息</legend>
                <el-form ref="form">
                    <el-form-item label="姓名" size="small">
                        <el-input v-model="name" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="空闲时间（每周）">
                        <el-input v-model="freeTime"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit"
                            >立即提交</el-button
                        >
                    </el-form-item>
                </el-form>
            </fieldset>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { volunteerGetter, volunteerApply, volunteerMissionGet, volunteerTaskTake } from "@/api";
export default {
    name: "Volunteer",
    data() {
        return {
            volunteer: {},
            name: "",
            freeTime: "",
            totalTime: 0,
            id: 0,
            uid: 0,
            tableData: [],
            volunteerObj: {
                name: "",
                freeTime: "",
                totalTime: 0,
                id: 0,
            },
        };
    },
    mounted: async function () {
        let res = await volunteerGetter(this.token);
        console.log(res);
        this.volunteer = res;
        if (res.code === 200) {
            this.name = res.data.name;
            this.freeTime = res.data.freeTime;
            this.id = res.data.id;
            this.totalTime = res.data.totalTime;
            this.uid = res.data.uid;
            //console.log(vo)
            //if(res.code===200){
            let ress = await volunteerMissionGet(
                this.token,
                res.data,
                res.data.name,
                res.data.id,
                res.data.freeTime,
                res.data.totalTime,
                res.data.uid
            );
            console.log(ress)
            this.tableData = ress.data
        }
    },
    methods: {
        async onSubmit() {
            let res = await volunteerApply(
                this.uid,
                this.name,
                this.freeTime,
                this.token
            );
            console.log(this.name)
            console.log(res)
            if (res.code === 200) {
                alert("志愿者注册成功");
                this.volunteer = volunteerGetter(this.token);
            } else {
                alert("志愿者注册失败，请检查信息是否完整或稍后再试");
            }
        },
        async handleEdit(index, row){
          //利用row.id获取所在行的志愿服务id
          let volunteerLog = {
            id: row.id,
            event: row.event,
            totalTime: row.totalTime,
            uid: this.uid
          }
          let res = await volunteerTaskTake(this.token, volunteerLog);
          if(res.code === 200){
            alert("任务接受成功")
          }
          location.reload()
        }
    },
    computed: {
        ...mapState({
            token: (state) => state.account.token,
        }),
    },
};
</script>

<style scoped lang='less'>
.border {
    margin: 30px;
}
.el-form-item {
    width: 300px;
    margin: 50px;
}
fieldset {
    border: 2px solid #dcdfe6;
    text-align: left;
    border-radius: 8px;
    margin: 0 auto;
    width: 50%;
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

body > .el-container {
    margin-bottom: 40px;
}

#info {
    margin-top: 20%;
    line-height: 40px;
    text-align: left;
}
</style>
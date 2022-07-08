<template>
  <div class="repair">
    <el-tabs type="border-card">
      <el-tab-pane label="申请报修">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="保修项目">
            <el-select v-model="repair.type" placeholder="请选择报修项目">
              <el-option label="门锁" value="门锁"></el-option>
              <el-option label="家电" value="家电"></el-option>
              <el-option label="电路" value="电路"></el-option>
              <el-option label="水管" value="水管"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="地址">
            <el-input v-model="repair.address"></el-input>
          </el-form-item>

          <el-form-item label="联系电话">
            <el-input v-model="repair.phone"></el-input>
          </el-form-item>

          <el-form-item label="其他信息">
            <el-input type="textarea" v-model="repair.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即报修</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="我的报修">
        <b-table
            :data="repairData"
            :bordered="false"
            :striped="false"
            :narrowed="false"
            :hoverable="true"
            :loading="false"
            :focusable="false"
            :mobile-cards="true">

            <b-table-column field="id" label="ID" numeric v-slot="props">
                {{ props.row.id }}
            </b-table-column>

            <b-table-column field="first_name" label="报修项目" v-slot="props">
                {{ props.row.type }}
            </b-table-column>

            <b-table-column field="last_name" label="地址" v-slot="props">
                {{ props.row.address }}
            </b-table-column>

            <b-table-column field="last_name" label="联系电话" v-slot="props">
              {{ props.row.phone }}
            </b-table-column>

            <b-table-column field="date" label="报修时间" centered v-slot="props">
                <span class="tag is-primary is-light">
                    {{ new Date(props.row.start).toLocaleDateString() }}
                </span>
            </b-table-column>

            <b-table-column field="last_name" label="状态" v-slot="props">
              <span 
              :class="[
              {'is-danger': props.row.status=='已报修'},
              {'is-warning': props.row.status=='已接单'},
              {'is-success': props.row.status=='已完成'},
              'tag']">
                {{ props.row.status }}
              </span>
            </b-table-column>

            <b-table-column field="last_name" label="操作" v-slot="props">
              <b-button 
              size="is-small" 
              v-show="props.row.status=='已报修'" 
              rounded
              @click="changeData(props.row)">修改信息</b-button>

              <el-dialog
                title="修改报修信息"
                :visible.sync="dialogVisible"
                width="30%">

                <el-form label-width="80px">
                  <el-form-item label="保修项目">
                    <el-select v-model="workingRepair.type" placeholder="请选择报修项目">
                      <el-option label="门锁" value="门锁"></el-option>
                      <el-option label="家电" value="家电"></el-option>
                      <el-option label="电路" value="电路"></el-option>
                      <el-option label="水管" value="水管"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="地址">
                    <el-input v-model="workingRepair.address"></el-input>
                  </el-form-item>

                  <el-form-item label="联系电话">
                    <el-input v-model="workingRepair.phone"></el-input>
                  </el-form-item>

                  <el-form-item label="其他信息">
                    <el-input type="textarea" v-model="workingRepair.description"></el-input>
                  </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="modifyRepair">更 改</el-button>
                </span>
              </el-dialog>
            </b-table-column>

            <template #empty>
                <div class="has-text-centered">No records</div>
            </template>

        </b-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { reqSubmitRepair, reqGetMyLogs, reqUpdateRepair } from '@/api/index';
import _util from "@/utils/util";
export default {
  name:'Repair',
  data() {
    return {
      //申请报修表单
      repair: {
        type: '门锁',
        address: '',
        phone: '',
        description: '',
      },

      repairData: [],

      dialogVisible: false,

      workingRepair: {},
    }
  },
  computed:{
    ...mapState({
      //注入state参数
      loginAccount: state=>state.account.loginAccount,
      token: state=>state.account.token,
    })
  },
  async mounted(){
    await this.getRepairData();
  },
  methods: {
    //以下是与保修相关的
    //提交报修单
    async onSubmit() {
      if(this.checkForm){
        this.repair.fromUser = this.loginAccount.id;
        this.repair.start = new Date();
        this.repair.status = '已报修';
        
        console.log(this.repair);

        let res = await reqSubmitRepair(this.repair, this.token);
        if(res.code == 200){
          this.$message({
            message: '报修成功！',
            type: 'success'
          });
          await this.getRepairData();
        }
      }
    },
    //TODO:对报修的表单进行校验
    checkForm(){
      //检查手机号

      //检查地址

      return true;
    },

    //以下是与查看报修相关的
    //获取报修数据
    async getRepairData(){
      //获取所有的报修记录
      let res = await reqGetMyLogs(this.token);
      console.log(res);
      if(res.code == 200)
        this.repairData = res.data;
    },
    //修改报修的信息
    changeData(workingRepair){
      console.log(workingRepair);
      this.dialogVisible = true;
      this.workingRepair = _util.copy(workingRepair);
    },
    async modifyRepair(){
      let res = await reqUpdateRepair(this.workingRepair, this.token);
      if(res.code == 200){
        this.$message({
          message: '更新报修信息成功！',
          type: 'success'
        });
        await this.getRepairData();
        this.dialogVisible = false;
      }else{
        this.$message.error('更新报修信息失败！');
      }
    }
  }
}
</script>

<style scoped lang='less'>
  .repair {
    padding: 5% 15% 5% 15%;
  }
</style>
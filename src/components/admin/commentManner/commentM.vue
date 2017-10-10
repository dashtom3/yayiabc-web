<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>意见反馈</b></el-breadcrumb-item>
        <el-breadcrumb-item>意见反馈</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col class="warp-main">
      <el-form label-width="80px" class="clearfix">
        <el-form-item label="手机号" class="fl t_input_width">
          <el-input v-model="mobilePhone"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="fl">
          <el-select v-model="value" placeholder="全部" class="t_select_width">
            <el-option
              v-for="item in replayStat"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="fl">
          <el-button type="primary" @click="queryHandler">查询</el-button>
        </el-form-item>
      </el-form>

      <!--意见反馈列表-->
      <el-table :data="replayLists" border>
        <el-table-column label="手机号" align="center">
          <template scope="scope" >
            <span>{{scope.row.phone}}</span>
          </template> 
        </el-table-column>
        <el-table-column label="留言" align="center" >
          <template scope="scope">
            <span>{{scope.row.message}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template scope="scope">
            <span v-if="scope.row.state == 1">未读</span>
            <span v-if="scope.row.state == 2">已读</span>
          </template>
        </el-table-column>
        <el-table-column label="提交日期" align="center">
          <template scope="scope">
            <span>{{scope.row.created}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center" >
          <template scope="scope">
            <span class="read" @click="setRead(scope)" v-if="scope.row.state == 1">标为已读</span>
            <span class="alreadyRead" v-if="scope.row.state == 2">已读</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="position:absolute;top:650px;right:0;" v-show="this.totalCount > this.pagesize">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import global from '../../global/global'
  import util from '../../../common/util'
  export default {
    data(){
      return {
        orderCode: "",
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1,
        replayStat: [{
          value: '',
          label: '全部'
        },{
          value: '1',
          label: '未读'
        },{
          value: '2',
          label: '已读'
        }],
        value: '',
        mobilePhone: '',
        replayLists: [],
        replayText: '',
        orderId: '',
        commentId: ''
      }
    },
    created(){
      this.queryHandler()
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val 
        this.queryHandler(val)
      },
      queryHandler(val){
        if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }
        let params = {
          phone: this.mobilePhone,
          state: this.value,
          currentPage: this.currentPage,
          numberPerpage: this.pagesize,
        }
        global.axiosGetReq('/feedback/list',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            this.totalCount = res.data.totalNumber
            this.replayLists = res.data.data
            for (var i = 0; i < this.replayLists.length; i++) {
              this.replayLists[i].created = util.formatDate.format(new Date(this.replayLists[i].created))
            }
          }else{
            this.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      setRead(scope) {
        let params = {
          feedId: scope.row.feedId,
        }
        global.axiosPostReq('/feedback/updateState',params).then((res) => {
          console.log(res,'zp')
          if (res.data.callStatus === 'SUCCEED') { 
            this.$message({
              message: '标记成功！',
              type: 'success'
            })
            this.queryHandler()
          }else{
            this.$message.error('网络出错，请稍后再试！');
          }
        })
      }
    }
  }
</script>

<style scoped>
.fl{
  float:left;
}
.clearfix{
  zoom:1;
}
.clearfix:after{
  content:"";
  clear:both;
  display:block;
}
.t_input_width{
  width:300px;
}
.t_select_width{
  width:220px;
}
.btn_{
  margin-left: 140px;
}
.btn_box{
  width: 260px;
  margin: 20px auto;
}
.read {
  cursor: pointer;
  color: #329af0;
}
.alreadyRead {
  color: #999999;
}
</style>
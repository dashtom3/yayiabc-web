<template>
  <el-row class="userListWrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>用户管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>提现管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
      <el-col  class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="searchUserContent" placeholder='请输入真实姓名或手机号'></el-input>
          </el-form-item>
          <el-form-item label="提现状态：">
            <el-select v-model="searchType" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="申请中" value="1"></el-option>
              <el-option label="提现成功" value="2"></el-option>
              <el-option label="未通过" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="queryHandler">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="getMoneyList" border style="width: 100%">
        <el-table-column prop="trueName" align="center" width="110" label="真实姓名"></el-table-column>
        <el-table-column prop="phone" align="center" width="130" label="手机号"></el-table-column>
        <el-table-column prop="withNum" align="center" label="提现金额(元)">
        </el-table-column>
        <el-table-column prop="withQbNum" align="center" label="提现的乾币数">
        </el-table-column>
        <el-table-column prop="withQbDetail" align="center" label="提现的乾币数(明细)">
          <template scope="scope">
            <p>{{'免费:' + scope.row.withQbDetail[2] + '个'}}</p>
            <p>{{'95折:' + scope.row.withQbDetail[1] + '个'}}</p>
            <!-- <p>{{'9折:' + scope.row.withQbDetail[1] + '个'}}</p> -->
            <p>{{'8折:' + scope.row.withQbDetail[0] + '个'}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="witType" align="center" label="类型">
        </el-table-column>
        <el-table-column prop="accountHolder" align="center" label="开户者姓名">
        </el-table-column>
        <el-table-column prop="oBank" align="center" label="银行名称">
          <template scope="scope">
            <span v-if="scope.row.oBank === '非银行'">无</span>
            <span v-else>{{scope.row.oBank}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardNumber" align="center" label="账号" width="180">
        </el-table-column>
        <el-table-column prop="created" align="center" label="申请时间">
          <template scope="scope">
            <span>{{new Date(scope.row.created).getFullYear()+'-'+ fillZero(new Date(scope.row.created).getMonth()+1)+'-'+fillZero(new Date(scope.row.created).getDate())+' '+fillZero(new Date(scope.row.created).getHours())+":"+fillZero(new Date(scope.row.created).getMinutes())+":"+fillZero(new Date(scope.row.created).getSeconds())}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sign" align="center" width="100" label="提现状态">
          <template scope="scope">
            <span v-if="scope.row.sign === 1">申请中</span>
            <span v-if="scope.row.sign === 2">提现成功</span>
            <span v-if="scope.row.sign === 3">未通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="determineTime" align="center" label="提现时间">
          <template scope="scope">
            <span v-if="scope.row.determineTime">{{new Date(scope.row.determineTime).getFullYear()+'-'+ fillZero(new Date(scope.row.determineTime).getMonth()+1)+'-'+fillZero(new Date(scope.row.determineTime).getDate())+' '+fillZero(new Date(scope.row.determineTime).getHours())+":"+fillZero(new Date(scope.row.determineTime).getMinutes())+":"+fillZero(new Date(scope.row.determineTime).getSeconds())}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <span v-if="scope.row.sign === 1">
              <el-button type="text" v-on:click="passHandler(scope.row)">通过</el-button>
              <el-button type="text" v-on:click="rejectHandler(scope.row)">不通过</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" v-show="this.totalCount > this.pagesize">
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
  export default{
    data(){
      return {
        searchUserContent: '',
        searchType: '1',
        getMoneyList: [],
        pagesize: 10,
        currentPage: 1,
        totalCount: 1
      }
    },
    created() {
      this.queryHandler()
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val 
        this.queryHandler(val)
      },
      fillZero(n) {
        return n<10 ? '0'+ n: n 
      },
      //获取提现列表
      queryHandler(val) {
        var that = this;

        if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }
        var obj = {
          sign: that.searchType,
          nameOrPhone: that.searchUserContent,
          currentPage: this.currentPage,
          numberPerpage: this.pagesize
        }
        that.global.axiosPostReq('/userWith/show',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            var getMoneyList = res.data.data
            var result = []
            for(var i=0; i<getMoneyList.length; i++){
              for(var j=0; j<getMoneyList[i].userWithList.length; j++){
                result.push({
                  trueName: getMoneyList[i].trueName,
                  phone: getMoneyList[i].phone,
                  withNum: (getMoneyList[i].userWithList[j].aType + getMoneyList[i].userWithList[j].cType + getMoneyList[i].userWithList[j].giveType).toFixed(2),
                  withQbNum: getMoneyList[i].userWithList[j].aType / 0.8 + getMoneyList[i].userWithList[j].cType / 0.95 + getMoneyList[i].userWithList[j].giveType,
                  withQbDetail: [getMoneyList[i].userWithList[j].aType / 0.8, getMoneyList[i].userWithList[j].cType / 0.95, getMoneyList[i].userWithList[j].giveType],
                  witType: getMoneyList[i].userWithList[j].witType,
                  accountHolder: getMoneyList[i].userWithList[j].accountHolder,
                  oBank: getMoneyList[i].userWithList[j].oBank,
                  cardNumber: getMoneyList[i].userWithList[j].cardNumber,
                  created: getMoneyList[i].userWithList[j].created,
                  sign: getMoneyList[i].userWithList[j].sign,
                  determineTime: getMoneyList[i].userWithList[j].determineTime,
                  withId: getMoneyList[i].userWithList[j].withId
                }) 
              }
            }
            this.getMoneyList = result
            this.totalCount = res.data.totalNumber
          }
        })
      },
      rejectHandler(row) {
        var that = this
        var obj = {
          withId: row.withId,
          sign: 3
        }
        that.global.axiosGetReq('/userWith/YesOrNo',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.$message({
              type: 'success',
              message: '未通过!'
            });
            that.queryHandler();
          }
        })
      },
      //通过操作
      passHandler(row) {
        var that = this;
        that.$confirm('确定通过将打款至该账户，是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            withId: row.withId,
            sign: 2
          }
          that.global.axiosGetReq('/userWith/YesOrNo',obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.$message({
                type: 'success',
                message: '已通过!'
              });
              that.queryHandler();
            }
          })
        }).catch(() => {});
      },
    },
  }
</script>

<style>
.userListWrap .el-select .el-input {
    width: 110px;
  }
.userListWrap   .asgagewgf h3{
    font-weight: 500;
    line-height: 50px;
    color: #20a0ff;
  }
.userListWrap   .asgagewgf .personalInfor{
    position: relative;
  }
.userListWrap   .asgagewgf .personalInfor img{
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
  }
.userListWrap   .asgagewgf  span{
    width: 40%;
    display: inline-block;
    line-height: 35px;
  }
  .block{
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>

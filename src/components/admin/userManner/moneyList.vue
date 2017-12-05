<template>
  <el-row class="moneyWrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>用户管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>乾币列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col  class="toolbar" style="padding-bottom: 0px;padding-top:20px;">
      <el-form :inline="true" >
        <el-form-item label="用户手机号：">
          <el-input v-model="searchUserId"></el-input>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker v-model="searchDataPrev" type="daterange" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="searchAll" :loading='loadingCheckHead'>查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col style="text-align:right;line-height:40px;">
      <el-button type="text" @click="changeUserMoney"><i class="el-icon-edit"></i>修改用户乾币</el-button>
    </el-col>

    <el-table :data="moneyList"  border style="width: 100%">
      <el-table-column prop="user.phone" width="200px" align="center" label="用户手机号"></el-table-column>
      <el-table-column prop="qbRget" align="center" label="收入"></el-table-column>
      <el-table-column prop="qbRout" align="center" label="支出"></el-table-column>
      <el-table-column prop="balance" align="center" label="余额"></el-table-column>
      <el-table-column prop="time" align="center" label="时间"></el-table-column>
      <el-table-column prop="remark" align="center" label="描述"></el-table-column>
    </el-table>

    <el-dialog custom-class="" title="修改用户乾币：" size="tiny" :visible.sync="showChangeUserMoney" :before-close="handleClose">
      <div class="dialog-l">
        <p class="tel">手机号：</p>
        <p class="tel">乾币类型：</p>
        <p>当前乾币数：</p> 
      </div>
      <div class="dialog-r">
        <el-input class="input" v-model="submit.userPhone" placeholder="请输入手机号"></el-input><br>
      <el-select class="input" v-model="submit.qbType" placeholder="请选择类型">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
    <el-button type="primary" @click="inquiry(submit)" :loading='loadingCheck'>查询</el-button><br>
     <span id="count" class="count">{{submits.counts}}</span>
      </div><br><br>

      <hr><br>

      <div class="dialog-l">
        <p class="tel">修改类型：</p>
        <p class="tel">数量：</p>
        <p class="tel">修改后的数量：</p>
      </div>
      <div class="dialog-r">
          <el-radio class="radio" v-model="submits.sign" label="2">增加乾币</el-radio>
          <el-radio class="radio" v-model="submits.sign" label="1">减少乾币</el-radio><br>
          <el-input class="input" v-model="submits.qbBalance" placeholder="请输入数量" @input="changeQb" @blur="qbDed"></el-input><br>
          <span v-if="parseInt(submits.qbBalance)" id="count" class="count">{{submits.sign == '1'?submits.countsss=parseInt(submits.counts)-parseInt(submits.qbBalance):submits.countsss=parseInt(submits.counts)+parseInt(submits.qbBalance)}}</span>
          <span class="count" v-else>0</span>
      </div><br>

      <div class="dialog">
        <el-button @click="save(submits)">保存</el-button>
      </div>      
      <!--<el-form :inline="true">
        <el-form-item>
          <el-input v-model="nowUserMoneyNum">
              <el-option label="手机号" value="1"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="search" :loading='loadingCheck'>查询</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" >
        <el-form-item label="当前乾币币数：">
          <el-input v-model="yayiCoin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="saveUserMoney">保存</el-button>
        </el-form-item>
      </el-form>-->
    </el-dialog>
    <div class="block">
      <!-- 分页 -->
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="prev, pager, next, jumper" :total="totalCount" v-show="this.totalCount > this.pagesize">
      </el-pagination>
      <!-- 分页 -->
    </div>
  </el-row>
</template>
<script>
  import util from '../../../common/util'
  export default{
    data(){
      return {
        // count:'0',
        // counts:'0',
        // countss:'0',
        // countsss:'0',
        submit:{
          userPhone:'',
          qbType:''
        },
        submits:{
          qbBalance:'0',
          counts:'0',
          countss:'0',
          countsss:'0',
          sign:'2'   
        },
        options: [{
          value: 'qb_balance',
          label: '免费赠送'
        }, {
          value: 'c_qb',
          label: '9.5折'
        }, 
        // {
        //   value: 'b_qb',
        //   label: '9折'
        // },
        {
          value: 'a_qb',
          label: '8折'
        }],
        value: '',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        searchDataPrev: [],
        startDate: '',
        endDate: '',
        searchUserId: '',
        nowUserMoneyNum:'',
        yayiCoin: '',
        selectSearchType:"手机号",
        showChangeUserMoney:false,
        loadingCheck: false,
        loadingCheckHead: false,
        moneyList:[],
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1,
      }
    },
    created: function() {
      var that = this;
      that.getClassify()
    },
    watch: {
      submits: {
        handler: function() {
          var that = this
          var r = /^\d+$/;　　//正整数+0
          if (!r.test(that.submits.qbBalance)) {
            that.$message.error('请输入正整数！');
            return false
          }
          if (that.submits.sign == '1' && parseInt(that.submits.qbBalance) > parseInt(that.submits.counts)) {
            that.submits.qbBalance = that.submits.counts
            that.$message.error('减少乾币数量大于当前乾币数！');
            return false
          }
        },
        deep: true
      },
    },
    methods: {
      // 查询手机号
      // search: function() {
      //   var that = this;
      //   if (that.nowUserMoneyNum == '') {
      //     that.$message.error('请填写手机号！');
      //     return false
      //   }
      //   var obj = {
      //     userPhone: that.nowUserMoneyNum,
      //   }
      //   that.loadingCheck = true;
      //   that.global.axiosGetReq('/userQbList/queryQb',obj).then((res) => {
      //     if (res.data.callStatus === 'FAILED') {
      //       that.loadingCheck = false
      //       that.yayiCoin = ''
      //       that.$message.error('手机号不存在！')
      //     }
      //     if (res.data.callStatus === 'SUCCEED') {
      //       that.loadingCheck = false
      //       that.yayiCoin = res.data.data.qbBalance
      //     }
      //     // that.$message.error('网络出错，请稍后再试！');
      //   })
      // },
      changeQb: function() {
        var that = this
        // // console.log(!re.test(that.submits.qbBalance))
        // console.log(parseInt(that.submits.qbBalance)==NaN)
        // if (that.submits.sign == '1' && parseInt(that.submits.qbBalance) > parseInt(that.submits.counts)) {
        //   that.submits.qbBalance = that.submits.counts
        // } else if (parseInt(that.submits.qbBalance) == NaN) {
        //   console.log('222')
        //   that.submits.qbBalance = 0
        // }
      },
      qbDed: function() {
        var that = this
        console.log('111')
      },
      // 查询手机号
      inquiry(submit){
        var that = this
        if (that.submit.userPhone == '') {
          that.$message.error('请输入正确的手机号！')
          return false
        }
        if (that.submit.qbType == '') {
          that.$message.error('请输入乾币类型！')
          return false
        }
        that.loadingCheck = true;
        that.global.axiosGetReq('/userQbList/queryQb', submit).then(res=>{
          console.log(res)
          if (res.data.callStatus === 'SUCCEED') {
            that.loadingCheck = false
            that.submits.counts = res.data.data.qbBalance
            that.submits.countsss = that.submits.counts
            return false
          }
          if (res.data.callStatus === 'FAILED') {
            that.loadingCheck = false
            that.$message.error('手机号不存在！')
            that.submit.qbType = ''
            return false
          }
        })
      },
      save(submits){
        if (this.submit.userPhone == '') {
          this.$message.error('请输入正确的手机号！')
          return false
        }
        if (this.submit.qbType == '') {
          this.$message.error('请输入乾币类型！')
          return false
        }
        // if (this.submits.sign == '') {
        //   this.$message.error('请输入修改类型！')
        //   return false
        // }
        if (this.submits.qbBalance == '') {
          this.$message.error('请输入修改数量！')
          return false
        }
        this.global.axiosPostReq('/userQbList/update ', Object.assign(this.submits,{phone:this.submit.userPhone,qbType:this.submit.qbType})).then(res=>{
          console.log(res)
          if (res.data.callStatus == 'SUCCEED') {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            this.handleClose()
            this.getClassify()
          } else {
            this.$message.error('保存失败！');
          }
        })
      },
      //分页
      handleCurrentChange(val) {
        var that = this
        that.currentPage = val
        that.searchAll(val)
      },
      //获取用户钱币列表
      getClassify: function() {
        var that = this;
        var obj = {
          phone: that.searchUserId,
          startDate: that.startDate,
          endDate: that.endDate,
          currentPage: that.currentPage,
          numberPerPage: that.pagesize,
          token: ''
        }
        that.global.axiosGetReq('/userQbList/list',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.moneyList = res.data.data;
            that.totalCount = res.data.totalNumber;
            that.startDate = ''
            that.endDate = ''
            for (var i = 0; i < that.moneyList.length; i++) {
              that.moneyList[i].time = that.moneyList[i].qbTime
              console.log(12344)
              that.moneyList[i].balance = that.moneyList[i].qbBalances
              // that.moneyList[i].balance = "\"赠\":" + that.moneyList[i].user.qbBalance + '个；' + "\"8.0折\":" + that.moneyList[i].user.aQb + '个；' + "\"9.0折\":" + that.moneyList[i].user.bQb + '个；' + "\"9.5折\":" + that.moneyList[i].user.cQb + '个；'
            }
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },

      // 头部查询
      searchAll: function(val) {
        var that = this;
        if (val == undefined || typeof(val) == 'object') {
          that.currentPage = 1
        } else {
          that.currentPage = val
        }
        if (that.searchDataPrev.length == 0 || that.searchDataPrev[0] == null) {
          var obj = {
            phone: that.searchUserId,
            startDate: that.startDate,
            endDate: that.endDate,
            currentPage: that.currentPage,
            numberPerPage: that.pagesize,
            token: ''
          }
          that.loadingCheckHead = true;
          that.global.axiosGetReq('/userQbList/list',obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.loadingCheckHead = false;
              that.moneyList = res.data.data;
              that.totalCount = res.data.totalNumber;
            for (var i = 0; i < that.moneyList.length; i++) {
              that.moneyList[i].time = that.moneyList[i].qbTime
              that.moneyList[i].balance = that.moneyList[i].qbBalances
              // that.moneyList[i].balance = "\"赠\":" + that.moneyList[i].user.qbBalance + '个；' + "\"8.0折\":" + that.moneyList[i].user.aQb + '个；' + "\"9.0折\":" + that.moneyList[i].user.bQb + '个；' + "\"9.5折\":" + that.moneyList[i].user.cQb + '个；'
            }
              that.startDate = ''
              that.endDate = ''
            } else {
              that.loadingCheckHead = false;
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        } else {
          that.startDate = util.formatDate.format(new Date(that.searchDataPrev[0]));
          that.endDate = util.formatDate.format(new Date(that.searchDataPrev[1]));
          var obj = {
            phone: that.searchUserId,
            startDate: that.startDate,
            endDate: that.endDate,
            currentPage: that.currentPage,
            numberPerPage: that.pagesize,
            token: ''
          }
          that.loadingCheckHead = true;
          that.global.axiosGetReq('/userQbList/list',obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.loadingCheckHead = false;
              that.moneyList = res.data.data;
              that.totalCount = res.data.totalNumber;
            for (var i = 0; i < that.moneyList.length; i++) {
              that.moneyList[i].time = that.moneyList[i].qbTime
              that.moneyList[i].balance = that.moneyList[i].qbBalances
              // that.moneyList[i].balance = "\"赠\":" + that.moneyList[i].user.qbBalance + '个；' + "\"8.0折\":" + that.moneyList[i].user.aQb + '个；' + "\"9.0折\":" + that.moneyList[i].user.bQb + '个；' + "\"9.5折\":" + that.moneyList[i].user.cQb + '个；'
            }
            }
          })
        }
      },
      changeUserMoney:function() {
        this.showChangeUserMoney = true;
      },
      // 保存修改
      saveUserMoney:function() {
        var that = this;
        if (that.nowUserMoneyNum == '') {
          that.$message.error('请输入手机号！');
          return false
        }
        if (that.yayiCoin == '') {
          that.$message.error('请输入乾币数量！');
          return false
        }
        var obj = {
          phone: that.nowUserMoneyNum,
          qbBalance: that.yayiCoin,
        }
        that.global.axiosPostReq('/userQbList/update',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.currentPage = 1
            that.getClassify()
            that.nowUserMoneyNum = ''
            that.yayiCoin = ''
            that.showChangeUserMoney = false
          } else {
            that.$message.error('手机号不存在！');
          }
        })
      },
      // 关闭面板时候
      handleClose: function() {
        var that = this;
        that.submit.userPhone = ''
        that.submit.qbType = ''
        that.submits.qbBalance = 0
        that.submits.counts = 0
        that.submits.countss = 0
        that.submits.countsss = 0
        that.submits.sign = '2'
        that.nowUserMoneyNum = ''
        that.yayiCoin = ''
        that.showChangeUserMoney = false

      }
    },
  }
</script>

<style scoped>
  .moneyWrap .el-select .el-input {
    min-width: 110px;
  }
  .el-dialog__header{
    padding:0;
    background:#f2f2f2;
    border-bottom:1px solid #ccc;
    height:40px;
    line-height:40px;
  }
  .el-dialog__title{
    color:#333;
    font-size:16px;
    font-weight:normal;
    margin-left:10px;
  }
  .el-icon-close{
    position:relative;
    top:10px;
    right:5px;
  }
  .input{
    width:290px;
  }
  .el-dialog{
    width:500px;
  }
  .el-dialog__body{
    text-align:center;
  }
  .dialog{
    margin-bottom:20px;
  }
  .el-dialog__body>.dialog>span{
    display :inline-block;
    text-align :right !important;
  }
  .dialog{
    position:relative;
    left:-50px;
    text-align:center;
  }
  .dialog-l{
    width:100px;
    text-align:right;
    float:left;
  }
  .dialog-l p{
    height:36px;
    line-height:36px;
    margin-bottom:20px;
  }
  .dialog-r{
    text-align:left;
  }
  .el-button--default{
    margin-left:20px;
  }
  .input{
    margin-bottom:20px;
  }
  .count{
    position: relative;
    top:8px;
  }
  .radio{
    position: relative;
    top:8px;
    margin-bottom:35px;
  }
  .tel{
    /*width:200px;*/
  }
</style>

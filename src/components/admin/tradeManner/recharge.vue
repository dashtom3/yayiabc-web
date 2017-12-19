<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>交易管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>充值记录</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col class="warp-main">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchUserContent" class="recharge-user">
            <el-select v-model="searchUserStyle" slot="prepend">
              <el-option label="手机号" value="手机号"></el-option>
              <el-option label="姓名" value="姓名"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
         <el-form-item label="充值类型：">
            <el-select v-model="rechargeTypeValue" class="t_select_width" placeholder="请选择">
              <el-option  v-for="item in rechargeType" class="t_select_width"  :key="item.value"  :label="item.label"  :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="支付方式：">
          <el-select v-model="rechargePayTypeValue">
            <el-option v-for="item in rechargePayType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值时间：">
            <el-date-picker  v-model="rechargeValue"  type="daterange"  placeholder="选择时间范围" @change="selectDateRecharge">  </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="searchRecharge()">查询</el-button>
        <el-button @click="exportRecharge()">导出已查询的数据</el-button>
      </el-form>
      <!--列表-->
      <el-table :data="rechargeData" border>
        <el-table-column prop="trueName" label="姓名" align="center" ></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center" ></el-table-column>
        <el-table-column align="center" label="充值类型" width="180">
            <template scope="scope">
              <span>{{scope.row.qbRget.split(':')[0]}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="充值个数" width="180">
            <template scope="scope">
              <span>{{scope.row.qbRget.split(':')[1]}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="充值金额">
            <template scope="scope">
              <span>{{scope.row.qbRget.substring(1, scope.row.qbRget.split(':')[0].length-3) / 10 * scope.row.qbRget.split(':')[1].substring(0, scope.row.qbRget.split(':')[1].length-1)}}元</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="referer" label="支付方式">
            <template scope="scope">
              <span v-if="scope.row.referer == '1'">支付宝支付</span>
              <span v-if="scope.row.referer == '4'">微信支付（全部）</span>
              <span v-if="scope.row.referer == '2'">微信支付（公众号/网站）</span>
              <span v-if="scope.row.referer == '3'">微信支付（APP）</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="qbTime" label="充值时间"></el-table-column>
      </el-table>
      <div class="block" v-show="rechargeData.length>0">
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="prev, pager, next, jumper" :total="totalCount" v-show="totalCount > pagesize">
        </el-pagination>
        <!-- 分页 -->
      </div>
    </el-col>
	</el-row>
</template>

<script>
  export default {
    data() {
      return {
        searchUserContent: null,
        searchUserStyle: "手机号",
        // 充值类型
        rechargeType: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '0',
            label: '9.5折'
          },
          {
            value: '1',
            label: '8折'
          }
        ],
         // 充值方式
        rechargePayType: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '支付宝支付'
          },
          {
            value: '4',
            label: '微信支付（全部）'
          },
          {
            value: '3',
            label: '微信支付（APP）'
          },
          {
            value: '2',
            label: '微信支付（公众号/网站）'
          }
        ],
        rechargeTypeValue: '全部',
        rechargePayTypeValue: '全部',
        currentPage: 1,
        pagesize: 10,
        totalCount: 0,
        rechargeData: [],
        rechargeValue: "",
        rechargeCTime: "",
        rechargeETime: ""
      }
    },
    created(){
      this.getRechargeList();
    },
    methods: {
      selectDateRecharge(val){
        if(val){
          this.rechargeCTime = val.split(' - ')[0]
          this.rechargeETime = val.split(' - ')[1]
        }else{
          this.rechargeCTime = ''
          this.rechargeETime = ''
        }
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.searchRecharge(val)
      },
      getRechargeList:function(){
        var that = this;
        var obj = {
          userMessage:"",
          QbType:"",
          payType:"",
          orderCTime:"",
          orderETime:"",
          currentPage:that.currentPage,
          numberPerpage: that.pagesize
        };
        that.global.axiosPostReq('/userQbList/queryQbRecord', obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.rechargeData = res.data.data;
            // that.pagesize=res.data.totalPage;
            //当前页码
            // that.currentPage=res.data.currentPage;
            //默认数据总数
            that.totalCount=res.data.totalNumber;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      // 查询充值记录
      rechargeCurrentChange(val) {
        this.currentPage = val
        this.searchRecharge(val)
      },
      searchRecharge:function(val){
        var that = this;
        if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }
        var obj = {};
        // 搜索用户类型
        obj.userMessage = that.searchUserContent;
        if (obj.userMessage == null) {
          obj.userMessage = ''
        }
        if(that.rechargeTypeValue === '全部' || that.rechargeTypeValue === ''){
          obj.QbType = ''
        } else if (that.rechargeTypeValue == 0) {
          obj.QbType = '9.5'
        } else if (that.rechargeTypeValue == 1) {
          obj.QbType = '8.0'
        }
        if(that.rechargePayTypeValue === "全部"){
          that.rechargePayTypeValue = "";
        }
        obj.payType = that.rechargePayTypeValue
        if(this.rechargeCTime !== ''){
          obj.orderCTime = that.rechargeCTime
          obj.orderETime = that.rechargeETime
        }
        obj.currentPage = that.currentPage
        obj.numberPerpage = that.pagesize
        that.global.axiosPostReq('/userQbList/queryQbRecord',obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.rechargeData = res.data.data;
            that.currentPage = res.data.currentPage
            that.totalCount=res.data.totalNumber;
            return
          }
          that.rechargeData = [];
        })
      },
      exportRecharge(val) {
        var that = this;
        if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }
        var obj = {};
        // 搜索用户类型
        // if(that.searchUserStyle=="手机号"){
        //   obj.userMessage = that.searchUserContent;
        // }else if(that.searchUserStyle=="姓名"){
        //   obj.userMessage = that.searchUserContent;
        // }
        obj.userMessage = that.searchUserContent;
        if (obj.userMessage == null) {
          obj.userMessage = ''
        }
        if(that.rechargeTypeValue === '全部' || that.rechargeTypeValue === ''){
          obj.QbType = ''
        } else if (that.rechargeTypeValue == 0) {
          obj.QbType = '9.5'
        } else if (that.rechargeTypeValue == 1) {
          obj.QbType = '8.0'
        }
        if(that.rechargePayTypeValue === "全部"){
          that.rechargePayTypeValue = '';
        }
        obj.payType = that.rechargePayTypeValue
        if(this.rechargeCTime !== ''){
          obj.orderCTime = that.rechargeCTime
          obj.orderETime = that.rechargeETime
        } else {
          obj.orderCTime = ''
          obj.orderETime = ''
        }
        window.open(this.global.baseUrl+'/userQbList/queryQbRecord?userMessage='+ obj.userMessage+'&QbType='+obj.QbType+'&payType='+obj.payType+'&orderCTime='+obj.orderCTime+'&orderETime='+obj.orderETime)
        // that.global.axiosPostReq('/userQbList/queryQbRecord',obj)
        // .then((res) => {
        //   if (res.data.callStatus === 'SUCCEED') {
        //     console.log(123);
        //     return
        //   }
        // })
      }
    }
  }
</script>
<style>
  #inputCenter input{
    text-align: center;
  }
  .recharge-user .el-select .el-input {
    width: 110px;
  }
</style>
<style scoped>
  
.el-table th>.cell{
  text-align: center;
}
.invoiceDetails li {
  line-height:40px;
}
.invoiceDetails li span:nth-child(1){
  display:inline-block;
  width:100px;
  text-align: right;
}
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
	width:280px;
}
.t_select_width{
	width:200px;
}
.t_data_width{
	width:400px;
}
.detail_h3{
  margin-bottom:16px;
}
.detail_h4{
  border-bottom:1px solid #ccc;
  margin-bottom:8px;
  padding-bottom:4px;
}
.recharge .t_select_width{
	width:80px;
}
.recharge .teshu{
	width:160px;
}
/*订单信息*/
.order_header{
  background: #eee;
  /*height: 40px;*/
  line-height: 40px;
}
.order_box{
  position: relative;
  min-height: 132px;
  border: 1px solid #eee;
}
.order_content{
  width: 70%;
  padding: 20px 0;
  border-right: 1px solid #eee;
  border-top:1px solid #eee;
  box-sizing:border-box;
}
.order_sum{
  position: absolute;
  right: 0;
  /* top: -1px; */
  top: 35px;
  width: 30%;
  border-left: none;
  text-align: center;
  box-sizing:border-box;
}
.order_content:nth-of-type(1){
  border-top: none;
}
.order_h{
  /*padding-top: 18px;*/
  /* line-height: 31px; */
  line-height: 26px
}
.pay_info li:nth-child(1){
  margin-top: 18px
}
.money_wrapper{
  height: 40px;
  font-size: 0
}
.money_wrapper *{
  display: inline-block;
  line-height: 40px
}
.money_wrapper img{
  margin-right: 7px;
  vertical-align: middle;
}
.money_wrapper i{
  margin-right: 29px;
  vertical-align: top;
  font-size: 20px;
  color: rgb(102, 102, 102)
}
.img_list{
  text-align: center;
  margin-left: 18px;
  border: 1px solid #ccc;
  padding-left: 6px;
}
.goods_common{
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.i_col_red{
  color: #cb1700;
  font-style: normal;
}
.margin_l_30{
  margin-left: 30px;
}
/*支付方式*/
.pay_info{
  padding-bottom: 30px;
}
.pay_info li{
  height: 40px;
  line-height: 40px;
}
/*卖家备注*/
.seller_remark{
  height: 120px;
  padding-top: 20px;
  border-top: 1px solid #666;
}
.remark_content{
  padding-left: 60px;
}
/*退款信息*/
.refund_info{
  padding-top: 20px;
  border-top: 1px solid #666;
}
.refund_tb{
  width: 100%;
  border-collapse: collapse;/* 边框合并属性  */
  border: none;
  margin-top: 20px;
}
.refund_tb tr{
  width: 100%;
  height: 46px;
  border: 1px solid #ccc;
}
.bgc{
  background: #eee;
}
.refund_tb td{
  text-align: center;
  padding: 4px 2px;
  border: 1px solid #ccc;
}
.icon_i_l{
  font-style:normal;
  font-size:20px;
  padding-right:12px;
  cursor: pointer;
}
.icon_i_r{
  font-style:normal;
  font-size:20px;
  padding-left:12px;
  cursor: pointer;
}
.i_disabled{
  color: #ccc;
  cursor: default;
}

.btn_{
  margin-left: 154px;
}
.btn_box{
  width: 260px;
  margin: 20px auto;
}
._btn{
  width: 120px;
}
</style>

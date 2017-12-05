<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>商品统计</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
      <el-form :inline="true" class="clearfix">
        <el-form-item class="fl">
          <el-input v-model="sel_input" class="t_input_w">
            <el-select v-model="sel_value" slot="prepend" class="t_select_width" @change="selectOpt">
              <el-option
                v-for="item in goodsName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="品牌名称" class="fl">
          <el-select v-model="brandName">
            <el-option
              v-for="item in brands"
              :key="item.value1"
              :label="item.label1"
              :value="item.value1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间" class="fl">
          <el-date-picker
            v-model="dateVal"
            style="width:230px;"
            type="daterange"
            @change="dateHandler"
            placeholder="选择日期范围">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="fl">
          <el-button type="primary" @click="queryHandler">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="tatalSales">
        <span class="total-sale">总销售额： {{total_sale}}</span>
      </div>

      <!--商品列表-->
      <el-table :data="goodsList" border @sort-change="sortRefundHandler">
        <el-table-column prop="itemName" label="商品名称+属性" width="220" align="center" >
          <template scope="scope">
            <span>{{scope.row.itemName}}</span>
            <div>
              <span>{{scope.row.itemPropertyInfo}}</span>
              <span v-if="scope.row.itemPropertyTwoValue">;</span>
              <span>{{scope.row.itemPropertyTwoValue}}</span>
              <span v-if="scope.row.itemPropertyThreeValue">;</span>
              <span>{{scope.row.itemPropertyThreeValue}}</span>
              <span v-if="scope.row.itemPropertyFourValue">;</span>
              <span>{{scope.row.itemPropertyFourValue}}</span>
              <span v-if="scope.row.itemPropertyFiveValue">;</span>
              <span>{{scope.row.itemPropertyFiveValue}}</span>
              <span v-if="scope.row.itemPropertySixValue">;</span>
              <span>{{scope.row.itemPropertySixValue}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="itemSKU" label="sku代码" width="150" align="center" >
        </el-table-column>
        <el-table-column prop="itemBrandName" label="品牌名称" align="center" >
        </el-table-column>
        <el-table-column prop="price" label="价格（元）" align="center" >
        </el-table-column>
        <el-table-column prop="sales" label="销量" sortable="sales" align="center" >
        </el-table-column>
        <el-table-column prop="salesMoney" label="销售额（元）" sortable="salesMoney" width="160"  align="center" >
        </el-table-column>
        <el-table-column prop="refundNum" label="累计退款次数" sortable="refundNum" align="center">
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
  import global from '../../global/global'
  import util from '../../../common/util'
  export default {
    data() {
      return {
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1,
        goodsName: [{
          value: '1',
          label: '商品名称'
        }, {
          value: '2',
          label: '商品编号'
        }, {
          value: '3',
          label: 'sku代码'
        }],
        total_sale: 0,
        sel_value: '1',
        brandName: '',
        state: '1',
        brands: [{
          value1: '',
          label1: '全部'
        }],
        sel_input: '',
        goodsList: [],
        dateVal: [new Date(new Date().setDate(1)), new Date()],
        startDate: '',
        endDate: ''
      }
    },
    created(){
      this.startDate = util.formatDate.format(new Date(this.dateVal[0]));
      this.endDate = util.formatDate.format(new Date(this.dateVal[1].getTime()));
      this.queryBrand()//查询所有品牌
      this.queryHandler()
    },
    methods: {
      dateHandler(val){
        var that = this
        //时间查询条件
        if(that.dateVal && that.dateVal[0]){
          this.startDate = util.formatDate.format(new Date(that.dateVal[0]));
          this.endDate = util.formatDate.format(new Date(that.dateVal[1].getTime())); 
        }else{
          this.startDate = '';
          this.endDate = '';  
        }
      },
      sortRefundHandler({ prop }){
        if(prop === "sales"){
          this.state = "1"
          this.queryHandler()
        }else if(prop === "refundNum"){
          this.state = "2"
          this.queryHandler()
        }else if(prop === "salesMoney"){
          this.state = "3"
          this.queryHandler()
        }
      },
      handleCurrentChange(val) {
        this.currentPage = val 
        this.queryHandler(val)
      },
      queryBrand(){
        var params = {
          itemBrandName: '',
          itemBrandHome: ''
        }
        
        global.axiosPostReq('/item/queryItemBrand',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            var result = res.data.data;
            for(var i=0; i<result.length; i++){
              this.brands.push({
                value1: result[i].itemBrandName,
                label1: result[i].itemBrandName
              })
            }
          }
        })
      },
      queryHandler(val){
        var params;
        if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }
        if(this.sel_value == '1'){
          params = {
            state: this.state,
            itemName: this.sel_input,
            itemId: '',
            itemSKU: '',
            startDate: this.startDate,
            endDate: this.endDate,
            itemBrandName: this.brandName,
            currentPage: this.currentPage,
            numberPerPage: this.pagesize,
            token: global.getToken()
          }
        }else if(this.sel_value == '2'){
          params = {
            state: this.state,
            itemName: '',
            itemId: this.sel_input,
            itemSKU: '',
            startDate: this.startDate,
            endDate: this.endDate,
            itemBrandName: this.brandName,
            currentPage: this.currentPage,
            numberPerPage: this.pagesize,
            token: global.getToken()
          }
        }else if(this.sel_value == '3'){
          params = {
            state: this.state,
            itemName: '',
            itemId: '',
            startDate: this.startDate,
            endDate: this.endDate,
            itemSKU: this.sel_input,
            itemBrandName: this.brandName,
            currentPage: this.currentPage,
            numberPerPage: this.pagesize,
            token: global.getToken()
          }
        }
        global.axiosGetReq('/itemStatistics/query',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.goodsList = res.data.data
            this.total_sale = res.data.msg && parseFloat(res.data.msg).toFixed(2) || 0
            this.totalCount = res.data.totalNumber
          }
        })
      },
      selectOpt(key){
        this.sel_value = key;
        this.sel_input = '';
      }
    }
  }
</script>
<style>
  .el-table .sort-caret.ascending{
    display: none;
  }
  .el-table .sort-caret.descending{
    bottom: 12px;
  }
</style>

<style scoped>
  .total-sale{
    margin-right: 30px;
  }
  .tatalSales{
    float: right;
    margin: 20px;
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
  .t_input_w{
    width:320px!important;
  }
  .t_select_width{
    width:110px;
  }
  
</style>
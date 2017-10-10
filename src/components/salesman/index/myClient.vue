<template>
  <div class="myClient">
    <div class="searchWrap" >
      <input type="text" v-model="searchData" placeholder="输入客户姓名，手机号或单位名称查询">
      <div class="imgWrap" @click="search()">
        <img src="../../../images/salesMan/search.png" alt="">
      </div>
    </div>
    <div class="bindedClient" @click="goToFindClient()">
      <span class="span1">
        已绑定客户数：
        <span>{{totalCount}}</span>
      </span>
      <span class="span2">
        <img src="../../../images/salesMan/toRight.png" alt="">
        发现更多客户
      </span>
    </div>
    <div class="clientList">
      <el-table :data="tableData" border @sort-change="sortHandler" style="width: 100%;text-align:center">
        <el-table-column align="center"  prop="trueName" label="客户姓名"  ></el-table-column>
        <el-table-column align="center"  prop="phone" label="客户手机号"  ></el-table-column>
        <el-table-column align="center"  prop="companyName" label="单位名称"  ></el-table-column>
        <el-table-column align="center"  prop="workAddress" label="单位地址"  ></el-table-column>
        <el-table-column align="center"  prop="orderaCount" width="160" label="累计订单数" sortable="orderaCount" ></el-table-column>
        <el-table-column align="center"  prop="orderaMoneyCount" width="160" label="累计消费(元)" sortable="orderaMoneyCount" ></el-table-column>
        <el-table-column align="center"  prop="latelyOrderDate" label="最近一次下单时间" sortable="latelyOrderDate" width="200"  ></el-table-column>
        <el-table-column align="center"  prop="bindSaleTime" label="绑定时间" sortable="bindSaleTime"  width="200"></el-table-column>
      </el-table>
      <div class="block" style="position:absolute;top:450px;right:0;" v-show="this.totalCount > this.pagesize">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  <el-dialog title="" :visible.sync="dialogVisibleInit" size="tiny" :before-close="handleClose">
    <span>您好，您查看的相关个人销售数据需要完善个人资料～</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="nowComplete">立即完善</el-button>
      <el-button @click="noSee">暂时不看</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
  import Bus from '../../global/bus.js'
  export default {
    name: 'myClient',
    data () {
      return {
        nowBtn:1,
        searchData:null,
        tableData:[],
        pagesize: 10,
        currentPage: 1,
        totalCount: 1,
        state: '1',
        dialogVisibleInit: false
      }
    },
    created: function() {
      var that = this
      var trueName = that.global.getSalesUser().trueName
      var sex = that.global.getSalesUser().sex
      var idCard = that.global.getSalesUser().idCard
      var weChar = that.global.getSalesUser().weChar
      // if (trueName==null||sex==null||idCard==null||weChar==null) {
      //   that.dialogVisibleInit = true
      // }
      that.search();
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val 
        this.search(val)
      },
      sortHandler: function({ prop }){
        if(prop === "latelyOrderDate"){
          this.state = "2"
          this.search()
        }else if(prop === "bindSaleTime"){
          this.state = "1"
          this.search()
        }else if(prop === "orderaCount"){
          this.state = "3"
          this.search()
        }else if(prop === "orderaMoneyCount"){
          this.state = "4"
          this.search()
        }
      },
      // dialog关闭
      handleClose: function() {
        var that = this
        that.dialogVisibleInit = false
        Bus.$emit('getTarget', 'noSee');
      },
      // 立即完善
      nowComplete: function() {
        var that = this
        Bus.$emit('getTarget', 'nowComplete');
      },
      // 暂时不看
      noSee: function() {
        var that = this
        Bus.$emit('getTarget', 'noSee');
      },
      goToFindClient:function(){
        var that = this;
        that.$emit('msgFromChild', 'goToFindClient' )
      },
      search:function(val){
        var that = this;
        if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }
        var obj = {
          value:that.searchData,
          token:that.global.getSalesToken(),
          state: this.state,
          currentPage: this.currentPage,
          numberPerPage: this.pagesize
        };
        that.global.axiosGetReq("/saleMyClient/myClient",obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.tableData = res.data.data
            this.totalCount = res.data.totalNumber
          }
        })
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
  .el-table .cell{
    padding-left: 0;
    padding-right: 0;
  }
</style>
<style scoped>
.myClient{
  width: 1200px;
  margin: auto;
  min-height:676px;
}
.clientList{
  margin-bottom: 100px;
  position: relative;
}
.bindedClient{
  margin-bottom: 5px;
  margin-top: 5px;
}
.bindedClient .span1 span{
  color: #db1e06;
  font-weight: 600;
}
.bindedClient .span2{
  float: right;
  cursor: pointer;
  color:#005aab;
}
.searchWrap{
  border: 1px solid #005aab;
  width: 500px;
  border-radius: 2px;
  margin-top: 30px;
  cursor: pointer;
  margin-bottom: 25px;
}
.myClientHeadBtn{
  margin-top: 30px;
}
.myClientHeadBtn span{
  display: inline-block;
  line-height: 40px;
  text-align: center;
  padding: 0 10px;
  cursor: pointer;
}
.myClientHeadBtn .sapnActive{
  color: white;
  background: #005aab;
}
.searchWrap input{
  border: none;
  outline: none;
  line-height: 40px;
  margin-left: 30px;
  width: 400px;
}
.searchWrap .imgWrap{
  display: inline-block;
  float: right;
  width: 46px;
  border-left: 1px solid #005aab;
  height: 40px;
}
.searchWrap .imgWrap img{
  margin-top: 8px;
  margin-left: 8px;
}

</style>

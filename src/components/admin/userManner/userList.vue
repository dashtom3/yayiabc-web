<template>
  <el-row class="userListWrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>用户管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col  class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" >
          <el-form-item>
            <el-input v-model="searchUserContent">
              <el-select v-model="searchUserStyle" slot="prepend" placeholder="请选择">
                <el-option label="手机号" value="手机号"></el-option>
                <el-option label="真实姓名" value="真实姓名"></el-option>
                <el-option label="单位名称" value="单位名称"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="是否绑定销售：">
            <el-select v-model="searchisBindSale" placeholder="请选择">
              <el-option  v-for="item in options"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型：">
            <el-select v-model="searchtype" placeholder="请选择">
              <el-option  v-for="item in types"  :key="item.value"  :label="item.label"  :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售员名称：">
            <el-input v-model="searchSaleName"></el-input>
          </el-form-item>
          <el-form-item label="销售员手机号：">
            <el-input v-model="searchSalePhone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="queryHandler()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data="userList"  border style="width: 100%">
        <el-table-column  prop="trueName"  align="center"  label="用户姓名">  </el-table-column>
        <el-table-column  prop="phone"  align="center"  label="手机号"> </el-table-column>
        <el-table-column  prop="companyName"  align="center"  label="单位名称">  </el-table-column>
        <el-table-column  prop="type"  align="center"  label="类型">
          <template scope="scope">
            <span v-if="scope.row.type==1">个人</span>
            <span v-if="scope.row.type==2">机构</span>
          </template>
        </el-table-column>
        <el-table-column  prop="isBindSale"  align="center"  label="是否绑定销售">
          <template scope="scope">
            <span v-if="scope.row.isBindSale==1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column  prop="salePhone" align="center"  label="销售员手机号">  </el-table-column>
        <el-table-column  prop="saleName" align="center"  label="销售员名称">  </el-table-column>
        <el-table-column  prop="userCreated" align="center"  label="注册时间">  </el-table-column>
        <el-table-column  label="操作" align="center">
          <template scope="scope">
            <el-button v-if="scope.row.isBindSale==1"  type="text"  v-on:click="cancelBindSale(scope.$index,scope.row)">取消绑定</el-button>
            <el-button v-else  type="text"  v-on:click="addBindSale(scope.$index,scope.row)">绑定销售</el-button>
            <el-button type="text" v-on:click="details(scope.$index,scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <!-- 分页 -->
        <el-pagination @current-change="pageHandler" :current-page.sync="currentPage" :page-size="pagesize" layout="prev, pager, next, jumper" :total="totalCount" v-show="this.totalCount > this.pagesize">
        </el-pagination>
        <!-- 分页 -->
      </div>

    </el-col>
    <el-dialog title="绑定销售员" :visible.sync="showBindSalAlert" @close="closeHandler">
      <el-form :inline="true" >
        <el-form-item>
            <el-select v-model="bindSaleSearchType" placeholder="请选择">
              <el-option label="手机号" value="手机号"></el-option>
              <el-option label="真实姓名" value="真实姓名"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="bindSaleSearchCont" placeholder="请输入内容">
            <el-button slot="append" icon="search" v-on:click="searchSalse()"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <el-table height="500" :data="salesList" border>
        <el-table-column align="center" property="phone" label="手机号"></el-table-column>
        <el-table-column align="center" property="trueName" label="真实姓名" width="200"></el-table-column>
        <el-table-column align="center" property="hehushu" label="操作">
          <template scope="scope">
            <el-button type="text" v-on:click="bandThisSale(scope.$index,scope.row)">绑定</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange"  :current-page.sync="bindSaleCurrentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="bindSaleNumTotal"
        v-show="this.bindSaleNumTotal > this.bindSalePagesize">
      </el-pagination>
    </el-dialog>

    <!-- 用户详情 -->
    <el-dialog custom-class="asgagewgf" title="用户详情" :visible.sync="showUserDetailInfor">
      <div class="personalInfor">
        <img v-if="someOneUserDetails.userPic" :src="someOneUserDetails.userPic" alt="">
        <h3>个人信息</h3>
        <div>
          <span style="width:400px;display:inline-block;">用户编号：{{someOneUserDetails.userId}}</span>
        </div>
        <div>
          <span>真实姓名：{{someOneUserDetails.trueName}}</span>
          <span>手机号：{{someOneUserDetails.phone}}</span>
        </div>
        <div>
          <span v-if="someOneUserDetails.sex==1">性别：男</span>
          <span v-else-if="someOneUserDetails.sex==2">性别：女</span>
          <span v-else>性别：</span>
          <span>生日：{{someOneUserDetails.birthday}}</span>
        </div>
        <div>
          <span>单位名称：{{someOneUserDetails.companyName}}</span>
          <span>所在地：{{someOneUserDetails.part}}</span>
        </div>
        <div>
          <span>详细地址：{{someOneUserDetails.workAddress}}</span>
        </div>
      </div>
      <div class="certification">
        <h3>资质认证</h3>
        <div>
          <span>类型：{{someOneUserDetails.type | calculateUserType}}</span>
          <!-- <span>单位名称：{{someOneUserDetails.companyName}}</span> -->
        </div>
        <!-- <div>
          <span>所在地：{{someOneUserDetails.part}}</span>
          <span>详细地址：{{someOneUserDetails.workAddress}}</span>
        </div> -->
        <div>
          <div>医师执业资格证：</div>
          <img v-show="bigImgShow1" @click="bigImgShow1=false" style="width:100px;height:100px;display:block" :src="someOneUserDetails.doctorPic" alt="医师执业资格证"  v-if="someOneUserDetails.doctorPic">
          <img v-show="!bigImgShow1" @click="bigImgShow1=true" style="width:400px;height:400px;display:block" :src="someOneUserDetails.doctorPic" alt="医师执业资格证"  v-if="someOneUserDetails.doctorPic">
          <span v-else>无</span>
        </div>
        <div>
          <div>医疗机构执业许可证：</div>
          <img v-show="bigImgShow2" @click="bigImgShow2=false" style="width:100px;height:100px;display:block" :src="someOneUserDetails.medicalLicense" alt="医疗机构执业许可证" v-if="someOneUserDetails.medicalLicense">
          <img v-show="!bigImgShow2" @click="bigImgShow2=true" style="width:400px;height:400px;display:block" :src="someOneUserDetails.medicalLicense" alt="医疗机构执业许可证" v-if="someOneUserDetails.medicalLicense">
          <span v-else>无</span>
        </div>
        <div>
          <div>营业执照：</div>
          <img v-show="bigImgShow3" @click="bigImgShow3=false" style="width:100px;height:100px;display:block" :src="someOneUserDetails.businessLicense" alt="营业执照" v-if="someOneUserDetails.businessLicense">
          <img v-show="!bigImgShow3" @click="bigImgShow3=true" style="width:400px;height:400px;display:block" :src="someOneUserDetails.businessLicense" alt="营业执照" v-if="someOneUserDetails.businessLicense">
          <span v-else>无</span>
        </div>
        <div>
          <div>税务登记证：</div>
          <img v-show="bigImgShow4" @click="bigImgShow4=false" style="width:100px;height:100px;display:block" :src="someOneUserDetails.taxRegistration" alt="税务登记证" v-if="someOneUserDetails.taxRegistration">
          <img v-show="!bigImgShow4" @click="bigImgShow4=true" style="width:400px;height:400px;display:block" :src="someOneUserDetails.taxRegistration" alt="税务登记证" v-if="someOneUserDetails.taxRegistration">
          <span v-else>无</span>
        </div>
        <div>
          <div>开户许可证：</div>
          <img v-show="bigImgShow5" @click="bigImgShow5=false" style="width:100px;height:100px;display:block" :src="someOneUserDetails.openingPermit" alt="开户许可证" v-if="someOneUserDetails.openingPermit">
          <img v-show="!bigImgShow5" @click="bigImgShow5=true" style="width:400px;height:400px;display:block" :src="someOneUserDetails.openingPermit" alt="开户许可证" v-if="someOneUserDetails.openingPermit">
          <span v-else>无</span>
        </div>
        <div>
          
          <div>放射诊疗许可证：</div>
          <img v-show="bigImgShow6" @click="bigImgShow6=false" style="width:100px;height:100px;display:block" :src="someOneUserDetails.radiologicalPermit" alt="放射诊疗许可证" v-if="someOneUserDetails.radiologicalPermit">
          <img v-show="!bigImgShow6" @click="bigImgShow6=true" style="width:400px;height:400px;display:block" :src="someOneUserDetails.radiologicalPermit" alt="放射诊疗许可证" v-if="someOneUserDetails.radiologicalPermit">
          <span v-else>无</span>
        </div>
        <div>
          <div>法人身份证（正面）：</div>
          <img v-show="bigImgShow7" @click="bigImgShow7=false" style="width:100px;height:100px;display:block" :src="someOneUserDetails.idCardPositive" alt="法人身份证（正面）" v-if="someOneUserDetails.idCardPositive">
          <img v-show="!bigImgShow7" @click="bigImgShow7=true" style="width:400px;height:400px;display:block" :src="someOneUserDetails.idCardPositive" alt="法人身份证（正面）" v-if="someOneUserDetails.idCardPositive">
          <span v-else>无</span>
        </div>
        <div>
          <div>法人身份证（反面）：</div>
          <img v-show="bigImgShow8" @click="bigImgShow8=false" style="width:100px;height:100px;display:block" :src="someOneUserDetails.idCardOtherside" alt="法人身份证（反面）" v-if="someOneUserDetails.idCardOtherside">
          <img v-show="!bigImgShow8" @click="bigImgShow8=true" style="width:400px;height:400px;display:block" :src="someOneUserDetails.idCardOtherside" alt="法人身份证（反面）" v-if="someOneUserDetails.idCardOtherside">
          <span v-else>无</span>
        </div>
      </div>
      <h3>绑定的销售</h3>
      <el-table :data="someOneUserDetails.bindSales" border>
        <el-table-column align="center" property="name" label="真实姓名" width="200"></el-table-column>
        <el-table-column align="center" property="phone" label="手机号"></el-table-column>
        <el-table-column align="center" property="time" label="注册时间"></el-table-column>
        <el-table-column align="center" property="hehushu" label="客户数"></el-table-column>
      </el-table>
      <h3>收货地址</h3>
      <el-table :data="someOneUserDetails.receiverList">
        <el-table-column align="center" property="receiverName" label="收货人" width="150"></el-table-column>
         <el-table-column align="center" label="所在地区" width="200">
          <template scope="scope">
            <span>{{scope.row.province}}</span>
            <span>{{scope.row.city}}</span>
            <span>{{scope.row.county}}</span>
         </template>
        </el-table-column>
        <el-table-column align="center" property="receiverDetail" label="详细地址"></el-table-column>
        <el-table-column align="center" property="phone" label="手机/电话"></el-table-column>
      </el-table>
    </el-dialog>
  </el-row>
</template>
<script>
  export default{
    data(){
      return {
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1,
        bindSalePagesize: 10,
        bindSaleCurrentPage:1,
        bindSaleNumTotal:1,
        needBindSaleUserIndex:null,
        needBindUserPhone:null,
        showBindSalAlert:false,
        showUserDetailInfor:false,
        searchUserContent:null,
        searchUserStyle: "手机号",
        searchtype:'全部',
        searchisBindSale:"全部",
        searchSaleName:null,
        searchSalePhone:null,
        bindSaleSearchType:'手机号',
        bindSaleSearchCont:null,
        options: [{
            value: '选项1',
            label: '全部'
          }, {
            value: '选项2',
            label: '是'
          }, {
            value: '选项3',
            label: '否'
          },],
          isBindSale: "全部",
          types: [{
            value: '选项1',
            label: '全部'
          }, {
            value: '选项2',
            label: '个人'
          }, {
            value: '选项3',
            label: '机构'
          },],

        userList:[],
        someOneUserDetails:{
          bindSales:[],
          address:[]
        },
        salesList:[],
        bigImgShow1: true,
        bigImgShow2: true,
        bigImgShow3: true,
        bigImgShow4: true,
        bigImgShow5: true,
        bigImgShow6: true,
        bigImgShow7: true,
        bigImgShow8: true
      }
    },
    created:function(){
      var that = this;
      that.queryHandler();
      // that.bigImgShow1= true;
      // that.bigImgShow2= true;
      // that.bigImgShow3= true;
      // that.bigImgShow4= true;
      // that.bigImgShow5= true;
      // that.bigImgShow6= true;
      // that.bigImgShow7= true;
      // that.bigImgShow8= true;
    },
    filters: {
      calculateUserType:function(data){
        var str = "";
        if(data==1){
          str = "个人";
          return str;
        }
        if (data==2){
          str = "机构";
          return str;
        }
        if (data !==1 && data !==2) {
          str = "";
          return str;
        }
      }
    },
    methods: {
      closeHandler(){
        this.bindSaleSearchCont = ''
      },
      pageHandler(val) {
        this.currentPage = val 
        this.queryHandler(val)
      },
      handleCurrentChange:function(val) {
        this.bindSaleCurrentPage = val
        this.searchSalse(val)
      },
      getOneUserDetails:function(userPhone){
        var that = this;
        var obj = {
          phone:userPhone
        };
        that.global.axiosGetReq('/userManageList/detail',obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.someOneUserDetails = res.data.data;
            var boj2 = {
              name:that.someOneUserDetails.saleName,
              phone:that.someOneUserDetails.salePhone,
              time:that.someOneUserDetails.saleCreated,
              hehushu:that.someOneUserDetails.bindUserNum,
            };
            that.someOneUserDetails.bindSales = [];
            that.someOneUserDetails.bindSales.push(boj2);
          }
        })
      },
      bandThisSale:function(index,one){
        var that = this;
        var obj = {
          salePhone:one.phone,
          userPhone:that.needBindUserPhone
        };
        that.global.axiosPostReq('/userManageList/bind',obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.$message({
              type: 'success',
              message: '绑定成功!'
            });
            var data = that.userList[that.needBindSaleUserIndex];
            data.isBindSale = 1;
            data.saleName = that.salesList[index].trueName;
            data.salePhone = that.salesList[index].phone;
            that.userList.splice(that.needBindSaleUserIndex,1,data);
            that.showBindSalAlert = false;
          }
        })
      },
      addBindSale:function(index,one){
        var that = this;
        that.needBindUserPhone = one.phone;
        that.needBindSaleUserIndex = index;
        that.showBindSalAlert = true;
        this.searchSalse()
      },
      details:function(index,user){
        var that = this;
        that.showUserDetailInfor = true;
        that.getOneUserDetails(user.phone);
      },
      searchSalse:function(val){
        var that = this;
        if (val == undefined || typeof(val) == 'object') {
          this.bindSaleCurrentPage = 1
        } else {
          this.bindSaleCurrentPage = val
        }
        var obj = {};
        if(that.bindSaleSearchType == "手机号"){
          obj.salePhone = that.bindSaleSearchCont;
        }else{
          obj.saleName = that.bindSaleSearchCont;
        }
        obj.currentPage = this.bindSaleCurrentPage;
        obj.numberPerPage = this.bindSalePagesize;

        that.global.axiosGetReq('/userManageList/salelist',obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.salesList = res.data.data;
            that.bindSaleCurrentPage = res.data.currentPage;
            that.bindSaleNumTotal = res.data.totalNumber;
          }
        })
      },
      queryHandler:function(val){
        var that = this;
        if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }
        var obj = {
          saleName:that.searchSaleName
        };
        // 搜索用户类型
        if(that.searchUserStyle=="手机号"){
          obj.phone = that.searchUserContent;
          obj.trueName = "";
          obj.companyName = "";
        }else if(that.searchUserStyle=="单位名称"){
          obj.phone = "";
          obj.trueName = "";
          obj.companyName = that.searchUserContent;
        }else if(that.searchUserStyle=="真实姓名"){
          obj.phone = "";
          obj.trueName = that.searchUserContent;
          obj.companyName = "";
        }
        //类型
        if(that.searchtype=="全部"){
          obj.type = "";
        }else if(that.searchtype=="选项2"){
          obj.type = 1;
        }else if(that.searchtype=="选项3"){
          obj.type = 2;
        }
        //是否绑定销售
        if(that.searchisBindSale=="全部"){
          obj.isBindSale = "";
        }else if(that.searchisBindSale=="选项2"){
          obj.isBindSale = 1;
        }else if(that.searchisBindSale=="选项3"){
          obj.isBindSale = 2;
        }
        if(!that.searchSaleName){
          that.searchSaleName = "";
        }
        if(that.searchSalePhone){
          obj.salePhone = that.searchSalePhone;
        }else{
          obj.salePhone = "";
        }
        obj.currentPage = this.currentPage;
        obj.numberPerPage = this.pagesize;

        that.global.axiosGetReq('/userManageList/userlist',obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.userList = res.data.data;
              that.totalCount=res.data.totalNumber;
            }
          })
      },
      cancelBindSale:function(index,one){
        var that = this;
        that.$confirm('确定取消该绑定吗?', {  confirmButtonText: '确定',  cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            salePhone:one.salePhone,
            userPhone:one.phone
          };
          that.global.axiosPostReq('/userManageList/disBind',obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              var data = that.userList[index];
              data.isBindSale = 2;
              data.saleName = "";
              data.salePhone = "";
              that.userList.splice(index,1,data)
              that.$message({type: 'success',message: '解除成功!'});
            }
          })
        }).catch(() => {

        });
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
  /*.demo-table-expand label {
    font-weight: bold;
  }
  .warp  .warp-main .el-input{
    width: 100%;
    padding-right: 0px;
  }
  .warp .el-input{
    width: 70%;
    padding-right: 20px;
  }*/
</style>

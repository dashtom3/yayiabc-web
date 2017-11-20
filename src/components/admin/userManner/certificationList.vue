<template>

    <div>
    <div @click="popupSwitch = !popupSwitch" v-show="popupSwitch" class="popupBox">
        <img class="popUpImg" :src="popSrc" style="width:700px;height:700px;display:block;margin:auto;" alt="">
    </div>

  <el-row class="certificationWarp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>用户管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>资质列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col class="toolbar" style="padding-bottom: 0px;padding-top:20px;">
      <el-form :inline="true">
        <el-form-item>
            <el-input v-model="searchUserContent">
            <el-select v-model="searchUserType" slot="prepend" @change="selectOpt">
              <el-option label="真实姓名" value="真实姓名"></el-option>
              <el-option label="手机号" value="手机号"></el-option>
              <el-option label="单位名称" value="单位名称"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="searchType">
            <el-option  v-for="item in userTypes"  :key="item.value"  :label="item.label"  :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="searchState">
            <el-option  v-for="item in states"  :key="item.value"  :label="item.label"  :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-dialog title="照片大图" :visible.sync="ifShowBigImg">
      <img :src="bigImgSrc" style="width:350px;height:350px;display:block;margin:auto;">
    </el-dialog>
    <el-dialog title="审核资格证" :visible.sync="showDetail">
      <ul class="imgList">
        <li>
          <span>类型：</span><i>{{imgList.type === 2? '机构' : '个人'}}</i>
        </li>
        <li :class={height_100:imgList.doctorPic} v-if="imgList.type === 1">
          <span>口腔执业医师资格证：</span>
          <img @click="popup(imgList.doctorPic)"  :src="imgList.doctorPic" alt="口腔执业医师资格证" v-if="imgList.doctorPic">
          <i v-else>未设置</i>
        </li>
        <li :class={height_100:imgList.medicalLicense} v-if="imgList.type === 2">
          <span>医疗机构执业许可证：</span>
          <img @click="popup(imgList.medicalLicense)" :src="imgList.medicalLicense"  alt="医疗机构执业许可证" v-if="imgList.medicalLicense">
          <i v-else>未设置</i>
        </li>
        <li :class={height_100:imgList.businessLicense} v-if="imgList.type === 2">
          <span>营业执照：</span>
          <img @click="popup(imgList.businessLicense)" :src="imgList.businessLicense" alt="营业执照" v-if="imgList.businessLicense">
          <i v-else>未设置</i>
        </li>
        <li :class={height_100:imgList.taxRegistration} v-if="imgList.type === 2">
          <span>税务登记证：</span>
          <img @click="popup(imgList.taxRegistration)" :src="imgList.taxRegistration" alt="税务登记证" v-if="imgList.taxRegistration">
          <i v-else>未设置</i>
        </li>
        <li :class={height_100:imgList.openingPermit} v-if="imgList.type === 2">
          <span>开户许可证：</span>
          <img @click="popup(imgList.openingPermit)" :src="imgList.openingPermit" alt="开户许可证" v-if="imgList.openingPermit">
          <i v-else>未设置</i>
        </li>
        <li :class={height_100:imgList.doctorPic} v-if="imgList.type === 2">
          <span>医师执业资格证：</span>
          <img @click="popup(imgList.doctorPic)" :src="imgList.doctorPic" alt="医师执业资格证" v-if="imgList.doctorPic">
          <i v-else>未设置</i>
        </li>
        <li :class={height_100:imgList.radiologicalPermit} v-if="imgList.type === 2">
          <span>放射诊疗许可证：</span>
          <img  @click="popup(imgList.radiologicalPermit)" :src="imgList.radiologicalPermit" alt="放射诊疗许可证" v-if="imgList.radiologicalPermit">
          <i v-else>未设置</i>
        </li>
        <li :class={height_100:imgList.idCardPositive} v-if="imgList.type === 2">
          <span>法人身份证（正面）：</span>
          <img  @click="popup(imgList.idCardPositive)" :src="imgList.idCardPositive" alt="法人身份证（正面）" v-if="imgList.idCardPositive">
          <i v-else>未设置</i>
        </li>
        <li :class={height_100:imgList.idCardOtherside} v-if="imgList.type === 2">
          <span>法人身份证（反面）：</span>
          <img @click="popup(imgList.idCardOtherside)" :src="imgList.idCardOtherside" alt="法人身份证（反面）" v-if="imgList.idCardOtherside">
          <i v-else>未设置</i>
        </li>
        <li style="min-height: 60px;">
          <span>操作：</span>
          <div class="hander">
             <el-radio-group v-model="ifPass" @change="changeHandler">
              <el-radio class="radio" label="2" :disabled="isDisabled">通过</el-radio>
              <el-radio class="radio" label="3" :disabled="isDisabled">不通过</el-radio>
            </el-radio-group>
            <el-input v-model="failReason" class="failInput" v-show="ifPass==='3'" :disabled="isDisabled" placeholder="请填写不通过理由"></el-input>
          </div>
        </li>
      </ul>
      <div class="btns">
        <el-button type="primary" @click="submitHandler" v-if="!isDisabled">确定</el-button>
        <el-button type="primary" style="margin-left: 80px;" v-if="!isDisabled" @click="cancelHandler">取消</el-button>
        <el-button type="primary" style="margin-left: 80px;" v-if="isDisabled" @click="cancelHandler">关闭</el-button>
      </div>
    </el-dialog>
    <el-table :data="certificationList"  border style="width: 100%;">
      <el-table-column  prop="trueName"  align="center" width="140" label="真实姓名"> 
      </el-table-column>
      <el-table-column  prop="phone"  align="center" label="手机号" width="140"> 
      </el-table-column>
      <el-table-column  prop="certification.type"  align="center" width="80" label="类型"> 
        <template scope="scope">
          <span v-if='scope.row.certification.type === 1'>个人</span>
          <span v-else-if='scope.row.certification.type === 2'>机构</span>
          <span v-else></span>
        </template>
       </el-table-column>
      <el-table-column  prop="certification.companyName" width="210" align="center"  label="单位名称">  </el-table-column>
      <el-table-column  align="center" width="210" label="所在地"> 
        <template scope="scope">
            <span>{{scope.row.certification.part}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="certification.workAddress" align="center" label="详细地址"> 
      </el-table-column>
      <el-table-column align="center" label="状态"> 
        <template scope="scope">
          <span v-if='scope.row.certification.state === 1'>待审核</span>
          <span v-else-if='scope.row.certification.state === 2'>审核通过</span>
          <span v-else-if='scope.row.certification.state === 3'>审核不通过</span>
        </template>
      </el-table-column>
      <el-table-column  label="操作"  align="center">
        <template scope="scope">
          <span v-if="certificationList[scope.$index].certification.state=='1'">
            <el-button type="primary" @click="showHandler(scope.$index, scope.row)">审核资格证</el-button>
          </span>
          <span v-else>
            <el-button type="primary" @click="showHandler(scope.$index, scope.row)">查看资格证</el-button>
          </span>
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
  </el-row>
    </div>
</template>
<script>
  import global from '../../global/global'
  export default{
    data(){
      return {
      	popSrc: '',
	    popupSwitch: false,
        ifShowBigImg:false,
        showDetail: false,
        searchUserContent:"",
        searchUserType:"真实姓名",
        searchType:"",
        searchState:1,
        certificationList:[],
        isDisabled: false,
        bigImgSrc: '',
        selectVal: '',
        pagesize: 10,
        currentPage: 1,
        totalCount: 1,
        ifPass: '2',
        failReason: '',
        cert_phone: '',
        userTypes: [
          {value: '',label: '全部'},
          {value: 1,label: '个人'},
          {value: 2,label: '机构'}
        ],
        states:[
          {value: '',label: '全部'},
          {value: 1,label: '待审核'},
          {value: 2,label: '审核通过'},
          {value: 3,label: '审核不通过'}
        ],
        imgList: {}
      }
    },
    created(){
      this.search();
    },
    methods: {
    	//图片放大模态框
	    popup (imgSrc){
	    	this.popSrc = imgSrc;
            this.popupSwitch = !this.popupSwitch;
        },
      changeHandler (val){
        if(val === '2'){
          this.failReason = ''
        }
      },
      showHandler(index, row){
        this.failReason = '';
        if(row.certification.state === 1){
          this.ifPass = '2'
          this.isDisabled = false
        }else if(row.certification.state === 2){
          this.ifPass = '2'
          this.isDisabled = true
        }else if(row.certification.state === 3){
          this.ifPass = '3'
          this.isDisabled = true
        }
        this.cert_phone = row.phone;
        var params = {
          userId: row.userId
        }
        global.axiosGetReq('/userCertificationList/detail',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.imgList = res.data.data
            this.failReason = res.data.data.failReason
          }
        })
        this.showDetail = true
      },
      handleCurrentChange(val) {
        this.currentPage = val 
        this.search(val)
      },
      selectOpt(key){
        this.selectVal = key;
        this.searchUserContent = '';
      },
      search:function(val){
        var params;
        if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }
        if(this.selectVal === "手机号"){
          params = {
            phone: this.searchUserContent,
            trueName: '',
            companyName: '',
            type: this.searchType,
            state: this.searchState,
            currentPage: this.currentPage,
            numberPerPage: this.pagesize
          }
        }else if(this.selectVal === "真实姓名"){
          params = {
            phone: '',
            trueName: this.searchUserContent,
            companyName: '',
            type: this.searchType,
            state: this.searchState,
            currentPage: this.currentPage,
            numberPerPage: this.pagesize
          }
        }else if(this.selectVal === "单位名称"){
          params = {
            phone: '',
            trueName: '',
            companyName: this.searchUserContent,
            type: this.searchType,
            state: this.searchState,
            currentPage: this.currentPage,
            numberPerPage: this.pagesize
          }
        }else{
          params = {
            phone: '',
            trueName: this.searchUserContent,
            companyName: '',
            type: this.searchType,
            state: this.searchState,
            currentPage: this.currentPage,
            numberPerPage: this.pagesize
          }
        }
        global.axiosGetReq('/userCertificationList/list',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.certificationList = res.data.data
            this.totalCount = res.data.totalNumber
          }
        })
      },
      cancelHandler(){
        this.showDetail = false;
      },
      submitHandler(){
        let params = {
          phone: this.cert_phone,
          state: parseInt(this.ifPass),
          failReason: this.failReason
        }
        global.axiosPostReq('/userCertificationList/verify',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            if(this.ifPass === '2'){
              this.$message({
                type: 'success',
                message: '审核通过!'
              });
            }else if(this.ifPass === '3'){
              this.$message({
                type: 'success',
                message: '审核不通过!'
              });
            }
            this.showDetail = false;
            this.search();
          }
        })
      },
      showBigImg:function(index){
        this.ifShowBigImg = true;
        this.bigImgSrc = this.certificationList[index].certification.doctorPic;
      }
    },
  }
</script>
<style scoped>
    .popUpImg{
        position: absolute;
        top:50%;
        left: 50%;
        opacity: 2!important;
        transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);	/* IE 9 */
        -moz-transform:translate(-50%,-50%);	/* Firefox */
        -webkit-transform:translate(-50%,-50%); /* Safari 和 Chrome */
        -o-transform:translate(-50%,-50%);
    }
    .popupBox{
        position: fixed;
        top:0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 3000;
        background-color: rgba(0,0,0,0.5);
    }
  .height_100{
    height: 100px;
  }
  .imgList li{
    width: 100%;
    min-height: 20px;
    position: relative;
    padding: 10px;
  }
  .imgList li:nth-last-child(2){
    border-bottom: 1px solid #eee;
  }
  .imgList li span{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 200px;
    height: 20px;
    text-align: right;
    display: inline-block;
  }
  .imgList img{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 240px;
    width: 100px;
    height: 100px;
  }
  .imgList i{
    font-style: normal;
    position: absolute;
    top: 50%;
    left: 240px;
    transform: translateY(-50%);
  }
  .btns{
    width: 300px;
    margin: 20px auto;
  }
  .failInput{
    width: 300px;
    margin-left: 20px;
  }
  .hander{
    position: absolute;
    left: 240px;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
<style>
  .certificationWarp .el-select .el-input {
      min-width: 110px;
      max-width: 150px;
    }
  
</style>

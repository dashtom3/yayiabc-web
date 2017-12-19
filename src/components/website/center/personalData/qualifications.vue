<template>
  <div class="certification">
    <div class="content">
      <el-form :model="certiData" :rules="certiDataRules" ref="certiData" label-width="250px">
        <!-- <el-form-item style="margin: -52px 0 20px 38px;">
          <el-upload
            class="avatar-uploader"
            :disabled="ifPass"
            :action="qiNiuUrl"
            :show-file-list="false"
            :on-success="uploadFile"
            :data="qiNiuToken">
            <img v-if="certiData.imageUrl_head" :src="certiData.imageUrl_head" :class="{disabledPoint: ifPass}" class="defaultCss">
            <img src="../../../../images/center/loadUserImg3.png" class="defaultCss" :class="{disabledPoint: ifPass}" v-if="!certiData.imageUrl_head">
            <div class="changeImg">更改头像</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input :disabled="true" v-model="certiData.phone"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="trueName">
          <el-input v-model.trim="certiData.trueName" :disabled="ifPass"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="certiData.sex" style="padding-left: 10px;" :disabled="ifPass">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日：" >
          <el-date-picker
            :disabled="ifPass"
            v-model="certiData.birthday"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单位名称：" prop="companyName">
          <el-input v-model.trim="certiData.companyName" :disabled="ifPass"></el-input>
        </el-form-item>
        <el-form-item label="单位所在地：" prop="part">
          <selectThree @listenToChild="showFromChild" :selected="certiData.part" v-show="!ifPass"></selectThree>
          <template>  
            <el-input v-model="partStr" :disabled="ifPass" v-if="ifPass"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="详细地址：" prop="workAddress">
          <el-input v-model.trim="certiData.workAddress" :disabled="ifPass"></el-input>
        </el-form-item> -->
        <el-form-item label="类型：" prop="type">
          <el-select v-model="certiData.type" :change="adsf(certiData.type)" :disabled="ifPass">
            <el-option label="个人" value="1"></el-option>
            <el-option label="机构" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="口腔执业医生资格证：" v-show="sczgz === 'personal'" prop="imageUrl_doctorPic">
          <el-upload
          style="margin-bottom: 30px;"
          class="avatar-uploader"
            :disabled="ifPass"
            :action="qiNiuUrl"
            :show-file-list="false"
            :on-success="uploadFile10"
            :before-upload="beforeAvatarUpload"
            :data="qiNiuToken">
            <img v-if="certiData.imageUrl_doctorPic" :src="certiData.imageUrl_doctorPic" :class="{disabledPoint: ifPass}" class="avatar">
            <i class="el-icon-plus avatar-uploader-icon" v-if="!certiData.imageUrl_doctorPic" :class="{disabledPoint: ifPass}"></i>
          </el-upload>
          <transition name="shake">
            <p v-show="audited_validate" class="adopt">资质审核通过！</p>
          </transition>
          <transition name="shake">
            <p v-show="pending_validate" class="adopt">您的认证信息我们会尽快审核，请耐心等待~</p>
          </transition>
        </el-form-item>
        <el-form-item label="医疗机构执业许可证：" v-show="sczgz === 'institution'" prop="imageUrl_medical">
          <el-upload
          class="avatar-uploader"
            :disabled="ifPass"
            :action="qiNiuUrl"
            :show-file-list="false"
            :on-success="uploadFile1"
            :before-upload="beforeAvatarUpload"
            :data="qiNiuToken">
            <img v-if="certiData.imageUrl_medical" :src="certiData.imageUrl_medical" :class="{disabledPoint: ifPass}" class="avatar">
            <i class="el-icon-plus avatar-uploader-icon" v-if="!certiData.imageUrl_medical" :class="{disabledPoint: ifPass}"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="营业执照：" v-show="sczgz === 'institution'" prop="imageUrl_business">
          <el-upload
          class="avatar-uploader"
            :disabled="ifPass"
            :action="qiNiuUrl"
            :show-file-list="false"
            :on-success="uploadFile2"
            :before-upload="beforeAvatarUpload"
            :data="qiNiuToken">
            <img v-if="certiData.imageUrl_business" :src="certiData.imageUrl_business" :class="{disabledPoint: ifPass}" class="avatar" >
            <i class="el-icon-plus avatar-uploader-icon" v-if="!certiData.imageUrl_business" :class="{disabledPoint: ifPass}"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="税务登记证：" v-show="sczgz === 'institution'" prop="imageUrl_tax">
          <el-upload
          class="avatar-uploader"
            :disabled="ifPass"
            :action="qiNiuUrl"
            :show-file-list="false"
            :on-success="uploadFile3"
            :before-upload="beforeAvatarUpload"
            :data="qiNiuToken">
            <img v-if="certiData.imageUrl_tax" :src="certiData.imageUrl_tax" :class="{disabledPoint: ifPass}" class="avatar">
            <i class="el-icon-plus avatar-uploader-icon" v-if="!certiData.imageUrl_tax" :class="{disabledPoint: ifPass}"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="开户许可证：" v-show="sczgz === 'institution'" :class="{disabledPoint: ifPass}">
          <el-upload
          class="avatar-uploader"
            :disabled="ifPass"
            :action="qiNiuUrl"
            :show-file-list="false"
            :on-success="uploadFile4"
            :before-upload="beforeAvatarUpload"
            :data="qiNiuToken">
            <img v-if="certiData.imageUrl_open_permit" :src="certiData.imageUrl_open_permit" :class="{disabledPoint: ifPass}" class="avatar" >
            <i class="el-icon-plus avatar-uploader-icon" v-if="!certiData.imageUrl_open_permit" :class="{disabledPoint: ifPass}"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="医师职业资格证：" v-show="sczgz === 'institution'" :class="{disabledPoint: ifPass}">
          <el-upload
          class="avatar-uploader"
            :disabled="ifPass"
            :action="qiNiuUrl"
            :show-file-list="false"
            :on-success="uploadFile5"
            :before-upload="beforeAvatarUpload"
            :data="qiNiuToken">
            <img v-if="certiData.imageUrl_doctor" :src="certiData.imageUrl_doctor" :class="{disabledPoint: ifPass}" class="avatar" >
            <i class="el-icon-plus avatar-uploader-icon" v-if="!certiData.imageUrl_doctor":class="{disabledPoint: ifPass}"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="放射诊疗许可证：" v-show="sczgz === 'institution'">
          <el-upload
          class="avatar-uploader"
            :disabled="ifPass"
            :action="qiNiuUrl"
            :show-file-list="false"
            :on-success="uploadFile6"
            :before-upload="beforeAvatarUpload"
            :data="qiNiuToken">
            <img v-if="certiData.imageUrl_treatment" :src="certiData.imageUrl_treatment" :class="{disabledPoint: ifPass}" class="avatar" >
            <i class="el-icon-plus avatar-uploader-icon" v-if="!certiData.imageUrl_treatment" :class="{disabledPoint: ifPass}"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="法人身份证（正面）：" v-show="sczgz === 'institution'">
          <el-upload
          class="avatar-uploader"
            :disabled="ifPass"
            :action="qiNiuUrl"
            :show-file-list="false"
            :on-success="uploadFile7"
            :before-upload="beforeAvatarUpload"
            :data="qiNiuToken">
            <img v-if="certiData.imageUrl_id_front" :src="certiData.imageUrl_id_front" :class="{disabledPoint: ifPass}" class="avatar" >
            <i class="el-icon-plus avatar-uploader-icon" v-if="!certiData.imageUrl_id_front" :class="{disabledPoint: ifPass}"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="法人身份证（反面）：" v-show="sczgz === 'institution'">
          <el-upload
          style="margin-bottom: 30px;"
          class="avatar-uploader"
            :disabled="ifPass"
            :action="qiNiuUrl"
            :show-file-list="false"
            :on-success="uploadFile8"
            :before-upload="beforeAvatarUpload"
            :data="qiNiuToken">
            <img v-if="certiData.imageUrl_id_back" :src="certiData.imageUrl_id_back" :class="{disabledPoint: ifPass}" class="avatar" >
            <i class="el-icon-plus avatar-uploader-icon" v-if="!certiData.imageUrl_id_back" :class="{disabledPoint: ifPass}"></i>
          </el-upload>
          <transition name="shake">
            <p v-show="audited_validate" class="adopt">资质审核通过！</p>
          </transition>
          <transition name="shake">
            <p v-show="pending_validate" class="adopt">您的认证信息我们会尽快审核，请耐心等待~</p>
          </transition>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savePersonInfo('certiData')" v-show="btnVisible">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import selectThree from "../../details/selectThree";
import global from "../../../global/global";
import util from "../../../../common/util";
export default {
  name: "certification",
  data() {
    return {
      certificateState: 0, //认证状态
      sczgz: "personal",
      qiNiuToken: null,
      qiNiuUrl: global.qiNiuUrl,
      btnVisible: true,
      ifPass: false,
      audited_validate: false,
      pending_validate: false,
      partStr: "",
      certiData: {
        phone: global.getUser().phone,
        userPic: "",
        trueName: "",
        sex: "1",
        birthday: "",
        type: "1",
        companyName: "",
        part: ["北京", "北京市", "东城区"],
        workAddress: "",
        imageUrl_doctorPic: "",
        imageUrl_head: "",
        imageUrl_doctor: "",
        imageUrl_medical: "",
        imageUrl_business: "",
        imageUrl_tax: "",
        imageUrl_open_permit: "",
        imageUrl_treatment: "",
        imageUrl_id_front: "",
        imageUrl_id_back: "",
        judge: 0
      },
      certiDataRules: {
        trueName: [{ required: true, message: "请输入真实姓名", trigger: "change" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        companyName: [
          { required: true, message: "请输入单位名称", trigger: "change" }
        ],
        part: [
          {
            type: "array",
            required: true,
            message: "请输入所在地省市区",
            trigger: "change"
          }
        ],
        workAddress: [{ required: true, message: "请输入详细地址", trigger: "change" }],
        imageUrl_medical: [
          { required: true, message: '请上传真实的医疗机构执业许可证', trigger: 'change' }
        ],
        imageUrl_business: [
          { required: true, message: '请上传真实的营业执照', trigger: 'change' }
        ],
        imageUrl_tax: [
          { required: true, message: '请上传真实的税务登记证', trigger: 'change' }
        ],
        imageUrl_doctorPic: [
          { required: true, message: '请上传真实的医师执业资格证', trigger: 'change' }
        ]
      }
    };
  },
  created() {
    //获取七牛token
    global.axiosGetReq("/file/getUpToken", null).then(res => {
      if (res.data.callStatus === "SUCCEED") {
        this.qiNiuToken = {
          token: res.data.msg
        };
      }
    });
    this.init();
  },
  components: {
    selectThree
  },
  watch: {
    ifPass: function() {
      if (this.ifPass) {
        this.partStr = this.certiData.part.join("/");
      }
    }
  },
  methods: {
    //查询个人信息
    init() {
      var obj = {
        phone: global.getUser().phone,
        token: global.getToken()
      };
      global.axiosGetReq("/userPersonalInfo/detail", obj).then(res => {
        if (res.data.callStatus === "SUCCEED") {
          this.certiData.trueName = res.data.data.trueName;
          this.certiData.birthday =
            (res.data.data.birthday &&
              util.formatDate.format(new Date(res.data.data.birthday))) ||
            util.formatDate.format(new Date("1970-01-01"));
          this.certiData.sex =
            (res.data.data.sex && res.data.data.sex.toString()) || "1";
          this.certiData.companyName = res.data.data.companyName;
          this.certiData.type =
            (res.data.data.type && res.data.data.type.toString()) || "1";
          this.certiData.part = (res.data.data.part &&
            res.data.data.part.split("/")) || ["北京", "北京市", "东城区"];
          this.certiData.workAddress = res.data.data.workAddress;
          this.certiData.judge = res.data.data.judge;
          this.certiData.state = res.data.data.state;
          this.certiData.failReason = res.data.data.failReason || "无";
          this.certiData.trueName = res.data.data.trueName;
          this.certiData.imageUrl_doctorPic = res.data.data.doctorPic;
          this.certiData.imageUrl_head = res.data.data.userPic;
          this.certiData.imageUrl_doctor = res.data.data.doctorPic;
          this.certiData.imageUrl_medical = res.data.data.medicalLicense;
          this.certiData.imageUrl_business = res.data.data.businessLicense;
          this.certiData.imageUrl_tax = res.data.data.taxRegistration;
          this.certiData.imageUrl_open_permit = res.data.data.openingPermit;
          this.certiData.imageUrl_treatment = res.data.data.radiologicalPermit;
          this.certiData.imageUrl_id_front = res.data.data.idCardPositive;
          this.certiData.imageUrl_id_back = res.data.data.idCardOtherside;
          this.certificateState = this.certiData.state;
          this.ert(this.certiData.failReason);
        }
      });
    },
    saveJudge() {
      var params = {
        phone: global.getUser().phone,
        token: global.getToken(),
        type: this.certiData.type,
        companyName: this.certiData.companyName,
        part: this.certiData.part.join("/"),
        workAddress: this.certiData.workAddress,
        doctorPic: this.certiData.imageUrl_doctor, //医师职业资格证
        medicalLicense: this.certiData.imageUrl_medical, //医疗机构执业许可证
        businessLicense: this.certiData.imageUrl_business, //营业执照
        taxRegistration: this.certiData.imageUrl_tax, //税务登记证
        openingPermit: this.certiData.imageUrl_open_permit, //开户许可证
        radiologicalPermit: this.certiData.imageUrl_treatment, //放射诊疗许可证
        idCardPositive: this.certiData.imageUrl_id_front, //法人身份证（正面）
        idCardOtherside: this.certiData.imageUrl_id_back, //法人身份证（反面）
        judge: this.certiData.judge
      };
      //保存个人信息
      global
        .axiosPostReq("/userPersonalInfo/updateCertification", params)
        .then(res => {
          if (res.data.callStatus === "SUCCEED") {
            this.ifPass = true;
            this.btnVisible = false;
          }
        });
    },
    //保存个人信息
    savePersonInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = {};
          //个人时
          if (this.sczgz === "personal") {
            params = {
              phone: global.getUser().phone,
              token: global.getToken(),
              trueName: this.certiData.trueName,
              sex: this.certiData.sex,
              birthday:
                (this.certiData.birthday &&
                  util.formatDate.format(new Date(this.certiData.birthday))) ||
                "1970-01-01",
              userPic: this.certiData.imageUrl_head,
              type: this.certiData.type,
              // companyName: this.certiData.companyName,
              // part: this.certiData.part.join("/"),
              // workAddress: this.certiData.workAddress,
              doctorPic: this.certiData.imageUrl_doctorPic, //医师职业资格证
              medicalLicense: "", //医疗机构执业许可证
              businessLicense: "", //营业执照
              taxRegistration: "", //税务登记证
              openingPermit: "", //开户许可证
              radiologicalPermit: "", //放射诊疗许可证
              idCardPositive: "", //法人身份证（正面）
              idCardOtherside: "", //法人身份证（反面）
              judge: this.certiData.judge
            };
          } else {
            params = {
              phone: global.getUser().phone,
              token: global.getToken(),
              trueName: this.certiData.trueName,
              sex: this.certiData.sex,
              birthday:
                (this.certiData.birthday &&
                  util.formatDate.format(new Date(this.certiData.birthday))) ||
                "1970-01-01",
              userPic: this.certiData.imageUrl_head,
              type: this.certiData.type,
              // companyName: this.certiData.companyName,
              // part: this.certiData.part.join("/"),
              // workAddress: this.certiData.workAddress,
              doctorPic: this.certiData.imageUrl_doctor, //医师职业资格证
              medicalLicense: this.certiData.imageUrl_medical, //医疗机构执业许可证
              businessLicense: this.certiData.imageUrl_business, //营业执照
              taxRegistration: this.certiData.imageUrl_tax, //税务登记证
              openingPermit: this.certiData.imageUrl_open_permit, //开户许可证
              radiologicalPermit: this.certiData.imageUrl_treatment, //放射诊疗许可证
              idCardPositive: this.certiData.imageUrl_id_front, //法人身份证（正面）
              idCardOtherside: this.certiData.imageUrl_id_back, //法人身份证（反面）
              judge: this.certiData.judge
            };
          }
          //提交资质审核的信息
          global
            .axiosPostReq("/userPersonalInfo/updateCertification", params)
            .then(res => {
              if (res.data.callStatus === "SUCCEED") {
                window.scrollTo(0, 0);
                this.$confirm("您的认证信息我们会尽快审核，请耐心等待~", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                });
                this.ifPass = true;
                this.btnVisible = false;
                this.pending_validate = true;
              }
            });
          // global
          //   .axiosPostReq("/userPersonalInfo/updateUser", params)
          //   .then(res => {
          //     if (res.data.callStatus === "SUCCEED") {
          //       global
          //         .axiosPostReq("/userPersonalInfo/updateCertification", params)
          //         .then(res => {
          //           if (res.data.callStatus === "SUCCEED") {
          //             window.scrollTo(0, 0);
          //             this.$confirm("您的认证信息我们会尽快审核，请耐心等待~", "提示", {
          //               confirmButtonText: "确定",
          //               cancelButtonText: "取消",
          //               type: "warning"
          //             });
          //             this.ifPass = true;
          //             this.btnVisible = false;
          //             this.pending_validate = true;
          //           }
          //         });
          //     }
          //   });
        } else {
          return false;
        }
      });
    },
    showFromChild(data) {
      this.certiData.part = data;
    },
    adsf: function(aa) {
      if (aa == "1") {
        this.sczgz = "personal";
        this.certiDataRules.imageUrl_doctorPic[0].required = true;
        this.certiDataRules.imageUrl_medical[0].required = false;
        this.certiDataRules.imageUrl_business[0].required = false;
        this.certiDataRules.imageUrl_tax[0].required = false;
      } else {
        this.sczgz = "institution";
        this.certiDataRules.imageUrl_doctorPic[0].required = false;
        this.certiDataRules.imageUrl_medical[0].required = true;
        this.certiDataRules.imageUrl_business[0].required = true;
        this.certiDataRules.imageUrl_tax[0].required = true;
      }
    },
    ert: function(msg) {
      if (
        this.certificateState == 1 &&
        (this.certiData.judge === 0 || this.certiData.judge === null)
      ) {
        this.$confirm("您的认证信息我们会尽快审核，请耐心等待~", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {
            //提交后台改变状态
            this.certiData.judge = 1;
            this.saveJudge();
          }
        });
        this.ifPass = true;
        this.btnVisible = false;
        this.audited_validate = false;
        this.pending_validate = true;
      } else if (this.certificateState == 1 && this.certiData.judge === 1) {
        this.ifPass = true;
        this.btnVisible = false;
        this.audited_validate = false;
        this.pending_validate = true;
      } else if (this.certificateState == 2 && this.certiData.judge === 0) {
        this.$confirm("您的认证信息已审核通过", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {
            //提交后台改变状态
            this.certiData.judge = 1;
            this.saveJudge();
          }
        });
        this.ifPass = true;
        this.btnVisible = false;
        this.audited_validate = true;
        this.pending_validate = false;
      } else if (this.certificateState == 2 && this.certiData.judge === 1) {
        this.ifPass = true;
        this.btnVisible = false;
        this.audited_validate = true;
        this.pending_validate = false;
      } else if (this.certificateState == 3 && this.certiData.judge === 0) {
        this.$confirm("抱歉，您的认证信息审核不通过，原因：" + msg + "，请重新填写！", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {
            //不通过让他重新编辑
            this.certiData.type = "1";
            // this.certiData.companyName = "";
            // this.certiData.part = ["北京", "北京市", "东城区"];
            // this.certiData.workAddress = "";
            this.certiData.imageUrl_doctorPic = "";
            this.certiData.imageUrl_doctor = "";
            this.certiData.imageUrl_medical = "";
            this.certiData.imageUrl_business = "";
            this.certiData.imageUrl_tax = "";
            this.certiData.imageUrl_open_permit = "";
            this.certiData.imageUrl_treatment = "";
            this.certiData.imageUrl_id_front = "";
            this.certiData.imageUrl_id_back = "";
            this.ifPass = false;
            this.btnVisible = true;
          }
        });
      }
    },
    uploadFile(res, file) {
      this.certiData.imageUrl_head = global.qiniuShUrl + file.response.key;
    },
    uploadFile1(res, file) {
      this.certiData.imageUrl_medical = global.qiniuShUrl + file.response.key;
    },
    uploadFile2(res, file) {
      this.certiData.imageUrl_business = global.qiniuShUrl + file.response.key;
    },
    uploadFile3(res, file) {
      this.certiData.imageUrl_tax = global.qiniuShUrl + file.response.key;
    },
    uploadFile4(res, file) {
      this.certiData.imageUrl_open_permit =
        global.qiniuShUrl + file.response.key;
    },
    uploadFile5(res, file) {
      this.certiData.imageUrl_doctor = global.qiniuShUrl + file.response.key;
    },
    uploadFile6(res, file) {
      this.certiData.imageUrl_treatment = global.qiniuShUrl + file.response.key;
    },
    uploadFile7(res, file) {
      this.certiData.imageUrl_id_front = global.qiniuShUrl + file.response.key;
    },
    uploadFile8(res, file) {
      this.certiData.imageUrl_id_back = global.qiniuShUrl + file.response.key;
    },
    uploadFile10(res, file) {
      this.certiData.imageUrl_doctorPic = global.qiniuShUrl + file.response.key;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.error {
  position: absolute;
  left: 20px;
  font-size: 14px;
  color: #cb1700;
}
.adopt {
  position: absolute;
  left: 0;
  font-size: 14px;
  color: #005aab;
}
.content {
  margin: 90px 50px 0 44px;
  padding-bottom: 20px;
  width: 970px;
  border: 1px solid #eee;
  border-radius: 3px;
}
.disabledPoint {
  cursor: default;
}
</style>
<style>
.certification form {
  width: 700px;
  margin: auto;
}
.certification form .el-input {
  width: 240px;
  height: 40px;
}
.certification .el-form-item {
  margin-bottom: 20px;
}
.certification .el-button--primary {
  background-color: #005aab;
  border-color: #005aab;
  width: 160px;
  line-height: 42px;
  padding: 0;
  margin-top: 20px;
}
.certification form .el-select input {
  padding-right: 19px;
}
.certification form .el-form-item:nth-child(1) input {
  width: 240px;
}
.certification form .el-form-item:nth-child(4) input {
  width: 549px;
}
.certification .avatar-uploader-icon {
  border: 1px solid #bfcbd9;
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.certification .el-cascader__label {
  margin-left: 15px;
}
.el-select-dropdown {
  min-width: 240px !important;
}
.defaultCss {
  width: 100px;
  height: 100px;
  -webkit-box-shadow: 3px 3px 10px #ddd;
  -moz-box-shadow: 3px 3px 10px #ddd;
  box-shadow: 3px 3px 10px #ddd;
  border-radius: 50%;
}
</style>

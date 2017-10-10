<template>
    <div>
        <publicHeader :msgFromIndex="reLogData"></publicHeader>
        <div class="r-content">
            <h3 class="title">微信已成功绑定牙医abc账号！</h3>
            <p class="bind-text">请完善您的个人资料</p>
            <el-form ref="registerData" :rules="registerRules" class="form-wrap" :model="registerData"
                     label-width="250px">
                <el-form-item label="真实姓名：" prop="trueName">
                    <el-input v-model.trim="registerData.trueName"></el-input>
                </el-form-item>
                <el-form-item label="性别：">
                    <el-radio-group v-model="registerData.sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="生日：">
                    <el-date-picker
                            v-model="registerData.birthday"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="单位名称：" prop="companyName">
                    <el-input v-model.trim="registerData.companyName"></el-input>
                </el-form-item>
                <el-form-item label="单位所在地：" prop="part">
                    <selectThree @listenToChild="showFromChild" :selected="registerData.part"></selectThree>
                </el-form-item>
                <el-form-item label="详细地址：" prop="workAddress">
                    <el-input v-model.trim="registerData.workAddress"></el-input>
                </el-form-item>
                <el-form-item label="类型：" prop="type">
                    <el-select v-model="registerData.type">
                        <el-option label="个人" value="1"></el-option>
                        <el-option label="机构" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="口腔执业医生资格证：" v-show="registerData.type === '1'" prop="imageUrl_doctorPic">
                    <el-upload
                            class="avatar-uploader"
                            :action="qiNiuUrl"
                            :show-file-list="false"
                            :on-success="uploadFile10"
                            :data="qiNiuToken">
                        <img v-if="registerData.imageUrl_doctorPic" :src="registerData.imageUrl_doctorPic"
                             class="avatar">
                        <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="医疗机构执业许可证：" v-show="registerData.type === '2'" prop="imageUrl_medical">
                    <el-upload
                            class="avatar-uploader"
                            :action="qiNiuUrl"
                            :show-file-list="false"
                            :on-success="uploadFile1"
                            :data="qiNiuToken">
                        <img v-if="registerData.imageUrl_medical" :src="registerData.imageUrl_medical" class="avatar">
                        <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="营业执照：" v-show="registerData.type === '2'" prop="imageUrl_business">
                    <el-upload
                            class="avatar-uploader"
                            :action="qiNiuUrl"
                            :show-file-list="false"
                            :on-success="uploadFile2"
                            :data="qiNiuToken">
                        <img v-if="registerData.imageUrl_business" :src="registerData.imageUrl_business" class="avatar">
                        <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="税务登记证：" v-show="registerData.type === '2'" prop="imageUrl_tax">
                    <el-upload
                            class="avatar-uploader"
                            :action="qiNiuUrl"
                            :show-file-list="false"
                            :on-success="uploadFile3"
                            :data="qiNiuToken">
                        <img v-if="registerData.imageUrl_tax" :src="registerData.imageUrl_tax" class="avatar">
                        <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="开户许可证：" v-show="registerData.type === '2'">
                    <el-upload
                            class="avatar-uploader"
                            :action="qiNiuUrl"
                            :show-file-list="false"
                            :on-success="uploadFile4"
                            :data="qiNiuToken">
                        <img v-if="registerData.imageUrl_open_permit" :src="registerData.imageUrl_open_permit"
                             class="avatar">
                        <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="医师职业资格证：" v-show="registerData.type === '2'">
                    <el-upload
                            class="avatar-uploader"
                            :action="qiNiuUrl"
                            :show-file-list="false"
                            :on-success="uploadFile5"
                            :data="qiNiuToken">
                        <img v-if="registerData.imageUrl_doctor" :src="registerData.imageUrl_doctor" class="avatar">
                        <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="放射诊疗许可证：" v-show="registerData.type === '2'">
                    <el-upload
                            class="avatar-uploader"
                            :action="qiNiuUrl"
                            :show-file-list="false"
                            :on-success="uploadFile6"
                            :data="qiNiuToken">
                        <img v-if="registerData.imageUrl_treatment" :src="registerData.imageUrl_treatment"
                             class="avatar">
                        <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="法人身份证（正面）：" v-show="registerData.type === '2'">
                    <el-upload
                            class="avatar-uploader"
                            :action="qiNiuUrl"
                            :show-file-list="false"
                            :on-success="uploadFile7"
                            :data="qiNiuToken">
                        <img v-if="registerData.imageUrl_id_front" :src="registerData.imageUrl_id_front" class="avatar">
                        <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="法人身份证（反面）：" v-show="registerData.type === '2'">
                    <el-upload
                            class="avatar-uploader"
                            :action="qiNiuUrl"
                            :show-file-list="false"
                            :on-success="uploadFile8"
                            :data="qiNiuToken">
                        <img v-if="registerData.imageUrl_id_back" :src="registerData.imageUrl_id_back" class="avatar">
                        <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                    </el-upload>
                </el-form-item>
                <el-form-item prop="agreement">
                    <el-checkbox v-model="registerData.agreement">我已注册并同意</el-checkbox>
                    <span class="agreement" @click="handleAgree">牙医abc注册协议</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="reg-btn" @click="handleRegister('registerData')">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
        <publicFooter></publicFooter>
    </div>
</template>

<script>
  import publicHeader from '../index/publicHeader'
  import publicFooter from '../index/publicFooter'
  import selectThree from "../details/selectThree"
  import global from '../../global/global'
  import util from '../../../common/util'

  var crypto = require('crypto')
  export default {
    name: 'register',
    data() {
      return {
        reLogData: '',
        qiNiuToken: null,
        qiNiuUrl: global.qiNiuUrl,
        rg_hYzm: true,
        rgPhone_alert: false,
        rg_Yzm1: '',
        rg_Yzm: '获取验证码',
        registerData: {
          phone: '',
          number: '',
          opneid: '',
          trueName: '',
          sex: '1',
          birthday: '',
          companyName: '',
          part: [],
          workAddress: '',
          type: '1',
          imageUrl_doctorPic: '',
          imageUrl_head: '',
          imageUrl_doctor: '',
          imageUrl_medical: '',
          imageUrl_business: '',
          imageUrl_tax: '',
          imageUrl_open_permit: '',
          imageUrl_treatment: '',
          imageUrl_id_front: '',
          imageUrl_id_back: '',
          agreement: []
        },
        registerRules: {
          trueName: [
            {required: true, message: '请输入真实姓名', trigger: 'change'}
          ],
          companyName: [
            {required: true, message: '请输入单位名称', trigger: 'change'}
          ],
          part: [
            {type: 'array', required: true, message: '请输入所在地省市区', trigger: 'change'}
          ],
          workAddress: [
            {required: true, message: '请输入详细地址', trigger: 'change'}
          ],
          agreement: [
            {type: 'array', required: true, message: '请先阅读并同意牙医abc注册协议', trigger: 'change'}
          ]
        }
      }
    },
    created() {
      //获取用户状态信息
      let temp = JSON.parse(window.sessionStorage.getItem('bindinfo')),
        data = this.registerData
      // 1表示已注册还是未注册
      data.number = temp.saleId ? 1 : 2
      data.openid = temp.openid
      //初始化用户信息
      data.phone = temp.phone
      data.trueName = temp.trueName
      data.sex = temp.sex + ''
      data.birthday = temp.birthday
      //关于资质认证
      if (!temp.certification) return
      data.part = (temp.certification.part + '').split('/')
      data.companyName = temp.certification.companyName
      data.workAddress = temp.certification.workAddress
      data.type = temp.certification.type + ''
      data.imageUrl_doctorPic = temp.certification.doctorPic
      data.imageUrl_doctor = temp.certification.doctorPic
      data.imageUrl_medical = temp.certification.medicalLicense
      data.imageUrl_business = temp.certification.businessLicense
      data.imageUrl_tax = temp.certification.taxRegistration
      data.imageUrl_open_permit = temp.certification.openingPermit
      data.imageUrl_treatment = temp.certification.radiologicalPermit
      data.imageUrl_id_front = temp.certification.idCardPositive
      data.imageUrl_id_back = temp.certification.idCardOtherside

    },
    components: {
      publicHeader,
      publicFooter,
      selectThree
    },
    methods: {
      handleAgree() {
        this.$router.push({path: '/protocols/aboutABC'})
      },
      handleRegister(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {}

            //个人
            if (this.registerData.type === 1) {
              params = {
                phone: this.registerData.phone,
                openid: this.registerData.openid,
                number: this.registerData.number,
                trueName: this.registerData.trueName,
                sex: this.registerData.sex,
                birthday: this.registerData.birthday ? util.formatDate.format(new Date(this.registerData.birthday)) : '1970-01-01'
              }
              params['certification.type'] = this.registerData.type
              params['certification.companyName'] = this.registerData.companyName
              params['certification.part'] = this.registerData.part.join('/')
              params['certification.workAddress'] = this.registerData.workAddress
              params['certification.doctorPic'] = this.registerData.imageUrl_doctorPic
            } else {
              //机构
              params = {
                phone: this.registerData.phone,
                openid: this.registerData.openid,
                number: this.registerData.number,
                trueName: this.registerData.trueName,
                sex: this.registerData.sex,
                birthday: this.registerData.birthday ? util.formatDate.format(new Date(this.registerData.birthday)) : '1970-01-01'
              }
              params['certification.type'] = this.registerData.type
              params['certification.companyName'] = this.registerData.companyName
              params['certification.part'] = this.registerData.part.join('/')
              params['certification.workAddress'] = this.registerData.workAddress
              params['certification.doctorPic'] = this.registerData.imageUrl_doctor
              params['certification.medicalLicense'] = this.registerData.imageUrl_medical
              params['certification.businessLicense'] = this.registerData.imageUrl_business
              params['certification.taxRegistration'] = this.registerData.taxRegistration
              params['certification.openingPermit'] = this.registerData.imageUrl_open_permit
              params['certification.radiologicalPermit'] = this.registerData.imageUrl_treatment
              params['certification.idCardPositive'] = this.registerData.imageUrl_id_front
              params['certification.idCardOtherside'] = this.registerData.imageUrl_id_back
            }
            global.axiosPostReq('/wxLogin/updateUserInfo', params).then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                global.setToken(res.data.token)
                global.setUser(res.data.data)
                this.$message({
                  message: ' 成功！',
                  type: 'success'
                });
                this.$router.push({path: '/index'})
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            return false;
          }

        })
      },
      showFromChild(data) {
        this.registerData.part = data;
      },
      uploadFile(res, file) {
        this.registerData.imageUrl_head = global.qiniuShUrl + file.response.key
      },
      uploadFile1(res, file) {
        this.registerData.imageUrl_medical = global.qiniuShUrl + file.response.key
      },
      uploadFile2(res, file) {
        this.registerData.imageUrl_business = global.qiniuShUrl + file.response.key
      },
      uploadFile3(res, file) {
        this.registerData.imageUrl_tax = global.qiniuShUrl + file.response.key
      },
      uploadFile4(res, file) {
        this.registerData.imageUrl_open_permit = global.qiniuShUrl + file.response.key
      },
      uploadFile5(res, file) {
        this.registerData.imageUrl_doctor = global.qiniuShUrl + file.response.key
      },
      uploadFile6(res, file) {
        this.registerData.imageUrl_treatment = global.qiniuShUrl + file.response.key
      },
      uploadFile7(res, file) {
        this.registerData.imageUrl_id_front = global.qiniuShUrl + file.response.key
      },
      uploadFile8(res, file) {
        this.registerData.imageUrl_id_back = global.qiniuShUrl + file.response.key
      },
      uploadFile10(res, file) {
        this.registerData.imageUrl_doctorPic = global.qiniuShUrl + file.response.key
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    .el-input__inner{
        border-color: #ddd;
        border-radius: 0;
    }
    .el-input__icon{
        color: #333;
    }
</style>

<style scoped>
    .agreement {
        color: #005aab;
        cursor: pointer;
    }

    .title {
        padding-top: 60px;
        font-size: 18px;
        text-align: center;
        color: #333;
        padding-left: 170px;
    }

    .bind-text {
        font-size: 14px;
        text-align: center;
        color: #999;
        padding-top: 16px;
        padding-left: 170px;
    }

    .r-content {
        width: 100%;
        border-top: 1px solid #ddd;
    }

    .form-wrap .el-input {
        width: 400px;
    }

    .form-wrap {
        width: 700px;
        margin: 20px auto 40px;
    }

    .el-form-item__label {
        width: 160px;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        border: 1px dashed #d9d9d9;
        box-sizing: border-box;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }

    .reg-btn {
        width: 400px;
        height: 36px;
    }

    .rg_getCode {
        display: inline-block;
        width: 100px;
        height: 36px;
        line-height: 36px;
        background-color: #005aab;
        color: #fff;
        text-align: center;
        border-radius: 4px;
    }

    .rg_getCode:hover {
        cursor: pointer;
        background-color: #329af0;
        transition: all ease 0.5s;
    }

    .code-input {
        width: 293px !important;
    }
</style>
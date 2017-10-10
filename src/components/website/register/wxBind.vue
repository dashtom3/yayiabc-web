<template>
    <div>
        <public-header v-if="bindArgs.type === '1'"></public-header>
        <div class="headerBox" v-if="bindArgs.type === '2'">
            <div class="headerFirst">
                <img class="logo_img" src="../../../images/index/logo.png" alt="img">
                <div class="log right">
                    <!--<span class="logIn" @click="logIn" :class="{'useractive':(userStatus === 'log')}">登录</span>/-->
                    <!--<span class="register" @click="register" :class="{'useractive':userStatus == 'reg'}">注册</span>-->
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <div class="wx-bind-container">
            <div class="wx-bind-wrap">
                <h3 class="title">微信登录成功！</h3>
                <p class="bind-text">请绑定您在{{title1}}的登录手机号</p>
                <el-form ref="bindForm" :rules="bindRules" class="form-wrap" :model="bindArgs" label-width="120px">
                    <el-form-item label="手机号：" prop="phone">
                        <el-input v-model.trim="bindArgs.phone" class="phone-input" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码：" prop="verifyCode">
                        <el-input placeholder="请输入验证码" v-model.trim="bindArgs.verifyCode" class="code-input"></el-input>
                        <el-button type="primary" :disabled="verifyCodeState.disabled" @click="fetchVerifyCode">
                            {{verifyCodeState.btnText}}
                        </el-button>
                    </el-form-item>
                </el-form>
                <p class="prompt">
                    若您输入的手机号未注册，系统将自动为您创建账号。注册即视为同意
                    <span class="protocol" v-if="bindArgs.type == 1"
                          onclick="window.open('http://www.yayiabc.com/protocols/aboutABC')">{{Mp}}</span>
                    <span class="protocol" v-else @click="goProtocol">{{Mp}}</span>
                </p>
                <el-button class="next-btn" type="primary" @click="bindUser">下一步</el-button>
            </div>
        </div>
        <message :title="title" v-show="messageShow" @messageshow="messageChange">{{content}}</message>
        <public-footer></public-footer>
    </div>
</template>

<script type="text/ecmascript-6">
  import publicHeader from '../index/publicHeader'
  import saleHeader from '../../salesman/index/header.vue'
  import publicFooter from '../index/publicFooter'
  import message from "../../salesman/index/message"

  export default {
    name: 'wxBind',
    data() {
      return {
        bindRules: {
          phone: [
            {required: true, message: '请输入手机号', trigger: 'change'},
            {pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/, message: '请输入正确的手机号'}
          ],
          verifyCode: [
            {required: true, message: '请输入验证码', trigger: 'change'},
            {pattern: /^\d{4}$/, message: '请输入正确格式验证码', trigger: 'blur'}
          ]
        },
        bindArgs: {
          phone: '',
          verifyCode: '',
          type: ''
        },
        verifyCodeState: {
          btnText: '获取验证码',
          disabled: false
        },
        title1: '',
        Mp: '',
        messageShow: false,
        title: '',
        content: '',
      }
    },
    methods: {
      queryToArgs() {
        let query = window.location.search.substr(1),
          args = {}
        if (!query) return {}
        query.split('&').forEach(item => {
          let temp = item.split('=')
          args[temp[0]] = temp[1]
        })
        return args
      },
      async fetchVerifyCode() {
        let waitTime = 59,
          phonePattern = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
          res = null
        if (!phonePattern.test(this.bindArgs.phone)) {
          this.$message.error('请输入正确的手机号')
          return
        }
        try {
          res = await this.global.axiosPostReq('/user/getVerifyCode', {phone: this.bindArgs.phone})
          if (res.data.callStatus !== 'SUCCEED') throw res.data.msg + ''
          this.$message({
            message: '验证码发送成功',
            type: 'success'
          })
        } catch (e) {
          this.$message.error(e)
          return
        }
        //重置获取验证码
        this.verifyCodeState.disabled = true
        this.timer = setInterval(() => {
          waitTime--
          this.verifyCodeState.btnText = `请等待${waitTime}s`
          if (waitTime === 1) {
            clearInterval(this.timer)
            this.verifyCodeState.disabled = false
            this.verifyCodeState.btnText = '获取验证码'
          }
        }, 1000)
      },
      bindUser() {
        this.$refs['bindForm'].validate(async (valid) => {
          if (!valid) return
          this.global.axiosPostReq('/wxLogin/bindUser', this.bindArgs).then(res => {
            //sessionStorage中存取数据
            window.sessionStorage.setItem('bindinfo', JSON.stringify(Object.assign({openid: this.openid}, res.data.data)));
            if (res.data.callStatus === 'SUCCEED') {
              window.sessionStorage.setItem('bindinfo', JSON.stringify(Object.assign({openid: this.openid}, res.data.data)))
              //1.牙医跳转 2.创客跳转
              if (this.bindArgs.type === '1') {
                this.$router.replace({name: 'userRegister'})
              } else {
                this.$router.replace({name: 'saleWxInfo'})
              }
            } else {
              if (res.data.errorCode === 'Username_NOT_Exist') {
                if (this.bindArgs.type === '1') {
                  this.$router.replace({name: 'userRegister'})
                } else {
                  this.$router.replace({name: 'saleWxInfo'})
                }
              } else {
                this.$message.error(res.data.msg)
              }
            }
          })
        })
      },
      goProtocol() {
        this.messageShow = true;
        this.title = `创客管理协议`
        this.content = `
甲方：上海庄乾牙科科技有限公司
乙方：注册用户
1.总则
第1条 本协议之甲方为yayiabc.com平台（以下称平台）的所有者与运营管理者，对于在平台上所发布的一切协议/规则/活动拥有最终解释权，并因此承担一切法律责任与后果。
第2条 本协议之乙方为平台的注册用户，所谓“创客”专指在平台创客系统注册的/有义齿工厂销售背景的/自愿与平台进行销售/客服合作的注册用户：
（1）注册前，必须认真阅读本协议条款；
（2）注册行为完成，则表示乙方同意并自愿接受本协议条款，获得本协议条款所规定的权利/义务/责任，承担因违约带来的责任/后果。
第3条 甲方有权根据平台之经营管理的需要与经营环境的变化，适时对本协议条款进行完善与修改，同时：
（1）甲方对于协议条款的修改，必须先行在平台公示一个月/然后才能执行；
（2）甲方对于协议条款的修改，以不损害乙方的既有利益为前提。
2. 注册规则
第4条 乙方注册时必须完整/真实地填写注册内容，并承担因填写虚假信息所带来的一切法律后果与责任；乙方注册审核的周期为1个工作日。
3. 保密规则
第5条 甲方对于乙方的注册信息承担保密义务与责任：
(1) 甲方承诺：甲方不得向任何第三方透露乙方注册信息；未经乙方授权，甲方亦不得向任何商业合作方链接乙方注册信息；
(2) 由于甲方的数据存储于第三方云端服务器，对于因第三方云端服务器安全原因导致的乙方注册信息泄露，甲方免担责任；但甲方有义务在乙方授权的前提下代表乙方向第三方云端服务器提供商进行交涉与索赔；
(3) 因政府管理部门强制获取乙方注册信息的行为，导致乙方注册信息的泄露，甲方免担责任。
(4) 因甲方原因，导致乙方的注册信息泄露给第三方，由甲方承担责任，并按国家有关法律规定进行处理。
第6条 乙方对于在甲方获得的一切商业信息，必须承担保密义务与责任：
(1) 该一切商业信息包括但不限于：甲方对乙方的培训内容与方法、甲方的销售计划与推广方式、乙方绑定的客户信息与采购数据、乙方的销售业绩与收入数据、甲方的利益分享方式与数据；
(2) 对于乙方向任何第三方泄露甲方商业信息的行为，甲方保留采取一切责任追究与索赔的权力，包括关闭其注册账户。
4. 客户绑定规则
第7条 本协议所指客户包括：
(1) 牙科门诊/牙科医院；
(2) 义齿制作工厂/义齿制作公司；
(3) 牙科医生/牙科门诊与牙科医院从业人员；
(4) 牙科技工/义齿制作工厂与公司从业人员。
第8条 本协议之客户绑定，是指在本平台注册的客户与乙方的链接关系：
(1) 客户注册时，明确填写注册客服代表为乙方；
(2) 客户与乙方的绑定行为发生，该客户的平台交易行为将自动与乙方发生链接，乙方自动分享客户商业价值的收益；
(3) 甲方无权修改客户与乙方的绑定关系；但对于客户自行修改的绑定关系，甲方予以承认；
(4) 对于客户自行修改的绑定关系，审核时间为3个工作日；期间，甲方会与客户沟通，并在第一时间通知乙方。
第9条 乙方绑定客户的有效认定，按以下条款执行：
(1) 对于牙科门诊/牙科医院/义齿制作工厂/义齿制作公司类客户，在平台注册时绑定乙方；
（2）该客户在注册后10个工作日内完成第一笔采购行为，则该客户与乙方的绑定生效；（3）若该客户在注册后10个工作日内未完成第一笔采购，则甲方平台会自动取消该客户与乙方的绑定链接，并在取消前提醒乙方完成交易。
(4) 对于牙医/技工类客户，在yaiyiabc.com注册时绑定乙方，即为有效；但是，若该客户在注册后6个月内，未有平台交易行为，则甲方有权中止该客户与乙方的绑定关系；
（5）本条款所谓“平台交易行为”是指：平台的培训/进修/采购等活动的参与或购买。
第10条 对于第9条第（1）款所指客户，在绑定关系确定后，若其连续3个月未在平台发生采购行为，则平台将自动取消该客户与乙方的绑定关系；但平台之客服会及时提醒/并帮助乙方促成该绑定客户的平台采购行为。
第11条 对于因故取消既有绑定关系的客户，甲方会及时在平台创客系统内公布，所有销售创客都有权利按本协议条款对该客户进行绑定。
5.利益分享规则
第12条 乙方对于其绑定客户在平台的一切购买交易行为给甲方带来的收入，包括客户因特殊情形的线下购买交易行为给甲方带来的收入，均享有利益分享权；但对于公益与营销推广行为的交易所产生的甲方收入，乙方没有利益分享权。
第13条 甲方对于乙方的利益分享之基本标准确定如下：
(1) 耗材类产品，乙方按其绑定客户的实际交易总额之5%分享收益；
(2) 工具设备类产品，乙方按其绑定客户的实际交易总额之1.5%分享收益；
(3) 服务类产品，包括但不限于培训/进修，乙方按其绑定客户的实际交易总额之6%分享收益；
(4) 知识产权类产品，包括但不限于病例点击/视屏点击收费，乙方按其绑定客户的实际交易总额之6%分享收益。
第14条 协议有效期内，甲方不以任何理由与借口，降低乙方的利益分享标准。
第15条 甲方对于乙方利益分享标准的执行过程操作如下：
(1) 甲方将根据其自身的市场运营计划与产品的推广策略按月制定并公布乙方的实际分享标准；
(2) 甲方承诺在乙方的注册账户内及时公布与链接其利益分享标准及其绑定客户交易的一切信息；
(3) 甲方与乙方的分享收益结算约定：每月18日结算上一月度的业务，并将乙方所得分享收益打入乙方绑定的结算账户；因乙方收益涉及需缴纳其个人所得税的，由甲方代扣代缴，并在乙方注册账户中显示其实际缴纳之所得税金额。
6.甲乙双方的义务与责任承担规则
第16条 甲方有协助乙方共同成长的义务，通过产品培训/技术培训/销售培训等课程帮助乙方提高客服与销售能力；乙方承诺，每年至少参加完成甲方培训课程的60%；若乙方违反本条约定，甲方保留关闭乙方账户的权力。
第17条 甲方承诺其在乙方的注册账户与系统内的数据的真实可靠性；
乙方承诺：其不向任何第三方公布于泄露其注册账户与系统内有权查阅的数据。
第18条 甲方关注乙方的生存安全，尊重乙方的独立人格与隐私，并在甲方自身经营条件允许的前提下，关心乙方的生存福利条件；
乙方承诺，恪守契约精神/执行甲方计划/遵守甲方规则/维护甲方声誉。
第19条 甲方承诺:对于本协议第13条乙方利益分享的基本标准之条款10年不变；
乙方承诺，理解并支持甲方为应对其经营条件与环境的转变，所必须进行的对于本协议部分条款的修改与完善。
7.合作中止规则
第20条 本协议为无固定期限协议，甲方发生以下情形，本协议自行中止：
（1）甲方破产清算；但甲方会与乙方结清已发生的属于乙方的分享收益；
(2) 甲方被第三方收购；既有团队无法主导平台之运营与管理；但甲方会与乙方结清已发生的属于乙方的分享收益。
第21条 乙方发生以下行为，甲方保留关闭乙方注册账户/单方面中止本合作关系的权利：
(1) 不是义齿工厂销售人员，虚假注册；
(2) 违反本协议保密条款；
(3) 欺骗客户/虚假销售；
(4) 在业务过程中有行贿受贿行为；
(5) 以甲方名义，私下与客户交易；
（6）以甲方名义，私下向客户推销其它同业第三方产品与服务；
（7）连续3次/未完成甲方的市场调查任务；
（8）在平台之行为违反平台管理的有关关闭注册账户的条款，包括在平台发表敌对社会与政府的言论。
第22条 甲方发生以下行为，乙方有权向有关政府部门举报，要求赔偿并中止合作关系：
(1) 甲方销售假货；
(2) 甲方未及时结算乙方的分享收益；
(3) 甲方有商业欺诈行为；
(4) 甲方向乙方提供虚假数据；
(5) 甲方有其它违背本协议条款的行为。
8.其它
第23条 乙方享有与甲方共同成长的权利，包括按甲方的管理规则获得甲方的期权奖励与内部股权投资的权利。

2017年6月19日（初稿）
2017年6月29日（修订）`
      },
      messageChange(e) {
        this.messageShow = e;
      },
    },
    components: {
      publicHeader,
      publicFooter,
      saleHeader,
      message
    },
    async created() {
      let code = this.queryToArgs()['code'],
        res = null
      //表示用户类型（1.牙医，2.销售）
      this.bindArgs.type = this.queryToArgs()['state']
      if (this.bindArgs.type === '1') {
        this.title1 = '牙医abc';
        this.Mp = '牙医abc注册协议';
      } else {
        this.title1 = '客服代表系统';
        this.Mp = '创客管理协议';
      }
      try {
        res = await this.global.axiosPostReq('/WXx/returnSignAndMessage', {code})
        console.log('测试用console', res)
        if (res.data.errorCode !== 'No_Error') throw res.data.msg
        //获取openId
        this.openid = res.data.data.sNSUserInfo.openId
        //如果为1表示已经绑定
        if (~~res.data.data.sNSUserInfo.sign) {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          //牙医类型为1
          if (this.bindArgs.type === '1') {
            this.global.setToken(res.data.token)
            this.global.setUser(res.data.data.user)
            this.$router.replace({name: 'index'})
          } else {
            this.global.setSalesToken(res.data.token)
            this.global.setSalesUser(res.data.data.saleInfo)
            this.$router.replace({name: 'salesIndex'})
          }
        }
      } catch (e) {
        console.log(e)
//        code错误
        this.$router.replace({name: 'index'})
//        this.$message.error(e)
      }
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">

    .headerBox {
        width: 100%;
        height: 70px;
        border-bottom: 1px #eee solid;
        box-shadow: 1px 1px 5px #eee;
    }

    .headerFirst {
        width: 1200px;
        height: 70px;
        line-height: 70px;
        margin: 0 auto;
        margin-bottom: 22px;
        font-size: 14px;
        color: #000;
        z-index: 1000;
    }

    .logo_img {
        width: 129px;
        height: 41px;
        margin-top: 15px;
    }

    .log {
        margin-left: 60px;
        position: relative;
    }

    .logIn:hover, .register:hover {
        color: #005aab;
        cursor: pointer;
        transition: all ease 0.5s;
    }

    .log_box, .log_box2 {
        width: 100%;
        height: 771px;
    }

    /*----------------------------------*/
    .wx-bind-container {
        border-top: 1px solid #ddd;
    }

    .wx-bind-wrap {
        width: 560px;
        margin: 0 auto;
        padding-top: 60px;
    }

    .title {
        font-size: 18px;
        text-align: center;
        color: #333;
    }

    .bind-text {
        font-size: 14px;
        text-align: center;
        color: #999;
        padding-top: 16px;
    }

    .form-wrap {
        padding-top: 20px;
    }

    .phone-input {
        width: 406px;
    }

    .code-input {
        width: 300px;
    }

    .prompt {
        padding-left: 120px;
        padding-right: 30px;
        font-size: 14px;
        line-height: 24px;
        color: #666;
        padding-bottom: 30px;
    }

    .next-btn {
        margin-bottom: 250px;
        width: 410px;
        margin-left: 120px;
    }

    .protocol {
        color: #0458a5;
        cursor: pointer;
    }

    .protocol:hover {
        text-decoration: underline;
    }
</style>

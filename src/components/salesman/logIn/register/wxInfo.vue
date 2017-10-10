<template>
  <div>
    <div class="header-box">
      <div class="header">
        <img src="../../../../images/index/logo-min.png" alt="" @click="goBack">
        <!--<div>-->
          <!--<span @click="goBack">登录</span>/ <span>注册</span>-->
        <!--</div>-->
      </div>
    </div>
    <div class="form_container">
      <div class="form_p">
        <p>微信已成功绑定客服代表系统的账号！</p>
        <p>请先完善您的个人资料</p>
      </div>
      <div class="form_each">
        <div class="input_label"><span class="redStar">*</span>真实姓名</div>
        <input type="text" class="inputBox" v-model="registerData.trueName">
        <div class="clr"></div>
      </div>
      <div class="form_each">
        <div class="input_label"><span class="redStar">*</span>性别</div>
        <div class="sexInputs">
          <input type="radio" name="sex" class="" @click="sexSet(1)"><span>男</span>
        </div>
        <div class="sexInputs">
          <input type="radio" name="sex" class=""  @click="sexSet(2)"><span>女</span>
        </div>
        <div class="clr"></div>
      </div>
      <div class="form_each">
        <div class="input_label"><span class="redStar">*</span>身份证号</div>
        <input type="text" class="inputBox" v-model="registerData.idCode">
        <div class="clr"></div>
      </div>
      <div class="form_each">
        <div class="input_label"><span class="redStar">*</span>工作单位</div>
        <input type="text" class="inputBox" v-model="registerData.company">
        <div class="clr"></div>
      </div>
      <div class="form_each">
        <div class="input_label"><span class="redStar">*</span>工作职位</div>
        <input type="text" class="inputBox" v-model="registerData.work">
        <div class="clr"></div>
      </div>
      <div class="form_each">
        <div class="input_label"><span class="redStar">*</span>所在地省市区</div>
        <selectThree @listenToChild="showFromChild" :selected="registerData.part" class="select3"></selectThree>
        <div class="clr"></div>
      </div>
      <div class="form_each">
        <div class="input_label"><span class="redStar">*</span>详细地址</div>
        <input type="text" class="inputBox" v-model="registerData.address">
        <div class="clr"></div>
      </div>
      <div class="form_each">
        <div class="input_label">推荐人姓名</div>
        <input type="text" class="inputBox" v-model="registerData.referrals">
        <div class="clr"></div>
      </div>
      <div class="form_each">
        <div class="input_label">出生日期</div>
        <el-date-picker class="select3" v-model="registerData.birthday" type="date" placeholder="选择日期"></el-date-picker>
        <div class="clr"></div>
      </div>
      <div class="form_each">
        <div class="input_label">学历</div>
        <input type="text" class="inputBox" v-model="registerData.education">
        <div class="clr"></div>
      </div>
      <div class="form_each">
        <div class="input_label">微信号</div>
        <input type="text" class="inputBox" v-model="registerData.wechar">
        <div class="clr"></div>
      </div>
      <div class="form_each">
        <div class="input_label">邮箱</div>
        <input type="text" class="inputBox" v-model="registerData.email">
        <div class="clr"></div>
      </div>
      <div class="form_each">
        <div class="yyMP"><input type="checkbox" @click="changeReadyyMP"> 我已阅读并同意<span @click="goProtocol">创客管理协议</span></div>
      </div>
      <div class="form_each">
        <button class="submitButton" @click="submit">确定</button>
      </div>
    </div>
    <message :title="title" v-show="messageShow" @messageshow="messageChange">{{content}}</message>
    <public-footer></public-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import publicHeader from '../../../website/index/publicHeader'
  import publicFooter from '../../../website/index/publicFooter'
  import global from '../../../global/global'
  import selectThree from "../../../website/details/selectThree"
  import message from "../../index/message"
  import util from '../../../../common/util'

  export default {
    data(){
      return{
        registerData:{
          openid:'',
          phone:'',
          password:'',
          trueName:'',
          sex:'',
          idCode:'',
          company :'',
          work:'',
          part:'',
          address:'',
          referrals:'',
          birthday:'',
          education:'',
          wechar:'',
          email:''
        },
        readyyMP:false,
        isGetCode : false,
        messageShow: false,
        title: '',
        content: '',
      }
    },
    components:{
      publicHeader,
      publicFooter,
      selectThree,
      message
    },
    created(){
      let temp = JSON.parse(window.sessionStorage.getItem('bindinfo'));
      console.log(temp);
      this.registerData.number = temp.saleId ? 1 : 2
      this.registerData.openid = temp.openid;
      this.registerData.phone = temp.phone;
      this.trueName = temp.trueName;
      this.sex = temp.sex;
      this.idCard = temp.idCode;
      this.company = temp.workUnit;
      this.work = temp.workPosition;
      this.part = (temp.part + '').split('/');
      this.address = temp.address;
      this.referrals = temp.referrals;
      this.birthday = temp.birthday;
      this.education = temp.education;
      this.weChar = temp.weChar;
      this.email = temp.email;
    },
    methods:{
      showFromChild(data){
        this.registerData.part =  data;
      },
      changeReadyyMP(){
        this.readyyMP = !this.readyyMP;
      },
      sexSet(i){
        this.registerData.sex = i;
      },
      submit(){
        var params = {};
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var idCardReg = /^(\d{15}|\d{17}[\dxX])$/;
        switch (true) {
          case !this.registerData.trueName:
            this.$message.error('请填写您的真实姓名')
            return
          case !this.registerData.sex:
            this.$message.error('请选择您的性别')
            return
          case !(this.registerData.idCode && idCardReg.test(this.registerData.idCode)):
            this.$message.error('请输入正确的身份证号码')
            return
          case !this.registerData.company:
            this.$message.error('请填写您的单位名称')
            return
          case !this.registerData.part:
            this.$message.error('请选择您的单位所在地')
            return
          case !this.registerData.address:
            this.$message.error('请填写您的单位详细地址')
            return
          case !this.readyyMP:
            this.$message.error('请阅读并勾选创客注册协议')
            return
          default:
            break
        }
        params = {
          phone: this.registerData.phone,
          openid: this.registerData.openid,
          number: this.registerData.number,
          trueName: this.registerData.trueName,
          sex: this.registerData.sex,
          idCard: this.registerData.idCode,
          workUnit: this.registerData.company,
          workPosition: this.registerData.work,
          part: this.registerData.part.join('/'),
          address: this.registerData.address,
          referrals: this.registerData.referrals,
          birthday: util.formatDate.format(new Date(this.registerData.birthday)) || '1970-01-01',
          education: this.registerData.education,
          weChar: this.registerData.weChar,
          email: this.registerData.email
        };
        this.global.axiosPostReq('/wxLogin/updateSaleInfo',params).then(res =>{
          if(res.data.callStatus === 'SUCCEED'){
            global.setSalesToken(res.data.token);
            global.setSalesUser(res.data.data);
            this.$message({
              message: '注册成功！',
              type: 'success'
            });
            this.$router.push('/salesIndex');
            for(let props in this.registerData){
              this.registerData[props] = '';
            }
          }else {
            this.$message.error(res.data.msg)
          }
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
      goBack(){
        this.$router.push('salesLog')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .el-input__inner{
    border-color: #ddd;
    border-radius: 0px;
  }
  .el-input__icon{
    color: #333;
  }
</style>

<style scoped lang="scss" rel="stylesheet/scss">
  .clr{
    clear: both;
  }
  .header-box{
    width: 100%;
    border-bottom: 1px solid #ddd;
    margin-bottom: 22px;
  }
  .header{
    width: 1200px;
    height: 70px;
    margin: 0 auto;
    img{
      width: 129px;
      height: 41px;
      margin-top: 15px;
    }
    div{
      float: right;
      line-height: 70px;
      span:nth-child(1){
        cursor: pointer;
        color: black;
      }
      span:nth-child(1):hover{
        color: #005aab;
      }
      span:nth-child(2){
        cursor: pointer;
        color: #005aab;
      }
    }
  }
  .form_container{
    width: 520px;
    margin: 85px auto 0;
  }
  .form_each{
    width: 100%;
    height: 40px;
    margin-bottom: 25px;
    position: relative;
  }
  .form_p {
    width: 100%;
    text-align: center;
    height: 55px;
    padding-left: 50px;
    margin-bottom: 25px;
    position: relative;
    p:nth-child(1) {
      font-size: 18px;
      color: #333;
      margin-bottom: 15px;
    }
    p:nth-child(2) {
      font-size: 14px;
      color: #666;
    }
  }
  .input_label{
    width: 100px;
    padding-right: 20px;
    height: 40px;
    line-height: 40px;
    font-size:14px;
    text-align: right;
    float: left;
    .redStar{
      color: red;
    }
  }
  .inputBox{
    width: 396px;
    height:38px;
    float: left;
    border: 1px solid #ddd;
  }

  .sexInputs{
    height: 40px;
    width: 150px;
    float: left;
    line-height: 40px;
    input{
      margin: 0 15px 0 15px;
      vertical-align: middle;
    }
  }
  .select3{
    width: 400px;
  }
  .yyMP{
    margin-left: 120px;
    line-height: 40px;
    font-size: 12px;
    color: #666;
    input{
      vertical-align: middle;
    }
    span{
      color: #0097ff;
      cursor: pointer;
    }
  }
  .submitButton{
    margin-left: 120px;
    height: 40px;
    width: 400px;
    border: none;
    outline: none;
    background-color: #0458a5;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
  .submitButton:hover{
    background-color: #329af0;
    transition: all 0.5s;
  }
</style>
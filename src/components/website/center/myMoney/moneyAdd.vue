<template>
  <div>
    <!--头部规则开始-->
    <div class="topBox">
      <ul class="payCoinUlFirst">
        <li class="payCoinFirst">
          <span>当前乾币&nbsp;:&nbsp;</span>
          <span>{{coinNum.sum}}</span>
        </li>
        <li>
          <img class="coinImgBig" src="../../../../images/center/coinMoneyZ.png" alt="">
          <span class="fontColor">{{coinNum.qbBalance}}</span>
          <i class="borderRight"></i>
        </li>
        <li>
          <img class="coinImgBig" src="../../../../images/center/coinMoney95.png" alt="">
          <span class="fontColor">{{coinNum.aQb}}</span>
          <i class="borderRight"></i>
        </li>
        <!-- <li>
          <img class="coinImgBig" src="../../../../images/center/coinMoney9.png" alt="">
          <span class="fontColor">{{coinNum.bQb}}</span>
          <i class="borderRight"></i>
        </li> -->
        <li>
          <img class="coinImgBig" src="../../../../images/center/coinMoney8.png" alt="">
          <span class="fontColor">{{coinNum.cQb}}</span>
        </li>
      </ul>
    </div>
    <!--头部规则结束-->

    <!--选择钱币类型开始-->
    <ul class="payCoinUlSecond">
      <li>
        <div class="divFirst">选择乾币类型&nbsp;:</div>
        <div class="colorTextFirst">(&nbsp;1乾币抵1元&nbsp;)</div>
      </li>
      <li @click="ruleButton(1)" class="ulSecondLi">
        <div>
            <img class="coinImgSmall" src="../../../../images/center/coinMoney955.png" alt="">
        </div>
        <div class="ruleFirst">1枚起购</div>
        <div class="saleRule">(&nbsp;1枚乾币售价&nbsp;:&nbsp;¥&nbsp;0.95&nbsp;)</div>
        <img v-show="ruleNum != 1" class="liImgNo" src="../../../../images/center/noCoin.png" alt="">
        <img v-show="ruleNum == 1"  class="liImgNo" src="../../../../images/center/yesCoin.png" alt="">
      </li>
      <!-- <li  @click="ruleButton(2000)" class="ulSecondLi">
        <div>
            <img class="coinImgSmall" src="../../../../images/center/coinMoney99.png" alt="">
        </div>
        <div class="ruleFirst">2000枚起购</div>
        <div class="saleRule">(&nbsp;1枚乾币售价&nbsp;:&nbsp;¥&nbsp;0.9&nbsp;)</div>
        <img v-show="ruleNum != 2000" class="liImgNo" src="../../../../images/center/noCoin.png" alt="">
        <img v-show="ruleNum == 2000" class="liImgNo" src="../../../../images/center/yesCoin.png" alt="">
      </li> -->
      <li @click="ruleButton(5000)" class="ulSecondLi">
        <div>
            <img class="coinImgSmall" src="../../../../images/center/coinMoney88.png" alt="">
        </div>
        <div class="ruleFirst">5000枚起购</div>
        <div class="saleRule">(&nbsp;1枚乾币售价&nbsp;:&nbsp;¥&nbsp;0.8&nbsp;)</div>
        <img v-show="ruleNum != 5000" class="liImgNo" src="../../../../images/center/noCoin.png" alt="">
        <img  v-show="ruleNum == 5000" class="liImgNo" src="../../../../images/center/yesCoin.png" alt="">
      </li>
    </ul>
    <!--选择钱币类型结束-->

    <!--充值的乾币数开始-->
    <div class="payCoinNumBox">
      <span class="payCoinNumText">充值的乾币数&nbsp;:&nbsp;</span>
      <input @change="coinNumer" v-model="inputPayCoin" class="payInput" type="text" placeholder="请输入充值的乾币数" :class="{'placeholderRed': this.placeholderRed == false}">
    </div>
    <!--充值的乾币数结束-->

    <!--实际支付金额开始-->
    <div class="realPayBox">
      <span>实际支付金额&nbsp;:&nbsp;</span>
      <span class="colorTextSecond">{{countPaySum}}</span>
    </div>
    <!--实际支付金额结束-->

    <!--支付方式开始-->
    <div class="payWay">
      <span class="payWayText">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;支付方式&nbsp;:&nbsp;</span>
      <span class="payWayBoxSecond">
        <input v-model="payWay" id="zfbPay" value="zfb" type="radio" name="payWay">
        <label class="zfbPay" for="zfbPay"></label>
        <img class="zfbPayPng" src="../../../../images/center/zfbPay.png" alt="">
        <span class="payZFBText">支付宝</span>

        <input v-model="payWay" id="wxPay" value="wx" type="radio" name="payWay">
        <label class="wxPay" for="wxPay"></label>
        <img class="zfbPayPng" src="../../../../images/center/wxPay.png" alt="">
        <span class="payZFBText">微信</span>

      </span>
    </div>
    <!--支付方式结束-->

    <!--<el-alert-->
            <!--title="错误提示的文案"-->
            <!--type="error"-->
            <!--@close="closeAlert">-->
    <!--</el-alert>-->

    <!--支付按钮开始-->
    <div class="payButton" @click="savePay">
      支付
    </div>
    <!--支付按钮结束-->

    <!--微信支付的模态框-->
    <el-dialog :visible.sync="WxTableVisible" :before-close="handleClose" size="small">
      <div style="margin-bottom:30px;">
        <img class="WePayLogo" src="../../../../images/gwc/WePayLogo.png" alt="img">
        <img class="wxR" src="../../../../images/gwc/wxR.png" alt="img">
        <p class="wxRealPay">应付金额：<span style="color:#cb1700; font-weight: bold;">¥{{countPaySum}}</span></p >
      </div>
      <div style="text-align:center;margin-bottom:10px;">
        <img style="width:260px;height:260px;" :src="wxImg" alt="img">
      </div>
      <div style="text-align:center">
        <img src="../../../../images/gwc/wxDes.png" alt="img">
      </div>
    </el-dialog>


    <!--结束-->
  </div>
</template>

<script>
	import global from '../../../global/global.js'
  export default {
    name: 'myMoneyAdd',
    data () {
      return {
        placeholderRed: true,
        WxTableVisible: false,
        kk: 1,
        wxImg: '',
        ruleNum: 1,
        inputPayCoin: '',
        canPay: false,
        payWay: 'zfb',
        coinNum: {
          qbBalance: 0,
          aQb: 0,
          qbNotwtih: 0,
          cQb: 0,
          sum: 0
        },
        qbType : 'c_qb', //充值乾币的类型 默认cqb 9.5折
      }
    },
    created(){
      this.getCoinData();
    },
    methods: {
      // 确认关闭
      handleClose: function() {
        var that = this;
        that.$confirm('确认关闭微信支付页面？').then(_ => {
          that.kk = 600
          that.WxTableVisible = false;
          done();
        }).catch(_ => {});
      },
      ruleButton (rule){
        this.ruleNum = rule;
      },
      coinNumer (){
        if(this.inputPayCoin === '')
        {
          this.inputPayCoin = 0;
        }
      },
      getCoinData(){
        this.global.axiosGetReq('/userWith/showUserQbNum', {}).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.coinNum.qbBalance = res.data.data.qbBalance;
            this.coinNum.aQb = res.data.data.cQb;
            this.coinNum.qbNotwtih = res.data.data.qbNotwtih;
            this.coinNum.cQb = res.data.data.aQb;
            this.coinNum.sum = this.coinNum.cQb + this.coinNum.aQb +  this.coinNum.qbBalance + this.coinNum.qbNotwtih;
          }
        })
      },
      savePay(){
        if(this.inputPayCoin === '')
        {
          this.placeholderRed = false;
          this.canPay = false;
        }
        if(this.canPay === true)
        {
          console.log(this.qbType,this.inputPayCoin);

          //支付宝支付
          if(this.payWay === 'zfb')
          {
            let obj = {
              token: this.global.getToken(),
              qbNum: this.inputPayCoin,
              qbType: this.qbType,
              computerOrPhone: 'computer'
            };
            this.global.axiosGetReq('/pay/recharge',obj).then((res) => {
               console.log(res,'哈哈');
               window.location.href = res.request.responseURL
            })
          }
          //微信支付
          else {
            let that = this;
            this.WxTableVisible = true;
            let token = this.global.getToken();
	          let baseUrl = global.baseUrl;
	          console.log(baseUrl);
            this.wxImg = baseUrl + '/weixin/unifiedOrderCharge' + '?money=' + this.inputPayCoin + '&token=' + token + '&qbType=' + this.qbType;
            that.kk = 1;
            var timer = setInterval(function(){
              if (that.kk == 600) {
                clearInterval(timer);
                return false
              }
              var obj = {
                token: that.global.getToken()
              }
              that.global.axiosGetReq('/weixin/checkChargeState',obj).then((res) => {
                if (res.data.num == 2) {
                  clearInterval(timer);
                  that.WxTableVisible = false;
                  that.$alert('恭喜您，充值成功', {
                    confirmButtonText: '确定',
                    callback: action => {
                      that.$router.go(0)
                    }
                  });
                  // that.$alert("恭喜您，充值成功！", {confirmButtonText: '确定'});
                  // that.$message('恭喜您，充值成功！')
                } else {
                  that.kk++
                  // that.$message.error('网络出错，请稍后再试！');
                }
              })
            },3000);


          }

        }
      }
    },
    watch:{
      inputPayCoin :function (val, oldVal) {
        this.placeholderRed = true;
        if(this.ruleNum === 1)
        {
          if(this.inputPayCoin < 1)
          {
            this.inputPayCoin = 1;
          }
        }
        if(val < 2000)
        {
	      this.qbType = 'c_qb';
          this.ruleNum = 1;
        }else if(val >= 2000 && val < 5000)
        {
          this.ruleNum = 2000;
	      this.qbType = 'b_qb';
        }else if(val >= 5000)
        {
          this.ruleNum = 5000;
	      this.qbType = 'a_qb';
        }
        
        
        if(!new RegExp(/^[1-9]([0-9]*)$|^[0-9]$/).test(val))
        {
          this.inputPayCoin = ''
        }
      }
    },
    computed: {
        countPaySum () {
            if(this.ruleNum === 1)
            {
              this.qbType = 'c_qb';
              this.canPay = true;
              let sum = Number(this.inputPayCoin) * 0.95;
              return sum.toFixed(2);
            }else if(this.ruleNum === 2000)
            {
              this.qbType = 'b_qb';
              if(this.inputPayCoin < 2000  && this.inputPayCoin !== '')
              {
                this.canPay = false;
                return '请输入大于2000的乾币数'
              }
              this.canPay = true;
              let sum = Number(this.inputPayCoin) * 0.9;
              return sum.toFixed(2)
            }else if(this.ruleNum === 5000)
            {
              this.qbType = 'a_qb';
              if(this.inputPayCoin < 5000 && this.inputPayCoin !== '')
              {
                this.canPay = false;
                return '请输入大于5000的乾币数'
              }
              this.canPay = true;
              let sum = Number(this.inputPayCoin) * 0.8;
              return sum.toFixed(2)
            }
        }
    },

  }
</script>

<style scoped>
    .coinImgSmall{
        width: 40px;
        height: 40px;
        margin-top: 3px;
    }
  .WePayLogo {
    width: 125px;
    height: 34px;
  }
  .wxR {
    width: 79px;
    height: 34px;
  }
  .wxRealPay {
    float: right;
    margin-top: 10px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }
  .payButton{
    margin-left: 116px;
    text-align: center;
    background-color: #005aab;
    color: white;
    font-size: 16px;
    height: 40px;
    width: 401px;
    line-height: 40px;
    margin-top: 45px;
    border-radius: 6px;
    cursor: pointer;
  }
  .payZFBText{
    margin-left: 14px;
    font-size: 14px;
    vertical-align: middle;
  }
  .zfbPayPng{
    vertical-align: top;
    margin-left: 10px;
  }
  .payWayBoxSecond{
    display: inline-block;
    vertical-align: middle;
  }
  .payWayText{
    display: inline-block;
    width: 116px;
    vertical-align: text-top;
    margin-top: 1px;
  }
  .wxPay{
    position: relative;
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 1px solid #cdcdcd;
    border-radius: 50%;
    vertical-align: middle;
    margin-top: 2px;
    margin-left: 123px;
  }
  .zfbPay{
    margin-top: 2px;
    position: relative;
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 1px solid #cdcdcd;
    border-radius: 50%;
    vertical-align: middle;
  }
  .wxPay,.zfbPay{
    cursor:pointer;
  }
  #zfbPay,#wxPay{
    display: none;
  }
  #zfbPay:checked+.zfbPay:after{
    background-color: #005aab;
  }
  #zfbPay:checked + .zfbPay{
    border: 1px solid #005aab;
  }
  #wxPay:checked+.wxPay:after{
    background-color: #005aab;
  }
  #wxPay:checked + .wxPay{
    border: 1px solid #005aab;
  }
  .zfbPay:after{
    content: '';
    display: block;
    position: absolute;
    top: 4px;
    left: 4px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: transparent;
  }
  .wxPay:after{
    content: '';
    display: block;
    position: absolute;
    top: 4px;
    left: 4px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: transparent;
  }
  .payWay{
    font-size: 14px;
    margin-top: 47px;
  }
  .realPayBox span:nth-child(1){
    display: inline-block;
    width: 116px;
    vertical-align: middle;
  }
  .colorTextSecond{
    display: inline-block;
    color: #ab0000;
    font-size: 18px;
    min-width: 116px;
    vertical-align: middle;
  }
  .realPayBox{
    font-size: 14px;
    margin-top: 51px;
  }
  .payInput{
    border: 1px solid #dddddd;
    width: 623px;
    height: 40px;
    padding-left: 20px;
    font-size: 14px;
  }
  .payInput:focus{
    border: 1px solid #005aab;
  }
  .payCoinNumText{
    display: inline-block;
    width: 116px;
    font-size: 14px;
    vertical-align: middle;
  }
  .payCoinNumBox{
    margin-top: 53px;
  }
  .liImgNo{
    position: absolute;
    right: -1px;
    top:-1px;
  }
  .payCoinUlSecond::after{
    content: '';
    display: block;
    clear: both;
  }
  .payCoinUlSecond li:nth-child(n+2){
    position: relative;
    cursor:pointer;
  }
  .payCoinUlSecond li:nth-child(n+3){
    margin-left: 48px;
  }
  .saleRule{
    margin-top: 8px;
  }
  .ruleFirst{
    font-size: 16px;
    color: #005aab;
    margin-top:16px;
  }
  .coinCircleFirst{
    line-height: 45px;
    display: inline-block;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background-color: #d0ad61;
    color: white;
    font-size: 16px;
    margin-top: 2px;
  }
  .ulSecondLi{
    width: 177px;
    border: 1px solid #dddddd;
  }
  .payCoinUlSecond{
    margin-top: 30px;
  }
  .payCoinUlSecond li{
    text-align: center;
    font-size: 14px;
    float: left;
    height: 117px;
  }
  .payCoinUlSecond li:nth-child(1){
    width: 120px;
    text-align: left;
  }
  .divFirst{
    margin-top: 37px;
  }
  .colorTextFirst{
    color: #cb1700;
    margin-top: 19px;
  }
  .topBox {
    height: 70px;
    line-height: 70px;
    margin-top: 30px;
  }

  .payCoinFirst {
    text-align: center;
    background-color: #f4f4f4;
    width: 337px;
    height: 70px;
    line-height: 70px;

  }
  .payCoinFirst span:nth-child(1){
    font-size: 18px;
    vertical-align: middle;
  }
  .payCoinFirst span:nth-child(2){
    font-size: 24px;
    vertical-align: middle;
    color: #005aab;

  }

  .payCoinUlFirst li{
    float: left;
  }
  .payCoinUlFirst li:nth-child(n+2){
    text-align: center;
    background-color: #f8f8f8;
    width: 174px;
    height: 70px;
    line-height: 70px;
  }
  .payCoinUlFirst li:last-child{
    width: 210px;
  }
  .coinImgBig{
    width: 44px;
    height: 44px;
    vertical-align: middle;
  }

  .fontColor {
    color: #005aab;
    font-size: 24px;
    vertical-align: middle;
    margin-left: 7px;
  }

  .borderRight {
    height: 34px;
    border-right: 1px solid #d0ad61;
    float: right;
    margin-top: 19px;
  }
  .placeholderRed::-webkit-input-placeholder{
    color: red;
  }
  .placeholderRed:-moz-placeholder {
    color: red;
  }
  .placeholderRed::-moz-placeholder {
    color: red;
  }
  .placeholderRed:-ms-input-placeholder {
    color: red;
  }
</style>

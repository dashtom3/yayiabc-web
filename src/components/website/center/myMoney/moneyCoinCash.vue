<template>
    <div>
        <!--头部规则乾币数量开始-->
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
                <li>
                    <img class="coinImgBig" src="../../../../images/center/coinMoney9.png" alt="">
                    <span class="fontColor">{{coinNum.bQb}}</span>
                    <i class="borderRight"></i>
                </li>
                <li>
                    <img class="coinImgBig" src="../../../../images/center/coinMoney8.png" alt="">
                    <span class="fontColor">{{coinNum.cQb}}</span>
                </li>
            </ul>
        </div>
        <!--头部规则乾币数量结束-->





        <!--选择乾币的类型和个数开始-->
        <!--<div v-if="!already">-->
        <div class="warp" :class="{'wrapBack': already == true}">
            <!--已经提现提示开始-->
            <div v-if="already" class="coinTxBox">
                <img class="coinTxBoxImg" src="../../../../images/center/boxbox.png" alt="">
                <span class="coinTxBoxText">乾币提现申请成功&nbsp;!&nbsp;管理员正在审核&nbsp;,&nbsp;请耐心等待&nbsp;...</span>
            </div>
            <!--已经提现提示结束-->


            <div class="selectText">
                选择提现的乾币类型和个数&nbsp;:
            </div>

            <ul class="coinSecondUl">
                <!--1-->
                <li :class="{'curous': already == true}" @click="selectCoinType('qbBalance')">
                    <div class="secondUlFirstDiv">
                        <img class="coinImgSmall" src="../../../../images/center/coinMoneyZZ.png" alt="">
                        <span class="fontSizeFirstSpan">(&nbsp;共{{coinNum.qbBalance}}个&nbsp;)</span>
                    </div>
                    <div>
                        <span class="fontSizeSecondSpan">提现乾币数:&nbsp;</span>
                        <input v-if="!already" @change="changeInputNum('qbBalance')" v-on:click.stop v-model="tCoinNum.qbBalance" class="coinInput" type="text">
                        <span v-if="already" class="txCoinNum">{{tCoinNum.qbBalance}}</span>
                    </div>
                    <div class="secondUlSecondDiv">
                        <span>提现金额&nbsp;:</span>
                        <span :class="{'colorRed': qbBalance > 0}" class="threeDivSpan">¥&nbsp;{{qbBalance}}</span>
                    </div>
                    <img v-show="!yesShow.qbBalance" class="liImgNo" src="../../../../images/center/noCoin.png" alt="">
                    <img v-show="yesShow.qbBalance"  class="liImgNo" src="../../../../images/center/yesCoin.png" alt="">
                </li>
                <!--2-->
                <li :class="{'curous': already == true}" @click="selectCoinType('aQb')">
                    <div class="secondUlFirstDiv">
                        <img class="coinImgSmall" src="../../../../images/center/coinMoney955.png" alt="">
                        <span class="fontSizeFirstSpan">(&nbsp;共{{coinNum.aQb}}个&nbsp;)</span>
                    </div>
                    <div>
                        <span class="fontSizeSecondSpan">提现乾币数:&nbsp;</span>
                        <input  v-if="!already" @change="changeInputNum('aQb')" v-on:click.stop  v-model="tCoinNum.aQb" class="coinInput" type="text">
                        <span v-if="already" class="txCoinNum">{{tCoinNum.aQb}}</span>
                    </div>
                    <div class="secondUlSecondDiv">
                        <span>提现金额&nbsp;:</span>
                        <span :class="{'colorRed': aQb > 0}" class="threeDivSpan">¥&nbsp;{{aQb}}</span>
                    </div>
                    <img v-show="!yesShow.aQb" class="liImgNo" src="../../../../images/center/noCoin.png" alt="">
                    <img v-show="yesShow.aQb" class="liImgNo" src="../../../../images/center/yesCoin.png" alt="">
                </li>
                <!--3-->
                <li :class="{'curous': already == true}" @click="selectCoinType('bQb')">
                    <div class="secondUlFirstDiv">
                        <img class="coinImgSmall" src="../../../../images/center/coinMoney99.png" alt="">
                        <span class="fontSizeFirstSpan">(&nbsp;共{{coinNum.bQb}}个&nbsp;)</span>
                    </div>
                    <div>
                        <span class="fontSizeSecondSpan">提现乾币数:&nbsp;</span>
                        <input v-if="!already" @change="changeInputNum('bQb')" v-on:click.stop  v-model="tCoinNum.bQb"  class="coinInput" type="text">
                        <span v-if="already" class="txCoinNum">{{tCoinNum.bQb}}</span>
                    </div>
                    <div class="secondUlSecondDiv">
                        <span>提现金额&nbsp;:</span>
                        <span :class="{'colorRed': bQb > 0}" class="threeDivSpan">¥&nbsp;{{bQb}}</span>
                    </div>
                    <img v-show="!yesShow.bQb" class="liImgNo" src="../../../../images/center/noCoin.png" alt="">
                    <img v-show="yesShow.bQb" class="liImgNo" src="../../../../images/center/yesCoin.png" alt="">
                </li>
                <!--4-->
                <li :class="{'curous': already == true}" @click="selectCoinType('cQb')">
                    <div class="secondUlFirstDiv">
                        <img class="coinImgSmall" src="../../../../images/center/coinMoney88.png" alt="">
                        <span class="fontSizeFirstSpan">(&nbsp;共{{coinNum.cQb}}个&nbsp;)</span>
                    </div>
                    <div>
                        <span class="fontSizeSecondSpan">提现乾币数:&nbsp;</span>
                        <input v-if="!already" @change="changeInputNum('cQb')" v-on:click.stop  v-model="tCoinNum.cQb"  class="coinInput" type="text">
                        <span v-if="already" class="txCoinNum">{{tCoinNum.cQb}}</span>
                    </div>
                    <div class="secondUlSecondDiv">
                        <span>提现金额&nbsp;:</span>
                        <span :class="{'colorRed': cQb > 0}" class="threeDivSpan">¥&nbsp;{{cQb}}</span>
                    </div>
                    <img v-show="!yesShow.cQb" class="liImgNo" src="../../../../images/center/noCoin.png" alt="">
                    <img v-show="yesShow.cQb" class="liImgNo" src="../../../../images/center/yesCoin.png" alt="">
                </li>
            </ul>
            <!--选择乾币的类型和个数结束-->

            <!--提现钱币总数开始-->
            <div class="allPrice">
                <span>提现乾币总数&nbsp;:&nbsp;&nbsp;</span>
                <span class="colorBluePrice">{{allNum}}</span>
            </div>
            <div class="allPriceRmb">
                <span>提现总额(&nbsp;元&nbsp;)&nbsp;:&nbsp;&nbsp;</span>
                <span class="colorBluePrice">{{allPrice}}</span>
            </div>
            <!--提现钱币总数结束-->

            <!--银行开信息开始-->
            <div>
                <span class="commonUseFont">提现至&nbsp;:&nbsp;&nbsp;&nbsp;</span>


                <!--支付宝-->
                <div :class="{'alreadyTx': already == true}" v-if="this.payWayShow === '支付宝'" class="txMsg">
                    <span class="typeBank">类型&nbsp;:&nbsp;{{payWayShow}}</span>
                    <span class="userBank">开户者&nbsp;:&nbsp;{{ZFBSecond.accountHolder}}</span>
                    <span class="accountNumberBank">支付宝账号&nbsp;:&nbsp;{{ZFBSecond.cardNumber}}</span>
                    <span v-if="!already" class="reviseButton2" @click="dialogVisible = true">修改</span>
                </div>

                <!--银行卡-->
                <div :class="{'alreadyTx': already == true}" v-if="this.payWayShow === '银行卡'" class="txMsg">
                    <span class="typeBank">类型&nbsp;:&nbsp;{{payWayShow}}</span>
                    <span class="khBank">开户银行&nbsp;:&nbsp;{{WXSecond.oBank}}</span>
                    <span class="userBank">开户者&nbsp;:&nbsp;{{WXSecond.accountHolder}}</span>
                    <span class="accountNumberBank">银行卡账号&nbsp;:&nbsp;{{WXSecond.cardNumber}}</span>
                    <span v-if="!already" class="reviseButton" @click="dialogVisible = true">修改</span>
                </div>

                <!--添加图提现账户-->
                <div v-if="this.payWayShow === ''" @click="dialogVisible = true" class="addTXUser">
                    <span class="addUserButton">+</span>
                    <span>添加提现账户</span>
                </div>
            </div>

            <!--添加银行信息-->

            <div class="dialogWrap">
                <el-dialog
                        title="提现账户"
                        :visible.sync="dialogVisible"
                        size="tiny"
                >
                    <div>
                        <span class="typeBox">类型&nbsp;:</span>
                        <span class="dialogBox">
                    <el-select v-model="payWay" class="selectedZF">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </span>
                    </div>

                    <!--支付宝的信息-->
                    <div v-if="this.payWay == '支付宝'">
                        <div class="userBankBox">
                            <span class="typeBox">开户者&nbsp;:</span>
                            <input v-model="ZFB.accountHolder" type="text" class="userBankPerson">
                        </div>
                        <div class="userBankBox">
                            <span class="typeBox">支付宝账号&nbsp;:</span>
                            <input v-model="ZFB.cardNumber" type="text" class="userBankPerson">
                        </div>
                    </div>


                    <!--银行的信息-->
                    <div v-if="this.payWay == '银行卡'">
                        <div class="userBankBox">
                            <span class="typeBox">开户者&nbsp;:</span>
                            <input v-model="WX.accountHolder" type="text" class="userBankPerson">
                        </div>
                        <div class="userBankBox">
                            <span class="typeBox">开户银行&nbsp;:</span>
                            <input v-model="WX.oBank" type="text" placeholder="开户银行请具体到支行" class="userBankPerson">
                        </div>
                        <div class="userBankBox">
                            <span class="typeBox">银行账号&nbsp;:</span>
                            <input v-model="WX.cardNumber" type="text" class="userBankPerson">
                        </div>
                    </div>

                    <span slot="footer" class="dialog-footer dialogESC">
            <span class="typeBox"></span>
            <el-button class="saveButtonBank"  @click="saveUserPay()">保存</el-button>
            <el-button class="saveButtonCancel" @click="dialogVisible = false">取消</el-button>
          </span>
                </el-dialog>
            </div>
            <!--添加银行信息-->

            <!--银行开信息结束-->
            <!--手机号开始-->
            <div v-if="!already">
                <div class="phoneBox">
                    <span class="commonUseFont">手机号&nbsp;:&nbsp;&nbsp;&nbsp;</span>
                    <span class="phoneInput">
                {{iPhone}}
            </span>
                </div>
                <!--手机号结束-->

                <!--验证码开始-->
                <div>
                    <span class="commonUseFont">验证码&nbsp;:&nbsp;&nbsp;&nbsp;</span>
                    <!--<span class="verifyNum"> </span>-->

                    <input v-model="getVerify"  class="verifyNum" type="text">
                    <span @click="setTimeOuts()" :class="{'verify': verify == true}" class="getVerifyNum">{{time.time}}{{textVerify}}</span>
                </div>
                <!--验证码结束-->
                <button @click="withdrawDeposit" type="button" class="saveButton">
                    申请提现
                </button>
            </div>

            <!--提现成功提示框-->
            <div class="wrapSuccess">
                <el-dialog
                        :visible.sync="dialogVisible2"
                        :before-close="beforeClose"
                >
                    <img class="imgSuccess" src="../../../../images/center/TXSuccess.png" alt="">
                    <div class="textSuccess">
                        乾币提现申请成功&nbsp;!
                    </div>
                    <div class="textSuccessSecond">
                        钱款将在1-3个工作日到账
                    </div>
                </el-dialog>
                <!--提现成功提示框-->
            </div>
        </div>
        <!--结束-->
    </div>
</template>

<script>
	export default {
		data (){
			return{
				coinNum: {
					qbBalance: 0,
					aQb: 0,
					bQb: 0,
					cQb: 0,
					sum: 0
				},
				tCoinNum: {
					qbBalance: 0,
					aQb: 0,
					bQb: 0,
					cQb: 0,
					sum:0
				},
				sCoinNum: { //根据所选择的钱币类型,实际传的参数
					qbBalance: 0,
					aQb: 0,
					bQb: 0,
					cQb: 0,
				},
				yesShow: {
					qbBalance: true,
					aQb: false,
					bQb: false,
					cQb: false,
				},
				payWay: '支付宝',
				getVerify:'',
				WX: {
					accountHolder : '',
					cardNumber : '',
					oBank: ''
				},
				ZFB: {
					accountHolder : '',
					cardNumber : '',
					oBank: '非银行'
				},
				WXSecond: {
					accountHolder : '',
					cardNumber : '',
					oBank: ''
				},
				ZFBSecond: {
					accountHolder : '',
					cardNumber : '',
					oBank: '非银行'
				},
				iPhone: '',
				payWayShow: '',
				time: {
					close: 59,
					time: ''
				},
				options: [{
					value: '支付宝',
					label: '支付宝'
				}, {
					value: '银行卡',
					label: '银行卡'
				},],
				already: false, //判断是否已经提线
				verify: false,
				textVerify:'获取验证码',
				dialogVisible: false,  //银行添加信息开关
				dialogVisible2: false //提现成功提示框开关
			}
		},
		created (){
			this.getCoinData();
//			this.isGetCoined();
		},
		watch:{
			tCoinNum: {
				handler: function (val, old) {
					for(let prop in val)
					{
						if(!new RegExp(/^[1-9]([0-9]*)$|^[0-9]$/).test(val[prop]))
						{
							this.tCoinNum[prop] = ''
						}else
						{
							if(val[prop] > this.coinNum[prop])
							{
								this.tCoinNum[prop] = this.coinNum[prop];
							}
						}
					}
				},
				deep: true
			}
		},
		computed: {
			allNum (){
				let sum = 0;
				for(let prop in this.yesShow)
				{
					if(this.yesShow[prop])
					{
						sum += Number(this.tCoinNum[prop]);
					}
				}
				return sum;
			},
			qbBalance (){
				let price = Number(this.tCoinNum.qbBalance);
				return price.toFixed(2)
			},
			aQb (){
				let price = Number(this.tCoinNum.aQb) * 0.95;
				return price.toFixed(2)
			},
			bQb (){
				let price = Number(this.tCoinNum.bQb) * 0.9;
				return price.toFixed(2)
			},
			cQb (){
				let price = Number(this.tCoinNum.cQb) * 0.8;
				return price.toFixed(2)
			},
			allPrice (){
				let price = 0;
				for(let prop in this.yesShow)
				{
					if(this.yesShow[prop])
					{
						price += Number(this[prop]);
					}
				}
				return price.toFixed(2);
			}
		},
		methods: {
			//判断是否已经提现过
//			isGetCoined(){
//				this.global.axiosGetReq('/userWith/showUserQbNum', {}).then((res) => {
//
//				});
//			},
			//关闭弹窗的回调
			beforeClose (){
				this.getCoinData();
				this.dialogVisible2 = false;
			},
			//提现按钮
			withdrawDeposit (){
				for(let prop in this.yesShow)
				{
					this.sCoinNum[prop] = 0;
					if(this.yesShow[prop])
					{
						this.sCoinNum[prop] = this.tCoinNum[prop];
					}
				}
				if(this.allNum == 0)
				{
					this.$message.error('请填写提现乾币数量');
					return;
				}
				else if(this.payWayShow === '')
				{
					this.$message.error('请填写完整的提现信息');
					return;
				}else if(!this.verifyHasSpace(this.getVerify))
				{
					this.$message.error('请填写验证码');
				}else {
					//提现接口
					let obj = {};
					if(this.payWayShow === '支付宝')
					{
						obj = {
							aType: this.sCoinNum.cQb,
							bType: this.sCoinNum.bQb,
							cType: this.sCoinNum.aQb,
							giveType: this.sCoinNum.qbBalance,
							vCode : this.getVerify,
							witType: this.payWayShow,
							accountHolder:  this.ZFBSecond.accountHolder, //开户者
							cardNumber: this.ZFBSecond.cardNumber, //卡号
							oBank: this.ZFBSecond.oBank, //什么银行 //支付宝非银行
						};
					}else {
						obj = {
							aType: this.sCoinNum.cQb,
							bType: this.sCoinNum.bQb,
							cType: this.sCoinNum.aQb,
							giveType: this.sCoinNum.qbBalance,
							vCode : this.getVerify,
							witType: this.payWayShow,
							accountHolder:  this.WXSecond.accountHolder, //开户者
							cardNumber: this.WXSecond.cardNumber, //卡号
							oBank: this.WXSecond.oBank, //什么银行 //支付宝非银行
						};
					}
					console.log(obj);
//	                /userWith/submit
					this.global.axiosGetReq('/userWith/submit', obj).then((res) => {
						console.log(res);
						if(res.data.data === 1)
						{
							this.dialogVisible2 = true;
						}else if(res.data.msg === '验证码错误')
						{
							this.$message.error('验证码错误');
						}else {
							this.$message.error('提现申请失败');
						}
					});
				}
			},
			setTimeOuts (){
				if(this.time.close < 59)
				{
					return;
				}else {
					// /saleLog/getVerifyCode
					let obj = {
						phone : this.iPhone
					};
					this.global.axiosGetReq('/saleLog/getVerifyCode', obj).then((res) => {
						if(res.data.callStatus === "SUCCEED")
						{
							this.$message('获取验证码成功,请注意查收');
							this.textVerify = '秒后重新获取验证码';
							let that = this;
							that.verify = true;
							that.time.time = 59;
							that.time.close = 58;
							var timer = setInterval(function () {
								that.time.time -= 1;
								if(that.time.time == 0)
								{
									that.textVerify = '获取验证码';
									that.verify = false;
									that.time.close = 59;
									that.time.time = '';
									clearInterval(timer);
									return;
								}
							},1000);
						}else if(res.data.callStatus === 'FAILED')
						{
							this.$message.error('5分钟内,请不要重复获取验证码');
						}
					});
				}
			},
			openHasSpace (){
				this.$message.error('请填写完整的提现信息');
			},
			//保存银行或支付宝信息
			saveUserPay (){
				if(this.payWay === "支付宝")
				{
					if(this.hasSpace(this.ZFB))
					{
						this.ZFBSecond = Object.assign({},this.ZFB);
						this.payWayShow = "支付宝";
						this.dialogVisible = false;
					}else {
						//提示信息为空
						this.openHasSpace();
					}
				}else {
					//银行卡提现
					if(this.hasSpace(this.WX))
					{
						this.WXSecond = Object.assign({},this.WX);
						this.payWayShow = "银行卡";
						this.dialogVisible = false;
					}else {
						//提示信息为空
						this.openHasSpace();
					}
				}
			},
			hasSpace (obj){
				for(let prop in obj)
				{
					if(obj[prop].replace(/\s/g, "").length === 0)
					{
						return false;
					}else {
						return true;
					}
				}
			},
			verifyHasSpace(obj){
				if(obj.replace(/\s/g, "").length === 0)
				{
					return false;
				}else {
					return true;
				}
			},
			changeInputNum (type){
				if(this.tCoinNum[type] === '')
				{
					this.tCoinNum[type] = 0;
				}
			},
			selectCoinType (type){
				if(this.already)
				{
					return;
				}
				let num = 0;
				for(let prop in this.yesShow)
				{
					if(this.yesShow[prop] === true)
					{
						num++;
					}
				}
				if(num === 1)
				{
					if(this.yesShow[type] === true)
					{
						return;
					}
				}
				this.yesShow[type] = !this.yesShow[type];
			},
			getCoinData (){
				this.global.axiosGetReq('/userWith/showUserQbNum', {}).then((res) => {
					this.coinNum.qbBalance = res.data.data.qbBalance;
					this.coinNum.aQb = res.data.data.cQb;
					this.coinNum.bQb = res.data.data.bQb;
					this.coinNum.cQb = res.data.data.aQb;
					this.coinNum.sum = this.coinNum.cQb + this.coinNum.bQb + this.coinNum.aQb +  this.coinNum.qbBalance;
					if(res.data.msg === '1') //提过
					{
						this.already = true;
						this.global.axiosGetReq('/userWith/latelyWithRecord', {}).then((res) => {
							console.log(res.data.data,'哈哈哈');
							let qb = {};
							qb.aQb = Math.ceil(Number(res.data.data.cType) / 0.95);
							qb.bQb = Math.ceil(Number(res.data.data.bType) / 0.9);
							qb.cQb = Math.ceil(Number(res.data.data.aType) / 0.8);
							qb.qbBalance = Number(res.data.data.giveType);

							for(let prop in qb)
							{
								this.tCoinNum[prop] = qb[prop];
								if(qb[prop] == 0)
								{
									this.yesShow[prop] = false;
								}else {
									this.yesShow[prop] = true;
								}
							}
							this.payWayShow = res.data.data.witType;
							if(res.data.data.witType === '支付宝')
							{
								this.ZFBSecond.accountHolder = res.data.data.accountHolder;
								this.ZFBSecond.cardNumber = res.data.data.cardNumber;
								this.ZFBSecond.oBank = res.data.data.oBank;
							}else {
								this.WXSecond.accountHolder = res.data.data.accountHolder;
								this.WXSecond.cardNumber = res.data.data.cardNumber;
								this.WXSecond.oBank = res.data.data.oBank;
							}
						});
					}else { //没提过
						if (res.data.callStatus === 'SUCCEED') {
							console.log(res.data.data,"嘿嘿额黑");

							this.iPhone = res.data.data.phone;
							Object.assign(this.tCoinNum,this.coinNum);

							for(let item in this.tCoinNum)
							{
								if(item === 'sum')
								{
									continue;
								}
								if(this.tCoinNum[item] != 0)
								{
									this.yesShow[item] = true;
								}else {
									this.yesShow[item] = false;
								}
							}

						}
					}


				})
			},
		},
	}
</script>

<style>

    .wrapSuccess .el-dialog{
        width: 665px;
        text-align: center;
        top:36% !important;
    }
    .wrapSuccess .el-dialog__body{
        padding-top: 5px;
    }

    .dialogWrap .el-dialog__footer{
        text-align: left !important;
        padding-bottom: 34px;
    }
    .dialogWrap .el-dialog--tiny{
        width: 523px;
    }
    .selectedZF input{
        height: 38px;
        line-height: 38px;
        padding: 0 10px;
        border: 1px solid #cccccc;
        border-radius: 0;
    }
    .selectedZF .el-input__inner:focus{
        border-color: #cccccc;
    }
    .selectedZF .el-input__inner:hover{
        border-color: #cccccc;
    }


</style>
<style scoped >
    .txMsg.alreadyTx{
        border:none;
        background-color: #f4f4f4;

    }
    .colorRed{
        color: #ab0000;
    }
    .coinTxBoxText{
        position: absolute;
        top: 30px;
        left: 56px;
        font-size: 16px;
        color: #005aab;
        letter-spacing: 1px;
    }
    .coinTxBoxImg{
        width: 508px;
        height: 76px;

    }
    .coinTxBox{
        margin-bottom: -10px;
        position: relative;
    }
    .curous{
        cursor: default !important;
    }
    .warp {
        padding-left: 8px;
    }
    .wrapBack{
        padding-bottom: 55px;
        margin-top: 27px;
        padding-top: 20px;
        background-color: #f8f8f8;
    }
    .txCoinNum{
        display: inline-block;
        height: 37px;
        line-height: 37px;
        vertical-align: middle;
    }
    .imgSuccess{
        width: 40px;
        height: 40px;
    }
    .textSuccessSecond{
        font-size: 14px;
        margin-top: 12px;
        margin-bottom: 15px;
    }
    .textSuccess{
        margin-top: 22px;
        font-size: 18px;
        color: #005aab;
    }
    .verify{
        cursor: default !important;
        background-color: darkgrey !important;
    }
    .reviseButton2{
        float: right;
        width: 56px;
        text-align: center;
        cursor: pointer;
        color: #005aab;
    }
    .saveButtonCancel{
        margin-left: 56px;
        width: 120px;
        height: 39px;
        font-size: 16px;
        background-color: white;
        border-radius: 0;
        border: 1px solid #999999;
        color: #666666;
    }
    .saveButtonBank{
        width: 120px;
        height: 39px;
        color: white;
        font-size: 16px;
        background-color: #005aab;
        border-radius: 0;
        border: 0;
    }

    .userBankBox{
        margin-top: 30px;
    }
    .userBankPerson{
        box-sizing: border-box;
        vertical-align: middle;
        border: 1px solid #cccccc;
        padding-left: 10px;
        outline: none;
        height: 38px;
        width: 300px;
    }
    .typeBox{
        display: inline-block;
        width: 84px;
        margin-left: 30px;
        text-align: right;
        margin-right: 14px;
    }
    .selectedZF{
        width: 300px;
    }
    .addUserButton{
        line-height: 16px;
        text-align: center;
        display: inline-block;
        width: 16px;
        height: 16px;
        background-color: #005aab;
        border-radius: 50%;
        color: white;
        font-weight: bold;
    }
    .addTXUser{
        cursor: pointer;
        display: inline-block;
        font-size: 14px;
    }
    .commonUseFont{
        font-size: 14px;
    }
    .coinImgSmall{
        width: 40px;
        height: 40px;
        vertical-align: middle;
        margin-left: 18px;
    }
    .coinImgBig{
        width: 44px;
        height: 44px;
        vertical-align: middle;
    }
    .saveButton{
        border: none;
        height: 42px;
        line-height: 42px;
        width: 352px;
        background-color: #005aab;
        color: #ffffff;
        border-radius: 6px;
        margin-top: 28px;
        margin-left:67px;
        cursor: pointer;
    }
    .getVerifyNum{
        display: inline-block;
        color: #ffffff;
        font-size: 14px;
        background-color: #005aab;
        height: 38px;
        line-height: 38px;
        text-align: center;
        padding: 0 15px;
        vertical-align: middle;
        cursor: pointer;
        margin-left: -6px;
    }
    .verifyNum{
        outline: none;
        width: 198px;
        height: 36px;
        line-height: 36px;
        border: 1px solid #cccccc;
        vertical-align: middle;
        padding-left: 10px;
        font-size: 14px;
    }
    .phoneInput{
        letter-spacing: 1px;
        display: inline-block;
        width: 300px;
        height: 36px;
        line-height: 36px;
        border: 1px solid #cccccc;
        vertical-align: middle;
        background-color: #f8f8f8;
        padding-left: 10px;
        font-size: 14px;
        color: #666666;
    }
    .phoneBox{
        margin-bottom: 16px;
        margin-top: 18px;
    }
    .reviseButton{
        width: 56px;
        text-align: center;
        cursor: pointer;
        color: #005aab;
        float: right;
    }
    .accountNumberBank{

    }
    .userBank{
        margin-right: 35px;
    }
    .khBank{
        margin-right: 35px;
    }
    .typeBank{
        margin-right: 35px;
    }
    .txMsg span{
        display: inline-block;
    }
    .txMsg{
        font-size: 14px;
        padding-left: 10px;
        display: inline-block;
        height: 36px;
        line-height: 36px;
        border: 1px solid #cccccc;
        width: 950px;
    }
    .allPriceRmb{
        margin-bottom: 18px;
        font-size: 14px;
    }
    .colorBluePrice{
        font-size: 18px;
        color: #005aab;
        vertical-align: middle;
    }
    .allPrice{
        font-size: 14px;
        margin-top: 32px;
        margin-bottom: 31px;
    }
    .coinSecondUl{
        margin-top: 17px;
    }
    .coinSecondUl::after{
        content: '';
        display: block;
        clear: both;
    }
    .liImgNo{
        position: absolute;
        right: -1px;
        top:-1px;
    }
    .threeDivSpan{
        margin-left: 15px;

    }
    .fontSizeSecondSpan{
        color: #005aab;
        font-size: 14px;
    }
    .secondUlSecondDiv{
        color: #666666;
        font-size: 14px;
        margin-bottom: 10px;
        margin-top: 9px;
    }
    .fontSizeFirstSpan{
        margin-left: 16px;
        font-size: 16px;
    }
    .secondUlFirstDiv{
        margin-top: 12px;
        margin-bottom: 12px;
    }
    .coinInput{
        outline-color: #005aab;
        vertical-align: middle;
        border: 1px solid #cccccc;
        padding: 9px 0 9px 9px;
        width: 112px;
    }

    .coinSecondUl li{
        cursor: pointer;
        position: relative;
        float: left;
        border: 1px solid #dddddd;
        width: 221px;
        padding-left: 12px;
    }
    .coinSecondUl li:nth-child(n+2){
        margin-left: 20px;
    }
    .selectText {
        font-size: 14px;
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 9px;
        margin-top: 30px;
    }
    .borderRight {
        height: 34px;
        border-right: 1px solid #d0ad61;
        float: right;
        margin-top: 19px;
    }
    .fontColor {
        color: #005aab;
        font-size: 24px;
        vertical-align: middle;
        margin-left: 7px;
    }
    .payCoinColor {
        display: inline-block;
        text-align: center;
        font-size: 21px;
        color: #005aab;
        height: 39px;
        width: 39px;
        border-radius: 50%;
        line-height: 39px;
        background-color: white;
        border: 2px solid #d0ad61;
        vertical-align: middle;
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
    .topBox {
        height: 70px;
        line-height: 70px;
        margin-top: 30px;
    }
</style>


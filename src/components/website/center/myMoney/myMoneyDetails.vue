<template>
  <div class="myMoneyList">
    <div class="tab_box">
      <div class="tab_item" :class="{spe: isActive1}" @click="changeActive1(tab01Text);">乾币充值</div>
      <div class="tab_item" :class="{spe: isActive3}" @click="changeActive3(tab03Text);">乾币兑换</div>
      <div class="tab_item" :class="{spe: isActive4}" @click="changeActive4(tab04Text);">乾币提现</div>
      <div class="tab_item" :class="{spe: isActive2}" @click="changeActive2(tab02Text);">乾币明细</div>
      <!--<span class="currentMoneyWrap">当前乾币：{{currentMoney}}</span>-->
    </div>
    <!-- 点击导航后要切换的内容 -->
    <transition name="component-fade" mode="out-in">
        <keep-alive>
      <component v-on:msgFromChild="msgtoparent" :is="currentView" keep-alive></component>
        </keep-alive>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import myMoneyAdd from './moneyAdd'
  import myMoney from './myMoney'
  import moneyExchange from './moneyExchange'
  import moneyCoinCash from './moneyCoinCash'
  import util from '../../../../common/util'
  import Bus from '../../../global/bus.js'
  var tab03 = Vue.extend({
    template: '<div>this is 待评价03</div>',
  });
  export default {
    name: 'myMoneyList',
    data () {
      return {
        getMoneyList:[],
        currentMoney: 0,
        isActive1: true,
        isActive2: false,
        isActive3: false,
        isActive4: false,
        tab01Text: "tab01",
        tab02Text: "tab02",
        tab03Text: "tab03",
        tab04Text: "tab04",
        currentView: 'tab01', //默认选中的导航栏
      }
    },
    components: {
      tab01: myMoneyAdd,
      tab02: myMoney,
      tab03: moneyExchange,
      tab04: moneyCoinCash
    },
    created:function(){
      var that = this
      that.getMoneyListFn();
      Bus.$on('getTarget', target => {
        if (target == 'succeedChange') {
          that.getMoneyListFn()
        } 
      });  
    },
    methods: {
      msgtoparent:function(data){
        this.getMoneyListFn();
      },
      changeActive1: function(tabText) {
        this.currentView = tabText;
        this.isActive1 = true;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
      },
      changeActive2: function(tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = true;
        this.isActive3 = false;
        this.isActive4 = false;
      },
      changeActive3: function(tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = true;
        this.isActive4 = false;
      },
      changeActive4: function(tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = true;
      },
      getMoneyListFn:function(){
        var that = this;
        var obj = {
          token:that.global.getToken()
        };
        that.global.axiosGetReq('/userMyQb/query', obj)
        .then((res) => {
          // console.log(res)
          if (res.data.callStatus === 'SUCCEED') {
            if(res.data.data.length>0){
              that.currentMoney = res.data.data[0].user.qbBalance;
            }
          } else {
            // that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.currentMoneyWrap{
  position: absolute;
    right: 0;
    top: 10px;
    color: #005aab;
    font-size: 14px;
}
/*-------animation start------*/
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-active {
  opacity: 0;
}
.spe {
  background-color: #005aab;
  color: #fff !important;
}
.myOrder {
  width: 100%;
  height: 100%;
/*  background-color: #A08F65;*/
}
.tab_box {
  width: 1069px;
  height: 40px;
  border-bottom: 1px solid #e9e9e9;
  position: relative;
}
.tab_item {
  width: 139px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #000;
  float: left;
}
.tab_item:hover {
  cursor: pointer;
  background-color: #005aab;
  transition: all ease 0.5s;
  color: #fff;
}
</style>

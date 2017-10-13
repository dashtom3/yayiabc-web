<template>
  <div class="backToTop">
    <div v-show="top" class="top_box" @click="backToTop" @mouseover="img_in" @mouseout="img_out">
<!--        <p class="top_title">置顶</p> -->
      <img v-if="hoverTop" src="../../../images/index/top2.png" alt="img"/>
      <img v-else src="../../../images/index/top2_hover.png" alt="img"/>
    </div>
    <div v-show="contact" class="contact_box" @click="question" @mouseover="img_in2" @mouseout="img_out2">
<!--        <p class="contact_title">意见反馈</p> -->
      <img v-if="hoverTop2" src="../../../images/index/contact.png" alt="img"/>
      <img v-else src="../../../images/index/contact_h.png" alt="img"/>
    </div>
    <div v-show="contact" class="qq_box" @click="qq_contact" @mouseover="img_in3" @mouseout="img_out3">
<!--        <p class="contact_title">意见反馈</p> -->
      <img v-if="hoverTop3" src="../../../images/index/qq.png" alt="img"/>
      <img v-else src="../../../images/index/qq_hover.png" alt="img"/>
    </div>
<!--     <div class="qq_box">
      <a href="http://wpa.qq.com/msgrd?v=3&uin=2966679536&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:2966679536:52" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>
    </div> -->
    <div class="app_box" @mouseover="img_in4" @mouseout="img_out4">
      <img v-if="hoverTop4" src="../../../images/index/app.png" alt="img"/>
      <img v-else src="../../../images/index/app_hover.png" alt="img"/>
      <img class="qr_hover" v-show="!hoverTop4" src="../../../images/index/qr_app.png" alt="img"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'backToTop',
    data () {
      return {
        hoverTop: true,
        hoverTop2: true,
        hoverTop3: true,
        hoverTop4: true,
        top: true,
        contact: true,
      }
    },
    created: function() {
      var that = this;
      window.addEventListener('scroll', that.menu);
    },
    methods: {
      //意见反馈
      question: function() {
        var that = this;
        window.open('http://cn.mikecrm.com/BvO3hVU');
      },
      qq_contact: function() {
        var that = this;
        window.open('http://wpa.qq.com/msgrd?v=3&uin=2966679536&site=qq&menu=yes');
      },
      //回到顶部
      backToTop: function() {
        var that = this;
        var timer = null;
        var isTop = true;
        // 滚动条滚动时出发
        window.onscroll = function() {
          if (!isTop) {
            clearInterval(timer);
          }
          isTop = false;
        }
        timer = setInterval(function(){
          var osTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          var ispeed = Math.floor(-osTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = osTop + ispeed;
          // document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          isTop = true;
          if (osTop == 0) {
            clearInterval(timer);
          }
        },30);
      },
      menu: function() {
        var that = this;
        var scroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if(scroll >= 270) {
          that.top = true;
          that.contact = true;
        } else {
          that.top = true;
          that.contact = true;
        }
      },
      img_in() {
        var that = this;
        that.hoverTop = false;
      },
      img_out() {
        var that = this;
        that.hoverTop = true;
      },
      img_in2() {
        var that = this;
        that.hoverTop2 = false;
      },
      img_out2() {
        var that = this;
        that.hoverTop2 = true;
      },
      img_in3() {
        var that = this;
        that.hoverTop3 = false;
      },
      img_out3() {
        var that = this;
        that.hoverTop3 = true;
      },
      img_in4() {
        var that = this;
        that.hoverTop4 = false;
      },
      img_out4() {
        var that = this;
        that.hoverTop4 = true;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top_box {
    width: 64px;
    height: 86px;
    padding: 5px;
    font-size: 14px;
    position: fixed;
    bottom: 170px;
    right:0px;
    z-index: 999;
    text-align: center;
  }
  .top_box:hover {
    cursor: pointer;
  }
  .top_title {
    margin-bottom: 8px;
  }
  .contact_box {
    width: 64px;
    height: 46px;
    padding: 5px;
    font-size: 14px;
    position: fixed;
    bottom: 150px;
    right: 0px;
    z-index: 999;
    text-align: center;
  }
  .contact_box:hover {
    opacity: 1;
    cursor: pointer;
  }
  .contact_title {
    margin-bottom: 8px;
  }
  .qq_box {
    width: 64px;
    height: 46px;
    padding: 5px;
    font-size: 14px;
    position: fixed;
    bottom: 90px;
    right:0px;
    z-index: 999;
    text-align: center;
  }
  .qq_box:hover {
    opacity: 1;
    cursor: pointer;
  }
  .app_box {
    width: 64px;
    height: 46px;
    padding: 5px;
    font-size: 14px;
    position: fixed;
    bottom: 30px;
    right:0px;
    z-index: 999;
    text-align: center;
  }
  .app_box:hover {
    opacity: 1;
    cursor: pointer;
  }
  .qr_hover{
    position: fixed;
    right: 78px;
    bottom: 34px;
  }
</style>

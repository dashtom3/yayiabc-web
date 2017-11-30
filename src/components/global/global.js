import axios from 'axios'
import router from '../../router'

export default {
  //6181：测试服务器
  baseUrl: 'http://47.93.48.111:6181/api',
  // baseUrl: 'http://localhost:8080/api',
  //8080正式服务器
  // baseUrl: 'http://47.93.48.111:8080/api',
  // baseUrl: 'http://123.56.220.72:8089/api',
  qiNiuUrl: 'http://upload-z2.qiniu.com/',
  qiniuShUrl: 'http://orl5769dk.bkt.clouddn.com/',

  extendCopy(p) {
    var c = {};
    for (var i in p) {
      c[i] = p[i];
    }
    return c;
  },
  copyArr(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
      res.push(arr[i])
    }
    return res
  },
  postHttpData(data) {
    var formData = new FormData()
    for (let i in data) {
      if (data[i] != null) {
        formData.append(i, data[i])
      }
    }
    return formData
  },
  getHttpData(data) {
    var formData = ''
    for (let i in data) {
      if (data[i] != null) {
        formData = formData + '&' + i + '=' + data[i]
      }
    }
    return formData
  },
  setToken(token) {
    localStorage.setItem('adverToken', token)
  },
  setSalesToken(token) {
    localStorage.setItem('salesToken', token)
  },
  // yayiAbcToken
  removeMsg() {
    localStorage.removeItem('adverToken')
    localStorage.removeItem('adverUser')
  },
  getToken() {
    //console.log(localStorage.getItem('adverToken'))
    //console.log(JSON.parse(localStorage.getItem('adverUser')))
    return localStorage.getItem('adverToken')
  },
  setUser(data) {
    localStorage.setItem('adverUser', JSON.stringify(data))
  },
  getUser() {
    return JSON.parse(localStorage.getItem('adverUser'))
  },
  // 创客系统token
  getSalesToken() {
    return localStorage.getItem('salesToken')
  },
  removeSalesMsg() {
    localStorage.removeItem('salesToken')
    localStorage.removeItem('salesUser')
  },
  setSalesUser(data) {
    localStorage.setItem('salesUser', JSON.stringify(data))
  },
  getSalesUser() {
    return JSON.parse(localStorage.getItem('salesUser'))
  },
  // 后台系统token
  getAdminToken() {
    return localStorage.getItem('adminToken')
  },
  removeAdminMsg() {
    localStorage.removeItem('adminToken')
  },
  setAdminToken(data) {
    localStorage.setItem('adminToken', data)
  },
  // 历史记录存储
  getHistory() {
    return localStorage.getItem('userHistory')
  },
  setHistory(data) {
    localStorage.setItem('userHistory', JSON.stringify(data))
  },
  removeHistory() {
    localStorage.removeItem('userHistory')
  },
  axiosPostReq(url, data) {
    return new Promise((resolve, reject) => {
      var formData = new FormData()
      for (let i in data) {
        if (data[i] != null) {
          formData.append(i, data[i])
        }
      }
      var myurl = window.location.href;
      var adminFlag = myurl.indexOf("admin") != -1;
      if (adminFlag) {
        axios.defaults.headers['adminToken'] = this.getAdminToken()  // 后台token
      }
      var salesFlag = myurl.indexOf("salesIndex") != -1;
      var salesLogin = myurl.indexOf("salesLog") != -1;
      if (salesFlag || salesLogin) {
        axios.defaults.headers['saleToken'] = this.getSalesToken()   // 创客token
      }
      if (!adminFlag && !salesFlag && !salesLogin) {
        axios.defaults.headers['token'] = this.getToken()  // 电商token
      }
      axios.post(this.baseUrl + url, formData)
        .then((res) => {
          if (res.data.errorCode === 'RE_LOGIN' || res.data.errorCode === 'RE_LOGIN_SALE') {
            Promise.reject("登录过期，请重新登录！").then(function (reason) {
              // 未被调用
            }, function (reason) {
              if (salesFlag || salesLogin) {
                router.push({name: 'salesLog', params: {data: 'RE_LOGIN'}})
                return false
              }
              router.push({name: 'index', params: {data: 'RE_LOGIN'}})
              console.log(reason);
              return false
            });
          }
          if (res.data.errorCode === 'RE_LOGIN_ADMIN') {
            Promise.reject("登录过期，请重新登录！").then(function (reason) {
              // 未被调用
            }, function (reason) {
              router.push({path: '/admin/login'})
              return false
            });
          }
          if (res.data.callStatus === 'SUCCEED') {
            resolve(res);
          } else {
            resolve(res);
          }
        }).catch(() => {
        reject('网络请求错误');
      });
    });
  },
  axiosGetReq(url, data) {
    return new Promise((resolve, reject) => {
      var formData = ''
      for (let i in data) {
        if (data[i] != null) {
          formData = formData + '&' + i + '=' + data[i]
        }
      }
      var myurl = window.location.href;
      var adminFlag = myurl.indexOf("admin") != -1;
      if (adminFlag) {
        axios.defaults.headers['adminToken'] = this.getAdminToken()  // 后台token
      }
      var salesFlag = myurl.indexOf("salesIndex") != -1;
      var salesLogin = myurl.indexOf("salesLog") != -1;
      if (salesFlag || salesLogin) {
        axios.defaults.headers['saleToken'] = this.getSalesToken()   // 创客token
      }
      if (!adminFlag && !salesFlag && !salesLogin) {
        axios.defaults.headers['token'] = this.getToken()  // 电商token
      }
      axios.get(this.baseUrl + url, {params: data})
        .then((res) => {
          if (res.data.errorCode === 'RE_LOGIN' || res.data.errorCode === 'RE_LOGIN_SALE') {
            Promise.reject("登录过期，请重新登录！").then(function (reason) {
              // 未被调用
            }, function (reason) {
              if (salesFlag || salesLogin) {
                router.push({name: 'salesLog', params: {data: 'RE_LOGIN'}})
                return false
              }
              router.push({name: 'index', params: {data: 'RE_LOGIN'}})
              console.log(reason);
              return false
            });
          }
          if (res.data.errorCode === 'RE_LOGIN_ADMIN') {
            Promise.reject("登录过期，请重新登录！").then(function (reason) {
              // 未被调用
            }, function (reason) {
              router.push({path: '/admin/login'})
              return false
            });
          }
          if (res.data.callStatus === 'SUCCEED') {
            // this.$message.error('错了哦，这是一条错误消息');
            resolve(res);
          } else {
            resolve(res);
          }
        }).catch(() => {
        // this.$message.error('错了哦，这是一条错误消息');
        reject('网络请求错误');
      });
    });
  },
  axiosGetQiNiuReq(url, getParamsObj) {
    return axios.get(this.qiniuShUrl + url, {params: getParamsObj})
  },
  getQiNiuToken() {
    return this.axiosGetQiNiuReq('qiniu/getQiNiuToken')
  },
  // 随机生成UUID
  uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 32; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    // s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  },
  //买商品给钱币规则
  // 道邦
  // 该商品购买金额<300,赠送钱币数量=档次购买金额*3%
  // 300<=该商品购买金额<600,赠送钱币数量=档次购买金额*5%
  // 600<=该商品购买金额<1200,赠送钱币数量=档次购买金额*8%
  // 1200<=该商品购买金额<2500,赠送钱币数量=档次购买金额*12%
  // 该商品购买金额>=2500,赠送钱币数量=档次购买金额*15%
  // 其他品牌
  // 耗材类
  // 该商品购买金额<500,赠送钱币数量=档次购买金额*3%
  // 500<=该商品购买金额<1000,赠送钱币数量=档次购买金额*5%
  // 1000<=该商品购买金额<3000,赠送钱币数量=档次购买金额*8%
  // 该商品购买金额>=3000,赠送钱币数量=档次购买金额*12%
  // 工具设备类
  // 该商品1件，赠送钱币数量=档次购买金额*5%
  // 该商品>=2件，赠送钱币数量=档次购买金额*10%
  goodToMoney: function (goodList) {
    var daoBangArr = [], haoCaiArr = [], gongJuSheBeiArr = [];
    var daoBangMoney = 0, haoCaiMoney = 0, gongJuSheBeiMoney = 0;
    var daoBangRata, haoCaiRata, gongJuSheBeiRata;
    var daoBangMoneyToMoney = 0, haoCaiMoneyToMoney = 0, gongJuSheBeiMoneyToMoney = 0;
    for (let i in goodList) {
      if (goodList[i].goodBrandName == "上海道邦") {
        daoBangArr.push(goodList[i]);
      } else if (goodList[i].goodSort == "耗材类") {
        haoCaiArr.push(goodList[i]);
      } else if (goodList[i].goodSort == "工具设备类") {
        gongJuSheBeiArr.push(goodList[i]);
      }
    }

    // 道邦
    for (let a in daoBangArr) {
      daoBangMoney += daoBangArr[a].price * 100 * daoBangArr[a].num / 100
    }
    if (daoBangMoney < 300) {
      daoBangRata = 3;
    } else if (300 <= daoBangMoney && daoBangMoney < 600) {
      daoBangRata = 5;
    } else if (600 <= daoBangMoney && daoBangMoney < 1200) {
      daoBangRata = 8;
    } else if (1200 <= daoBangMoney && daoBangMoney < 2500) {
      daoBangRata = 12;
    } else if (2500 <= daoBangMoney) {
      daoBangRata = 15;
    } else {
      daoBangRata = 0;
    }
    daoBangMoneyToMoney = daoBangMoney * daoBangRata / 100;
    // console.log(daoBangMoneyToMoney,daoBangMoney,daoBangRata,"111111")

    // 耗材
    for (let b in haoCaiArr) {
      haoCaiMoney += haoCaiArr[b].price * 100 * haoCaiArr[b].num / 100
    }
    if (haoCaiMoney < 500) {
      haoCaiRata = 3;
    } else if (500 <= haoCaiMoney && haoCaiMoney < 1000) {
      haoCaiRata = 5;
    } else if (1000 <= haoCaiMoney && haoCaiMoney < 3000) {
      haoCaiRata = 8;
    } else if (3000 <= haoCaiMoney) {
      haoCaiRata = 12;
    } else {
      haoCaiRata = 0;
    }
    haoCaiMoneyToMoney = haoCaiMoney * haoCaiRata / 100;
    // console.log(haoCaiMoneyToMoney,haoCaiMoney,haoCaiRata,"22222222222222")


    var gongJuSheBeiAllNum = 0;
    for (let c in gongJuSheBeiArr) {
      gongJuSheBeiMoney += gongJuSheBeiArr[c].price * 100 * gongJuSheBeiArr[c].num / 100;
      gongJuSheBeiAllNum += gongJuSheBeiArr[c].num;
    }
    if (gongJuSheBeiAllNum == 1) {
      gongJuSheBeiRata = 5;
    } else if (gongJuSheBeiAllNum >= 2) {
      gongJuSheBeiRata = 10;
    } else {
      gongJuSheBeiRata = 0;
    }
    gongJuSheBeiMoneyToMoney = gongJuSheBeiMoney * gongJuSheBeiRata / 100;
    // console.log(gongJuSheBeiMoneyToMoney,gongJuSheBeiMoney,gongJuSheBeiRata,"333")
    var finalyMoney = 0;
    finalyMoney = gongJuSheBeiMoneyToMoney + haoCaiMoneyToMoney + daoBangMoneyToMoney;
    // console.log(finalyMoney,"finalyMoney");
    return Math.round(finalyMoney);
  },
  // RMB兑换钱币规则
  moneyToMoney: function (money) {
    // money--需要兑换的人民币数量
    // 钱币兑换比率
    // (1) 1000元<=单次购买金额<2000元，兑换钱币数量=当次实际兑换金额*110%；
    // (2) 2000元<=单次购买金额<5000元，兑换钱币数量=当次实际兑换金额*115%；
    // (3) 5000元<=单次购买金额<10000元，兑换钱币数量=当次实际兑换金额*120%；
    // (4) 单次购买金额>10000元，兑换钱币数量=当次实际兑换金额*125%；
    if (money) {
      var finalyMoney;
      var rate;
      if (money < 1000) {
        rate = 100;
      } else if (1000 <= money && money < 2000) {
        rate = 110;
      } else if (2000 <= money && money < 5000) {
        rate = 115;
      } else if (5000 <= money && money < 10000) {
        rate = 120;
      } else if (10000 <= money) {
        rate = 125;
      }
      finalyMoney = money * rate / 100;
      return Math.round(finalyMoney);
    }
  },
}

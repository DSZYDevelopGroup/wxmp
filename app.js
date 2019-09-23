App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: res => {
        this.globalData.systemInfo = res
        this.globalData.windowHeight = res.windowHeight / (res.windowWidth / 750)
        this.globalData.screenHeight = res.screenHeight / (res.screenWidth / 750)
      }
    })
    let that = this;
    that.doLogin();
    // that.isBind();
  },
  doLogin: function (callback = () => { }){
    let that = this;
    wx.login({
      success: function (res) {
        // console.log(res)
        //发送请求
        wx.request({
          url: 'https://jymanager.appchizi.com/icbc/login.php', //接口地址
          data: { code: res.code },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            // console.log(res);
            callback();
            wx.setStorageSync('loginFlag', res.data.skey);
            // that.globalData.openId = res.data.openid;
            // wx.setStorageSync("openId", res.data.openid);
            
          }
        })
      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 获取用户登录标示 供全局调用
  getLoginFlag: function () {
    return wx.getStorageSync('loginFlag');
  },

  // isBind: function (callback = () => { }) {
  //   //code=0：未绑定，code=1：已绑定
  //   let that = this;
  //   wx.request({
  //     url: 'https://jymanager.appchizi.com/icbc/isBind.php',
  //     data: {
  //       skey: that.getLoginFlag()
  //     },
  //     success: function (res) {
  //       console.log(res)
  //       callback();
  //       wx.setStorageSync('bindCode', res.data.msg_code);
  //     },
  //   })
  // },
  // getBindCode: function () {
  //   return wx.getStorageSync('bindCode');
  // },
  globalData: {
    userInfo: null,
    openId: '',
    merName:'',
    systemInfo: null,
    windowHeight: null, // rpx换算px后的窗口高度
    screenHeight: null, // rpx换算px后的屏幕高度
  },
}, 
)
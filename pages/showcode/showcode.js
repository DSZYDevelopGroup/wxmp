// pages/showcode/showcode.js
const app = getApp();
Page({
inputs: function (e) {
      var value = e.detail.value;
      let that = this;
      if (value.split('.')[0].length > 8) {
        if (value.split('.')[1]) {
          value = value.split('.')[0].substr(0, value.split('.')[0].length - 1) + '.' + value.split('.')[1];
        } else {
          value = value.split('.')[0].substr(0, value.split('.')[0].length - 1);
        }
      }
      value = value.replace(/[^\d\.]/g, ""); //清除"数字"和"."以外的字符
      value = value.replace(/^\./g, ""); //验证第一个字符是数字
      value = value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
      value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
      this.setData({
        price: value,
        isShow: true
      })
      if (value == '') {
        that.setData({
          isShow: false
        })
      }
    },
  formSubmit: function (e) {
    var amt = e.detail.value.amt;
    var type = e.detail.target.dataset.type;
    let that = this;
    if(amt==''||amt==0){
      wx.showToast({
        title: '请输入正确金额',
        image:'../../icons/caution.png',
        duration: 1500,
        mask: true,
      })
    }
    //扫描二维码
    else if(type=='scan'){
      wx.scanCode({
        onlyFromCamera: false,
        scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'],
        success: function (res) {
          wx.request({
            url: 'https://jymanager.appchizi.com/example/QrcodePayTest.php',
            data: {
              amt: e.detail.value.amt,
              qrcode:res.result,
              skey: app.getLoginFlag()
                   },
            method: 'GET',
            success: function(res) {
              console.log(res)
              var time = res.data.out_trade_no.substring(0, 14)
              if (res.data.pay_status == 1){
             wx.navigateTo({
               url: '../result/result?order_id=' + res.data.order_id + '&order_time=' + time + '&total_amt=' + res.data.total_amt,
                })
              }else{
                wx.navigateTo({
                  url: '../failure/failure',
                })
              }
            }
          })
        },
      })
    }
    //生成二维码
    else{
    wx.request({
      url: 'https://jymanager.appchizi.com/example/QrcodeGenerateTest.php',
      data: { amt: e.detail.value.amt,
             skey: app.getLoginFlag()
             },
      method: 'GET',
      success: function(res) {
        console.log(res)
        /// 获取到base64Data
        var base64Data = res.data.qrcode;
        /// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
        base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
        /// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
        const base64ImgUrl = "data:image/png;base64," + base64Data;
        ///刷新数据
        that.setData({
          base64ImgUrl: base64ImgUrl
        })
      }
    })
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    screenHeight: 0,
    base64ImgUrl: '',
    isShow : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowHeight: app.globalData.windowHeight,
      screenHeight: app.globalData.screenHeight,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
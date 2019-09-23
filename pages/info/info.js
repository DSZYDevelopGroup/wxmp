var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    screenHeight: 0,
    info:[],
    store_name:'',
    pay_status:'',
    isDisabled:false
  },

  reject:function(e){
    var order_id = this.data.info.order_id;
    wx.showModal({
      title: '提示',
      content: '请确认是否退款',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '确认',
      confirmColor: '#FF0000',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://jymanager.appchizi.com/example/QrcodeRejectTest.php',
            data: {
              skey: app.getLoginFlag(),
              order_id: order_id
            },
            success: function (res) {
              console.log(res)
              wx.navigateTo({
                url: '../rejectresult/rejectresult?order_id=' + order_id + '&reject_no=' + res.data.reject_no + '&reject_amt=' + res.data.reject_amt + '&reject_time=' + res.data.reject_time,
              })
            },
          })
        }
      },
    })
  },
  getMerName:function(e){
    let that = this;
    wx.request({
      url: 'https://jymanager.appchizi.com/icbc/getStoreName.php',
      data: {
        skey: app.getLoginFlag()
      },
      success: function (res) {
        that.setData({
          store_name: res.data.store_name
        })
      },
    })
  },
  setPayStatus:function(e){
    if (this.data.info.pay_flag == 1) {
      this.setData({
        pay_status: '支付成功'
      })
    }
    else if (this.data.info.pay_flag == 2) {
      this.setData({
        pay_status: '已退款',
        isDisabled: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    var info = JSON.parse(opt.info);
    this.setData({
      windowHeight: app.globalData.windowHeight,
      screenHeight: app.globalData.screenHeight,
      info:info
    })
    this.getMerName();//获取商户名称
    this.setPayStatus();//获取支付状态
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
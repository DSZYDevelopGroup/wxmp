var util = require('../../utils/util.js');
const app = getApp();
Page({
  backToIndex:function(e){
    wx.switchTab({
      url: '../index/index'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    screenHeight: 0,
    order_id:'',
    order_amt:'',
    order_time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    var order_id = opt.order_id;
    var order_amt = '￥'+(opt.total_amt/100).toFixed(2);
    var order_time = util.formatMyTime(opt.order_time);
    this.setData({
      windowHeight: app.globalData.windowHeight,
      screenHeight: app.globalData.screenHeight,
      order_id:order_id,
      order_time:order_time,
      order_amt:order_amt
    })
    wx.vibrateLong({
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
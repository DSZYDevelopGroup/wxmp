var util = require('../../utils/util.js');
const app = getApp();
var timestamp = Date.parse(new Date())-7*24*60*60*1000;
var DATE_7daysBefore = util.formatDate(new Date(timestamp));
var DATE = util.formatDate(new Date());
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    screenHeight: 0,
    dateS:DATE_7daysBefore,
    dateE:DATE,
    detailsList:[]
  },
  /**
   * 自定义方法
   */
  bindDateChange: function (e) {
    let that = this;
    var name = e.target.dataset.name;
    if(name =='startDate'){
      console.log('点击的是', name, '，', 'picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        dateS: e.detail.value
      })
    }
    else{
      if (e.detail.value < this.data.dateS) {
        wx.showToast({
          title: '请输入正确日期',
          image: '../../icons/caution.png',
          duration: 1500,
          mask: true,
          success: function (res) {
            console.log(DATE)
            that.setData({
              dateE: DATE
            })
          },
        })
      }
      else {
        console.log('点击的是', name, '，', 'picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          dateE: e.detail.value
        })
      }
    }
  },

  getDetails: function (e) {
    let that = this;
    wx.request({
      url: 'https://jymanager.appchizi.com/icbc/details.php',
      data: {
        skey: app.getLoginFlag(),
        startDate: that.data.dateS,
        endDate: that.data.dateE
      },
      success: function (res) {
        var i = 0;
        var l = res.data.length;
        for (i; i < l; i++) {
          var order_time =util.formatMyTime(res.data[i].out_trade_no);
          res.data[i]['order_time'] = order_time;
        }
        that.setData({
          detailsList: res.data
        })
      },
    })
  },

  toInfo:function(e){
    var info = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../info/info?info=' + JSON.stringify(info),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowHeight: app.globalData.windowHeight,
      screenHeight: app.globalData.screenHeight
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
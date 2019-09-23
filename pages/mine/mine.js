// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    screenHeight: 0,
    mer_id:'',
    store_code:'',
    store_name:'',
    msg_code:0
  },
  formSubmit: function (e) {
    var mer_id = e.detail.value.mer_id;
    if(mer_id==''||mer_id.length!=12){
      wx.showToast({
        title: '请输入正确编码',
        duration: 1500,
        image: '../../icons/caution.png',
        mask: true,
      })
    }
    else{
      wx.request({
        url: 'https://jymanager.appchizi.com/icbc/bind.php',
        data: {
          mer_id: mer_id,
          skey: app.getLoginFlag()
        },
        success: function (res) {
          //msg 0:已有其他用户绑定 1:未绑定 2:输入的merid不存在
          var msg = res.data.msg;
          if (msg == 0) {
            wx.showModal({
              title: '提示',
              content: '该编号已有其他用户绑定',
              showCancel: false,
              confirmText: '确定',
              confirmColor: '#FF0000',
              success: function (res) {
                wx.reLaunch({
                  url: 'mine',
                })
              },
            })
          }
          else if (msg == 1) {
            wx.showModal({
              title: '提示',
              content: '绑定成功',
              showCancel: false,
              confirmText: '确定',
              confirmColor: '#FF0000',
              success: function (res) {
                wx.reLaunch({
                  url: 'mine',
                })
              },
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '输入的商户编码有误',
              showCancel: false,
              confirmText: '确定',
              confirmColor: '#FF0000',
              success: function (res) {
                wx.reLaunch({
                  url: 'mine',
                })
              },
            })
          }
        },
      })
    }

  },
  isBind:function(e){
    let that = this;
    wx.request({
      url: 'https://jymanager.appchizi.com/icbc/isBind.php',
      data: {
        skey: app.getLoginFlag()
      },
      success: function (res) {
        if(res.data.msg_code==1){//已绑定：1，未绑定：0
          that.setData({
            mer_id:res.data.mer_id,
            store_code:res.data.store_code,
            store_name:res.data.store_name,
            msg_code:res.data.msg_code
          })
        }
        else{
          that.setData({
            msg_code: res.data.msg_code
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    this.isBind();
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
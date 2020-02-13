// pages/main/calender/index.js
var app =getApp();
const moment = require('../../../utils/moment.min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'2020-02-05'
  },

  onOkSelected({ detail }) {
    let { enter, leave } = detail
    app.globalData.date = enter+'入住---'+leave+'离店';
    app.globalData.start = enter;
    app.globalData.end = leave;
    
    // 调用后端接口，查看空房间
    wx.request({
      url: app.globalData.apiUrl +'/TimeGet',
      data:{
        hotel_id:app.globalData.hotel_id,
        begin:enter,
        end:leave
      },
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      success:function(res){
        // 获取空房间
        console.log(res.data)
        app.globalData.room_info = res.data.list
      }
    })

    enter = enter.replace(/-/g, '.')
    leave = leave.replace(/-/g, '.')
    wx.showToast({
      title: enter + ' - ' + leave,
      icon: 'none',
    })
    var timeOut = setTimeout(function(){
      wx.switchTab({
        url: '../index',
      })
    },2500)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
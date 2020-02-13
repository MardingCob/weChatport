// pages/reset/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IDcard:'',
    password:'',
    check_password:''
  },

  inputIDcard:function(e){
    this.setData({
      IDcard:e.detail.value
    })
  },
  inputPassword:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  inputCheckPassword:function(e){
    this.setData({
      check_password:e.detail.value
    })
  },

  reset:function(){
    var that = this;
    // 检查密码
    if(that.password != that.check_password){
      wx.showModal({
        title: '提示',
        content: '两次密码不一致',
      })
      return;
    }
    wx.request({
      url: app.globalData.apiUrl +'/reset',
      data:{
        IDcard:that.data.IDcard,
        password:that.data.password
      },
      method: 'POSt',
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.result == 'fail'){
          wx.showModal({
            title: '提示',
            content: res.data.result,
          })
          return;
        }else{
          wx.showToast({
            title: '成功修改，请重新登录',
          })

          wx.redirectTo({
            url: '../login/index',
          })
        }
      }
    })
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
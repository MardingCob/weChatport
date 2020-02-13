// pages/login/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'admine',
    password:'123456'
  },

  /**
   * 生命周期函数--监听页面加载
   */

  // 输入帐号
  inputAccount:function(e){
    this.setData({
      account:e.detail.value
    })
    
  },
  //输入密码
  inputPassword:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  //登录
  bindLogin: function () {
    var that = this;
    wx.request({

      url: app.globalData.apiUrl + '/login',

      method: "POST",
      data: {
        account: that.data.account,
        password: that.data.password
      },

      header: { 'Content-Type': 'application/json' },

      success: function (res) {
        if(res.data.result =='fail'){
          wx.showModal({
            title: '提示',
            content: res.data.reason,
          })
        }else{
          app.globalData.Ad = res.data.Ad,
          app.globalData.IDcard = res.data.IDcard,
          app.globalData.name = res.data.name,
          app.globalData.username = res.data.username,
          app.globalData.email = res.data.email,
          app.globalData.telephone = res.data.telephone,
          app.globalData.user_id = res.data.user_id
          app.globalData.isLogin = true

          wx.showToast({
            title: '登录成功',
            duration:2000,
            success:function(){
              wx.switchTab({
                url: '../main/index',
              })
            }
          })
        }
      }
    })
  },

 
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
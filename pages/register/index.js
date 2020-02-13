// pages/register/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    name:'',
    IDcard:'',
    password:'',
    check_password:'',
    email:'',
    telephone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  inputUsername:function(e){
    this.setData({
      username:e.detail.value
    })
  },
  inputName:function(e){
    this.setData({
      name:e.detail.value
    })
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
  inputEmail:function(e){
    this.setData({
      email:e.detail.value
    })
  },
  inputTelephone:function(e){
    this.setData({
      telephone:e.detail.value
    })
  },

  register:function(){
    var that = this;
    // 检查邮箱
    if(that.data.email == ''){
      wx.showToast({
        title: '邮箱不能为空',
      })
      return;
    }
    // 检查用户名
    if(that.data.username == ''){
      wx.showToast({
        title: '用户名不能为空',
      })
      return;
    }

    // 检查密码是否合法
    if(that.data.password != that.data.check_password ){
      wx.showToast({
        title: '两次密码不一致',
      })
      return;
    }
    // 检查邮箱是否合法
    // 检查姓名
    // 检查身份证
    wx.request({
      url: app.globalData.apiUrl+'/register',
      data:{
        username:that.data.username,
        name:that.data.name,
        IDcard:that.data.IDcard,
        password:that.data.password,
        email:that.data.email,
        telephone:that.data.telephone
      },
      method:'POST',
      header: { 'Content-Type': 'application/json' },

      success:function(res){
        if(res.data.result == 'succcess'){
          wx.showToast({
            title: '注册成功，请重新登录',
          })

          wx.redirectTo({
            url: '../login/index',
          })
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.reason,
          })
          return;
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
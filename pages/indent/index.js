// pages/indent/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IDcard:'',
    indent_list:[]
  },

  // 输入身份证
  IDcardInput:function(e){
    var that = this;
    that.setData({
      IDcard:e.detail.value
    })
  },

  // 显示记录的详细信息
  showDetail:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;

    var indent_list = JSON.stringify(that.data.indent_list[index]);
    wx.navigateTo({
      url: 'detail/index?indent_list=' + indent_list,
    })
    
  },

  // 查询历史订单
  search:function(){
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + '/cardSearch',
      method: "POST",

      data: {
        card:that.data.IDcard
      },

      header: { 'Content-Type': 'application/json' },

      success:function(res){
        // 检查订单信息
        console.log(res.data.list)
        that.setData({
          indent_list:res.data.list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      IDcard:app.globalData.IDcard
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
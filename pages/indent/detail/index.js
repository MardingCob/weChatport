// pages/indent/detail/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indent_list:[]
  },

  // 退房
  checkOut:function(){
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + '/CheckOutRoom',
      method: "POST",

      data: {
        check_id:that.data.indent_list.check_id
      },

      header: { 'Content-Type': 'application/json' },

      success:function(res){

        // 退房的return
        console.log('退房的return',res.data)

        if(res.data.result == 'success'){
          wx.showToast({
            title: '退房成功',
            duration:2000,
            success:function(){
              var timeout = setTimeout(function(){
                wx.switchTab({
                  url: '/pages/main/index',
                })
              },2000)
              
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var indent_list = JSON.parse(options.indent_list);

    that.setData({
      indent_list:indent_list
    })

    console.log(indent_list)
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
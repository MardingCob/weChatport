// pages/main/hotellist/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotel_list:[],
    hotel_name:'',
    hotel_id:''
  },

  // 选择酒店
  hotelChoice:function(e){
    var that = this;

    // 获取数组下标
    var index = e.currentTarget.dataset.index;
    that.setData({
      hotel_name:that.data.hotel_list[index].hotel_name,
      hotel_id:that.data.hotel_list[index].hotel_id
    })


    // 改变hotel_name
    app.globalData.hotel_name = that.data.hotel_name
    console.log(app.globalData.hotel_name)
    app.globalData.hotel_id = that.data.hotel_id

    wx.switchTab({
      url: '../index'
    })

    

    // 调用后端接口获取房间数据
    wx.request({
      url: app.globalData.apiUrl + '/GetRoom',
      data:{
        hotel_sea:that.data.hotel_id
      },
      method:'POST',
      header: { 'Content-Type': 'application/json' },

      success:function(res){

        // 获取房间的数据
        console.log("room_info",res.data.list)
        app.globalData.room_info = res.data.list
        

      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      hotel_list:JSON.parse(options.hotel_list)
    })

    console.log(that.data.hotel_list)
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
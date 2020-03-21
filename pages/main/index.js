// pages/main/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotel: '请选择酒店',
    date:'请选择日期',
    hotel_list:[],
    room_info:[],
    type:'',
    boolean:false
  },

  // 选择酒店
  hotelChoice:function(){
    var that = this;
    
    wx.navigateTo({
      url: 'hotellist/index?hotel_list='+that.data.hotel_list,
    })
  },
  // 选择时间
  dateChoice:function(){
    wx.navigateTo({
      url: 'calendar/index',
    })
  },

  // 选择房型

  // 全部房型
  all: function () {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + '/roomType',
      method:'POST',
      data:{
        id:app.globalData.hotel_id,
        begin:app.globalData.start,
        end:app.globalData.end
      },
      header: { 'Content-Type': 'application/json' },

      success:function(res){
        console.log('全部房间',res.data)
        app.globalData.room_info = res.data.list
        that.setData({
          room_info:res.data.list
        })
      }
    })
  },

  // 查找大床房
  double:function(){
    var that = this;
    that.setData({
      type:'大床房',
    })
    that.roomType()
  },
  common:function(){
    var that = this;
    that.setData({
      type:'普通间'
    })
    that.roomType()
  },
  president:function(){
    var that = this;
    that.setData({
      type:'总统套房'
    })
    that.roomType()
  },
  lovers:function(){
    var that = this;
    that.setData({
      type:'情侣套房'
    })
    that.roomType()
  },

  // 房间查询方法roomTypes
  roomType:function(){
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + '/roomType',
      method: 'POST',
      data: {
        id: app.globalData.hotel_id,
        begin: app.globalData.start,
        end: app.globalData.end,
        type: that.data.type
      },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        app.globalData.room_info = res.data.list
        that.setData({
          room_info: res.data.list
        })
      }
    })
  },

  // 预约
  reserve:function(e){
    var that = this
    var index = e.currentTarget.dataset.index;
    // 房间信息显示
    console.log("main.js/room_info",that.data.room_info[index])
    wx.navigateTo({
      url: 'reserve/index?room_info=' + JSON.stringify(that.data.room_info[index]),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var list = [];

    wx.request({
      url: app.globalData.apiUrl + '/GetHotel' ,
      method:'POST',
      success:function(res){
        // 酒店数据
        //console.log(res.data)
        that.setData({
          hotel_list: JSON.stringify(res.data.list)
        })
      }
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
    var that = this;

    // 获取房间信息
    var room_info = app.globalData.room_info;
    that.setData({
      room_info: room_info
    })

    that.setData({
      hotel:app.globalData.hotel_name,
      date:app.globalData.date
    })

    this.all()
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
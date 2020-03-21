// pages/main/reserve/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    room_info:[],
    room_type:'',
    date:'',
    hotel_name:'',
    name:'',
    telephone:'',
    group_number:1,
    IDcard:'',
    check_id:'',
    boolean : false,
    p_id:[]

  },

  // 办理人姓名修改
  nameInput:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  // 办理人联系方式修改
  telephoneInput:function(e){
    this.setData({
      telephone:e.detail.value
    })
  },

  // 办理人身份证号修改
  IDcardInput:function(e){
    this.setData({
      IDcard:e.detail.value
    })
  },

  // 入住人数
  numberInput:function(e){
    this.setData({
      group_number:e.detail.value
    })
  },

  // 上传办理人的照片
  upload: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        
        // 检查check_id和IDcard
        console.log(that.data.check_id,that.data.IDcard)
        if (!res.cancer) {
          if (res.tapIndex == 0) {
            that.chooseWxImageShop('album');
          } else if (res.tapIndex == 1) {
            that.chooseWxImageShop('camera')
          }
        }

      }
    })
  },
  chooseWxImageShop: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        /*上传单张
        that.data.orderDetail.shopImage = res.tempFilePaths[0],
        that.upload_file(API_URL + 'shop/shopIcon', res.tempFilePaths[0])
        */
        // 上传多张（遍历数组，一次传一张）
        for (var index in res.tempFilePaths) {
          that.upload_file(app.globalData.apiUrl + '/photoCheck', res.tempFilePaths[index])
        }

      }
    })
  },
  upload_file: function (url, filePath) {
    var that = this;
    that.setData({
      image:filePath
    })
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'photo',
      header: {
        'content-type': 'application/json;charsetset=UTF-8'
      }, 
      
      success: function (res) {
        
        console.log(filePath)
        console.log('成功', res.data)
        if(res.data.result == 2){
          wx.showModal({
            title: '提示',
            content: '未能识别人脸，请重新上传',
          })
        }
        wx.setStorageSync('photo_name', res.data.photo_name)
      },
      fail: function (res) {
        console.log('失败', res)
      }
    })
  },


  // 添加入住人员信息
  addPeople:function(){
    var group_number = this.data.group_number - 1;
    wx.navigateTo({
      url: 'addpeople/index?group_number='+group_number,
    })
  },

  // 预定
  reserve:function(){
    var that = this;

    if(that.data.group_num != 1){
      that.p_id = wx.getStorageSync('p_id')
    }
    

    wx.request({
      url: app.globalData.apiUrl + '/allCheckIn',
      method:'POST',
      data:{
        p_id:that.data.p_id,
        hotel_id:that.data.room_info.hotel_id,
        room_id: that.data.room_info.room_id,
        group_num:that.data.group_number,
        name:that.data.name,
        telephone:that.data.telephone,
        IDcard:that.data.IDcard,
        checkin_time:app.globalData.start,
        checkout_time:app.globalData.end,
        face:wx.getStorageSync('photo_name')
        
      },
      header: { 'Content-Type': 'application/json' },

      success:function(res){
        // 查看预定之后的信息
        console.log("预定res.data,接口allCheckIn",res.data)
        app.globalData.check_id = res.data.check_id

        wx.showToast({
          title: '预定成功',
        })

        var timeout = setTimeout(function(){
          wx.switchTab({
            url: '/pages/main/index',
          })
        },2000)
        
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      room_info:JSON.parse(options.room_info),
      date:app.globalData.date,
      hotel_name:app.globalData.hotel_name,
      name:app.globalData.name,
      telephone:app.globalData.telephone,
      IDcard:app.globalData.IDcard,
      check_id:app.globalData.check_id
    }),
    that.setData({
      room_type:that.data.room_info.room_type
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
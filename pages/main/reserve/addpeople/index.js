// pages/main/reserve/addpeople/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_number:0,
    array:[],
    temp:[],
    idx:'',
    p_id:[],

    // image用于显示图片
    image:[]
    
  },

  // 添加姓名
  nameInput:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.data.array[index].name = e.detail.value
    console.log(that.data.array)
  },

  // 添加手机号
  telephoneInput: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.data.array[index].telephone = e.detail.value
    console.log(that.data.array)
  },
  // 添加身份证号
  IDcardInput: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.data.array[index].IDcard = e.detail.value
    console.log(that.data.array)
  },

  // 上传个人照片
  upload: function (e) {
    var that = this;
    that.setData({
      idx: e.currentTarget.dataset.index
    })
    wx.setStorageSync('index', e.currentTarget.dataset.index)
    // 检查idx
    console.log(wx.getStorageSync('index'))

    wx.showActionSheet({
      itemList: ['从相册选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {

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
          that.upload_file(app.globalData.apiUrl + '/contacts_face', res.tempFilePaths[index])
        }

      }
    })
  },
  upload_file: function (url, filePath) {
    var that = this;
    var idx = wx.getStorageSync('index')
    var list = that.data.array[idx]

    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'photo',
      header: {
        'content-type': 'application/json;charsetset=UTF-8'
      },

      formData:{
        'user_id':app.globalData.user_id,
        'name':list.name,
        'IDcard':list.IDcard,
        'telephone':list.telephone
      },

      success: function (res) {

        console.log(filePath)
        console.log('成功', JSON.parse(res.data))

        var data = JSON.parse(res.data);
        if(data.result == 2){
          wx.showModal({
            title: '提示',
            content: '未能识别人脸请重新上传',
          })
        }else{
          that.data.array[idx].p_id = data.p_id
          console.log(that.data.array)
        }

      },
      fail: function (res) {
        console.log('失败', res)
      }
    })
  },


  // 完成填写
  complete:function(){
    var that = this;
    var temp = that.data.array;
    var p_id = that.data.p_id
    for(var i = 0;i<that.data.group_number;i++){
      p_id[i].p_id = temp[i].p_id
    }
    wx.setStorageSync('p_id', p_id)
    console.log('p_id',p_id)
    
    for(var i = 0;i<that.data.group_number;i++){
      if(temp[i].name==''||temp[i].IDcard == ''||temp[i].telephone == ''){
        wx.showModal({
          title: '提示',
          content: '请完善信息',
        })
        return;
      }else{
        app.globalData.add = true;
        app.globalData.group_info = temp

        // 提交随行人信息
        wx.request({
          url: app.globalData.apiUrl + '/otherCheck',
          method:'POST',
          data:{
            list:temp
          },
          header: { 'Content-Type': 'application/json;charsetset=UTF-8' },
          success:function(res){
          
            console.log("提交随行人信息之后的返回值",res.data)
            
          }
        })
        wx.showToast({
          title: '完成填写',

          success:function(){
            var timeout = setTimeout(function(){
              wx.navigateBack({
                delta:1,
              })
            },2000)
          }
        })

      }
    }
    
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var old = that.data.array;
    var image = that.data.image;
    var p_id = that.data.p_id;
    //old.push(options.group_number)
    for (var i = 0; i < options.group_number;i++){
      old.push({ p_id:'',name: '', telephone: '', IDcard: ''});
      image.push({photo:''});
      p_id.push({p_id:''})
    }
    console.log(old)
    that.setData({
      array:old,
      group_number: options.group_number,
      image:image
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
// pages/testuploadphoto/index.js
var app =getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo:''
  },

  // 胡页句
  photochoose:function(res){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
      }
    })
  },

  //身份证正面
  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })

  },

  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        _this.setData({
          logo: res.tempFilePaths[0],
        })


        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://127.0.0.1:8080/identityAudit/identityAudit',//请求数据接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        })


      }
    })
  },


// 上传2
  pickImage1: function () {
    var that = this
    //微信API选择图片
    wx.chooseImage({
      count: 1,
      　　　　// 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'],
      // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'],
      // album 从相册选图，camera 使用相机，默认二者都有
      success: ret => {
        var filePath = ret.tempFilePaths[0];
        that.setData({
          modelData: {
            src1: filePath
          }
        })
        console.log("图片临时网址，小程序关闭后将会被销毁：");
        console.log(filePath)
        //微信API将图片上传到图床
        //返回网络地址

        // wx.uploadFile({
        //   url: 'https://sm.ms/api/upload',
        //   filePath: filePath,
        //   name: 'smfile',
        //   success: res => {
        //     //逆向转换JSON字符串后抽取网址
        //     console.log("图片上传成功！")
        //     console.log(res)
        //   }
        // })        

        wx.request({
          url: app.globalData.apiUrl + '/photoUp',
          data:{
            photo:filePath
          },
          method:'POST',
          header:{
            'content-type': 'application/json'
          },

          success:function(res){
            console.log(res)
          }
        })
      }
    })
  },


  // 上传图片
  upload: function (e) {
    var that = this;
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
          that.upload_file('http://127.0.0.1:8080/doUpload', res.tempFilePaths[index])
        }

      }
    })
  },
  upload_file: function (url, filePath) {
    var that = this;
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'imagefile',
      header: {
        'content-type': 'application/json;charsetset=UTF-8'
      }, // 设置请求的 header
      formData: { 'guid': "procomment" }, // HTTP 请求中其他额外的 form data
      success: function (res) {
        console.log(filePath)
        console.log('成功',res)
      },
      fail: function (res) {
        console.log('失败',res)
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
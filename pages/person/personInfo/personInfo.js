
var app = getApp();
Page({
  data:{
    newCity:null,
    newAge:null,
    newNick:null,
    userInfo:{},
    toastHidden:true,
    toasttoastContent:"请重试"
  },
  onLoad:function(options){
    var that = this;
    app.getUserInfo(function(userInfo){
      console.log(userInfo);
      that.setData({
        userInfo:userInfo
      });
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var newCity = wx.getStorageSync("addressNewCity");
    if(newCity){
      this.setData({
        newCity:newCity
      });
      wx.setStorage({
        key:"addressNewCity",
        data:null
      });
    }
    else{
      this.setData({
        newCity:null
      });
    }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  chooseImage:function(){
    var that = this;
    wx.chooseImage({
      count:1,
      success:function(res){
        console.log(res);
        var userInfo = that.data.userInfo;
        userInfo.headimg = res.tempFilePaths[0];
        that.setData({
          userInfo:userInfo
        });
      },
      fail:function(res){
        that.setData({
          toastHidden:false
        });
      }
    });
  },
  toastChange:function(){
    var that = this;
    that.setData({
      toastHidden:true
    });
  },
  savePersonInfo:function(){
    var that = this;
    wx.request({
      url:that.globalData.url.api.savePersonInfo,
      data: {
        token: that.globalData.userInfo.token
      }, 
      success: function(res) {
        console.log(res.data);
        if(res.data.errcode==0){
          that.globalData.userInfo = res.data.data;
          that.globalData.userInfo.has =  true;
          //把用户信息保存到缓存
          wx.setStorage({key:"userInfo",data:that.globalData.userInfo});
          typeof cb == "function" && cb(that.globalData.userInfo);
        }
      }
    });
  }
});
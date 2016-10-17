
var app = getApp();
Page({
  data:{
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
  }
});
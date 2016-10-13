//app.js
var apiDomain = "http://ss.taolue.fm/shengsetiyu/singshine";//api domain
App({
  onLaunch: function () {
    var that = this;
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    //获得地理位置
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        that.globalData.location.latitude = res.latitude;
        that.globalData.location.longitude = res.longitude;
        that.globalData.location.speed = res.speed;
        that.globalData.location.accuracy = res.accuracy;
        console.log(that.globalData);
      }
    })
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo);
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    location:{latitude:null,longitude:null,speed:null,accuracy:null},
    url:{
      api:{//不能以 / 结尾
        home:apiDomain+"/appapi.php?url=matchAPI",
        socialHome:apiDomain+"/appapi.php?url=socialAPI" 
      }
    }
  },
  formatShowTime:function(date){
    var str="";
    if(!date){
      return date;
    }
    if(date instanceof Date){
      var nowDate = new Date();
      var nYear = nowDate.getFullYear();
      var nDay = nowDate.getDay();
      var nMonth  = nowDate.getMonth()+1;
      var nHour  = nowDate.getHours();
      var year = date.getFullYear();
      var day = date.getDay();
      var month  = date.getMonth()+1;
      var hour  = date.getHours();
      var minute  = date.getMinutes();
      var second  = date.getSeconds();
      if(nYear==year){
        if(nMonth==month&&nDay==day){
          return hour+":"+minute;
        }
        else{
          return month+"-"+day+" "+hour+":"+minute;
        }
      }
      else{
        return year+"-"+month+"-"+day+" "+hour+":"+minute;
      }
    }
    return date;
  }

});
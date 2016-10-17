//app.js
//config
var domain = "http://ss.taolue.fm/shengsetiyu/singshine";//  domain
var apiDomain = domain+"/appapi.php";//api domain

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
    if(this.globalData.userInfo.has){
      typeof cb == "function" && cb(this.globalData.userInfo);
    }else{
      //先从缓存中获得用户信息
      wx.getStorage({
        key: 'userInfo',
        success: function(res) {
          console.log("get user info from Storage success");
          that.globalData.userInfo = res.data;
          typeof cb == "function" && cb(that.globalData.userInfo);
        },
        fail: function(res) {
          console.log("get user info from Storage fail");
          if(that.globalData.userInfo.token){
            console.log("get user info from api");
            wx.request({
              url:that.globalData.url.api.getUserInfo,
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
        } 
      });
      
    }
  },
  globalData:{
    userInfo:{has:false},
    location:{latitude:null,longitude:null,speed:null,accuracy:null},
    url:{
      api:{//不能以 / 结尾
        home:apiDomain+"?url=matchAPI",
        socialHome:apiDomain+"?url=socialAPI",
        login:apiDomain+"?url=memberAPI&task=mblogin",
        getUserInfo:apiDomain+"?url=memberAPI&task=mbgetinfo" 
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
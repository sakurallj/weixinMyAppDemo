//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    swiper: {//顶部轮播
      indicatorDots:true,
      autoplay:true,
      interval:5000,
      duration:1000,
      imgUrls:[
          "http://preview.quanjing.com/top014/top-663618.jpg",
          "http://preview.quanjing.com/top019/top-747622.jpg"
      ]
    },
    matchFirst:{//通栏上面的赛事

    },
    matchSecond:{//通栏的赛事

    },
    matchLast:{//通栏下面的赛事

    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.request({
      url:app.globalData.url.api.home,
      success: function(res) {
        console.log(res.data);
        //首页顶部的数据
        if(res.data.topAds){
          var len = res.data.topAds.length,imgUrls=[];
          for(var i=0;i<len;i++){
            imgUrls[i] = res.data.topAds[i].logo;
          }
          that.data.swiper.imgUrls=imgUrls;
        }
        //顶部下面的数据
        if(res.data.matchs){
          
        }
      }
    })
  },
  //打开地图
  bindOpenMap : function () {
    wx.openLocation({
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
      scale: 10
    })
  }
})

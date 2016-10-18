var address = require('../js/address.js');
var app = getApp();
Page({
  data:{
    provinces:[],
    citys:[],
    coverLeft:100,
    containerOverflowY:"scoll"
  },
  onLoad:function(options){
    this.setData({provinces:address.getProvinces()});
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
  selectProvince:function(e){
    var dataSet = e.target.dataset;
    if(dataSet.province){
      this.setData({citys:address.getCitys(dataSet.province)});
    }
    this.setData({coverLeft:0,containerOverflowY:"hidden"});
  },
  coverTap:function(e){
    this.setData({coverLeft:100,containerOverflowY:"scoll"});

  },
  cityTap:function(e){
 
  }
});
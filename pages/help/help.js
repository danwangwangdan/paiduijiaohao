//index.js
//获取应用实例
const app = getApp()
var util = require('../../data.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  onLoad: function () {

  }
})

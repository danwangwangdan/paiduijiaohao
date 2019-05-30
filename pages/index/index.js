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
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //事件处理函数
  toHelp: function () {
    wx.navigateTo({
      url: '../help/help'
    })
  },
  onLoad: function () {
   
  }
})

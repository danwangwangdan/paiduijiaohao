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
  //事件处理函数
  toPro: function () {
    console.log("即将跳转")
    wx.navigateToMiniProgram({
      appId: 'wx0e4df37b700d52d1',
      path: 'pages/index/index',
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },
  onLoad: function () {
   
  }
})

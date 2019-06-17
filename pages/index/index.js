//index.js
//获取应用实例
const app = getApp()
var util = require('../../data.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    isShow: false,
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
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://loveshiming.oicp.vip/hishelp/common/show',
      method: 'GET',
      success(res) {
        console.log(res.data);
        if (res.data != null && res.data.data != null) {
          that.setData({
            isShow: res.data.data.noticeText == '1' ? true : false
          })
        }
      },
      fail() {
        $stopWuxRefresher() //停止下拉刷新
        wx.showToast({
          title: '网络请求失败，请稍后重试！',
          icon: 'none',
          duration: 3000
        })
      }
    });

  }
})

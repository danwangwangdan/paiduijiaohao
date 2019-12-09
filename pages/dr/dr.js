//index.js
//获取应用实例
var util = require('../../data.js');
const app = getApp()
Page({
  data: {
    height: 'height:0rpx',
    modalHidden: true,
    currentTab: 'dr2',
    isAdShow: false,
    patientList: [],
    isLoading: true,
    isNull: false,
    isBtnDis: false,
    initialText: '',
    clickOne: 0,
    count: 0
  },
  onShareAppMessage: function () { },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onShow();
    wx.showNavigationBarLoading() //在标题栏中显示加载
  },
  onReady: function() {
    var that = this;
    console.log("onReady")
    var res = wx.getSystemInfoSync();
    that.setData({
      height: "height:" + res.windowHeight + "px"
    })
  },
  onShow: function() {
    var that = this;
    that.setData({
      isLoading: true,
      isNull: true,
      patientList: [],
      initialText: ''
    });
    wx.request({
      url: app.globalData.localApiUrl + '/queue/list?office=drs&room=dr2' + '&ca=' + util.generateCA(),
      method: 'GET',
      success(res) {
        console.log(res.data);
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        if (res.data.code == 1) {
          var data = res.data.data;
          console.log("数组大小：" + data.length);
          if (data.length >= 5 && wx.getStorageSync('isShowAd')) {
            that.setData({
              isAdShow: true
            });
          } else {
            that.setData({
              isAdShow: false
            });
          }
          if (data != null && data.length != 0) {
            that.setData({
              patientList: data,
              isLoading: false,
              isNull: false,
              count: data.length
            });
          } else {
            that.setData({
              initialText: '这个窗口还没有人在排队',
              isLoading: false,
              isNull: true,
              count: 0
            });
          }
        }
      },
      fail(e) {

        wx.showToast({
          title: '连接服务器失败,' + e.errMsg,
          icon: 'none',
          duration: 3000
        })
        that.setData({
          initialText: '连接服务器失败,请稍后重试',
          isLoading: false,
          isNull: true,
          count: 0
        });
      }
    });
  },
  onLoad: function() {

  },
  toClick: function(e) {
    console.log(e)
    let patientId = e.currentTarget.dataset.id;
    console.log('病人ID:' + patientId);
    this.setData({
      modalHidden: false,
      clickOne: patientId
    });

  },
  toNotify: function() {
    var that = this;
    wx.request({
      url: app.globalData.localApiUrl + '/common/notify?pid=' + that.data.clickOne + '&ca=' + util.generateCA(),
      method: 'GET',
      success(res) {
        console.log(res.data);
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        if (res.data.code == 1) {
          var data = res.data.data;
          if (data.code == 1) {
            that.setData({
              isBtnDis: true
            })
            wx.showToast({
              title: '设置提醒成功，请留意微信服务通知消息！',
              icon: 'none',
              duration: 3000
            })
          } else {
            wx.showToast({
              title: '服务器异常，请稍后重试！',
              icon: 'none',
              duration: 3000
            })
          }
        }
      },
      fail(e) {
        wx.showToast({
          title: '连接服务器失败,' + e.errMsg,
          icon: 'none',
          duration: 3000
        })
      }
    });

  },
  toView: function(e) {

  },
  modalCandel: function() {
    this.setData({
      modalHidden: true
    })
  },
  modalConfirm: function() {
    this.setData({
      modalHidden: true
    })
  },
})
//index.js
//获取应用实例
var util = require('../../data.js');
const app = getApp()
import {
  $stopWuxRefresher
} from '../../plugins/wux/index'
Page({
  data: {
    height: 'height:0rpx',
    modalHidden: true,
    currentTab: '主窗口',
    patientList: [],
    isLoading: true,
    isNull: false,
    isBtnDis: false, 
    initialText: '',
    clickOne: 0
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onRefresh() {
    this.onShow();
    wx.showNavigationBarLoading() //在标题栏中显示加载
  },
  onReady: function () {
    var that = this;
    console.log("onReady")
    var res = wx.getSystemInfoSync();
    that.setData({
      height: "height:" + res.windowHeight + "px"
    })
  },
  onShow: function () {
    var that = this;
    that.setData({
      isLoading: true,
      isNull: true,
      patientList: [],
      initialText: ''
    });
    wx.request({
      url: app.globalData.localApiUrl + '/queue/list?office=DR室&room=照片二室' + '&ca=' + util.generateCA(),
      method: 'GET',
      success(res) {
        console.log(res.data);
        wx.hideNavigationBarLoading() //完成停止加载
        $stopWuxRefresher() //停止下拉刷新
        if (res.data.code == 1) {
          var data = res.data.data;
          console.log("数组大小：" + data.length);
          if (data != null && data.length != 0) {
            that.setData({
              patientList: data,
              isLoading: false,
              isNull: false
            });
          } else {
            that.setData({
              initialText: '这个窗口还没有人在排队',
              isLoading: false,
              isNull: true
            });
          }
        }
      },
      fail() {
        wx.showToast({
          title: '网络请求失败，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
      }
    });
  },
  onLoad: function () {

  },
  toClick: function (e) {
    console.log(e)
    let patientId = e.currentTarget.dataset.id;
    console.log('病人ID:' + patientId);
    this.setData({
      modalHidden: false,
      clickOne: patientId
    });
   
  },
  toNotify: function () {
    var that = this;
    wx.request({
      url: app.globalData.localApiUrl + '/common/notify?pid=' + that.data.clickOne + '&ca=' + util.generateCA(),
      method: 'GET',
      success(res) {
        console.log(res.data);
        wx.hideNavigationBarLoading() //完成停止加载
        $stopWuxRefresher() //停止下拉刷新
        if (res.data.code == 1) {
          var data = res.data.data;
          if (data.code == 1) {
            that.setData({
              isBtnDis: true
            })
            wx.showToast({
              title: '设置提醒成功，请留意微信服务通知消息！',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '服务器异常，请稍后重试！',
              icon: 'none',
              duration: 2000
            })
          }
        }
      },
      fail() {
        wx.showToast({
          title: '网络请求失败，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
      }
    });

  },
  toView: function (e) {
   
  },
  modalCandel: function () {
    this.setData({
      modalHidden: true
    })
  },
  modalConfirm: function () {
    this.setData({
      modalHidden: true
    })
  },
})
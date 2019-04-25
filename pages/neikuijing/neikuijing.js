//index.js
//获取应用实例
const app = getApp()
var util = require('../../data.js');
import {
  $stopWuxRefresher
} from '../../plugins/wux/index'
Page({
  data: {
    height: 'height:0rpx',
    modalHidden: true,
    currentTab: '普通胃镜',
    patientList: [],
    isLoading: true,
    isNull: false,
    initialText: ''
  },
  onChange(e) {
    var that = this;
    console.log('onChange', e)
    that.setData({
      currentTab: e.detail.key,
      isLoading: true,
      patientList: [],
      isNull: true,
      initialText: ''
    });
    let current = e.detail.key;
    console.log(current);
    wx.request({
      url: app.globalData.localApiUrl + '/common/queue?office=内窥镜室&room=' + current + '&ca=' + util.generateCA(),
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
        } else {
          that.setData({
            isLoading: false,
            isNull: false
          });
          wx.showToast({
            title: '网络请求失败，请稍后重试！',
            icon: 'none',
            duration: 2000
          })
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
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onRefresh() {
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
      url: app.globalData.localApiUrl + '/common/queue?office=内窥镜室&room=' + that.data.currentTab + '&ca=' + util.generateCA(),
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
        } else {
          that.setData({
            isLoading: false,
            isNull: false
          });
          wx.showToast({
            title: '网络请求失败，请稍后重试！',
            icon: 'none',
            duration: 2000
          })
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
  onLoad: function() {

  },
  toView: function(e) {
    this.setData({
      modalHidden: false
    });
    let patientId = e.currentTarget.dataset.id;
    console.log('病人ID:' + patientId);
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
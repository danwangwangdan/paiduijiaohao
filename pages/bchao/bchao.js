//index.js
//获取应用实例
var util = require('../../data.js');
const app = getApp();
Page({
  data: {
    height: 'height:0rpx',
    modalHidden: true,
    isAdShow: false,
    currentTab: 'no1',
    patientList: [],
    isLoading: true,
    isNull: false,
    initialText: '',
    isBtnDis: false,
    clickOne: 0,
    count1: 0,
    count2: 0,
    count3: 0,
    count4: 0
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
    console.log("current:" + current);
    wx.request({
      url: app.globalData.localApiUrl + '/queue/list?office=bcs&room=' + current + '&ca=' + util.generateCA(),
      method: 'GET',
      success(res) {
        console.log(res.data);
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh()
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
              isNull: false
            });
            if (current == 'no1') {
              that.setData({
                count1: data.length,
                count2: 0,
                count3: 0,
                count4: 0
              });
            } else if (current == 'no2') {
              that.setData({
                count2: data.length,
                count1: 0,
                count3: 0,
                count4: 0
              });
            } else if (current == 'no3') {
              that.setData({
                count3: data.length,
                count2: 0,
                count1: 0,
                count4: 0
              });
            } else if (current == 'no4') {
              that.setData({
                count4: data.length,
                count2: 0,
                count1: 0,
                count3: 0
              });
            }
          } else {
            that.setData({
              initialText: '这个窗口还没有人在排队',
              isLoading: false,
              isNull: true,
              count2: 0,
              count1: 0,
              count3: 0,
              count4: 0
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
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onShow();
    wx.showNavigationBarLoading() //在标题栏中显示加载
  },
  onShareAppMessage: function () { },
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
    console.log("onShow")
    that.setData({
      isLoading: true,
      isNull: true,
      patientList: [],
      initialText: ''
    });
    wx.request({
      url: app.globalData.localApiUrl + '/queue/list?office=bcs&room=' + that.data.currentTab + '&ca=' + util.generateCA(),
      method: 'GET',
      success(res) {
        console.log(res.data);
        console.log('停止刷新');
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
          switch (that.data.currentTab) {
            case 'no1':
              that.setData({
                count1: data.length
              });
              break;
            case 'no2':
              that.setData({
                count2: data.length
              });
              break;
            case 'no3':
              that.setData({
                count3: data.length
              });
              break;
            case 'no4':
              that.setData({
                count4: data.length
              });
              break;
          }

          if (data != null && data.length != 0) {
            that.setData({
              patientList: data,
              isLoading: false,
              isNull: false,
            });
            switch (that.data.currentTab) {
              case 'no1':
                that.setData({
                  count1: data.length
                });
                break;
              case 'no2':
                that.setData({
                  count2: data.length
                });
                break;
              case 'no3':
                that.setData({
                  count3: data.length
                });
                break;
              case 'no4':
                that.setData({
                  count4: data.length
                });
                break;
            }
          } else {
            that.setData({
              initialText: '这个窗口还没有人在排队',
              isLoading: false,
              isNull: true,

            });
            switch (currentTab) {
              case 'no1':
                that.setData({
                  count1: 0
                });
                break;
              case 'no2':
                that.setData({
                  count2: 0
                });
                break;
              case 'no3':
                that.setData({
                  count3: 0
                });
                break;
              case 'no4':
                that.setData({
                  count4: 0
                });
                break;
            }
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
  toView: function(e) {
    this.setData({
      modalHidden: false
    });
    let patientId = e.currentTarget.dataset.id;
    console.log('病人ID:' + patientId);
  },
  toClick: function(e) {
    let patientId = e.currentTarget.dataset.id;
    this.setData({
      clickOne: patientId,
      isBtnDis: true
    })
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
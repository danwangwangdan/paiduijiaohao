//index.js
//获取应用实例
const app = getApp()
import {
  $stopWuxRefresher
} from '../../plugins/wux/index'
Page({
  data: {
    modalHidden: true,
    currentTab: 'tab1',
    patientList: [],
    isLoading: true,
    isShowList: false,
  },
  onChange(e) {
    var that = this;
    console.log('onChange', e)
    that.setData({
      currentTab: e.detail.key,
      isLoading: true,
      patientList: [],
      isShowList: false,
    });
    let current = e.detail.key;
    console.log(current)
    switch (current) {
      case 'tab1':
        setTimeout(function() {
          that.setData({
            isLoading: false,
            isShowList: true,
            patientList: [{
                'id': 124512,
                'name': '黄士明',
                'sn': 20,
                'expectTime': '10:01'
              },
              {
                'id': 124513,
                'name': '张三',
                'sn': 21,
                'expectTime': '10:21'
              },
              {
                'id': 124514,
                'name': '李四',
                'sn': 22,
                'expectTime': '10:41'
              }
            ],
          });
        }, 2000);
        break;
      case 'tab2':
        setTimeout(function() {
          that.setData({
            isLoading: false,
            isShowList: true,
            patientList: [{
                'id': 124512,
                'name': '黄士明',
                'sn': 20,
                'expectTime': '10:01'
              },
              {
                'id': 124513,
                'name': '张三',
                'sn': 21,
                'expectTime': '10:21'
              }
            ],
          });
        }, 2000);
        break;
      case 'tab3':
        setTimeout(function() {
          that.setData({
            isLoading: false,
            isShowList: true,
            patientList: [{
                'id': 124513,
                'name': '张三',
                'sn': 21,
                'expectTime': '10:21'
              },
              {
                'id': 124514,
                'name': '李四',
                'sn': 22,
                'expectTime': '10:41'
              }
            ],
          });
        }, 2000);
        break;
      case 'tab4':
        setTimeout(function() {
          that.setData({
            isLoading: false,
            isShowList: true,
            patientList: [{
                'id': 124512,
                'name': '黄士明',
                'sn': 20,
                'expectTime': '10:01'
              },

              {
                'id': 124514,
                'name': '李四',
                'sn': 22,
                'expectTime': '10:41'
              }
            ],
          });
        }, 2000);
    }

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onRefresh() {
    this.onShow();
    wx.showNavigationBarLoading() //在标题栏中显示加载
  },
  onShow: function() {
    var that = this;
    setTimeout(function() {
      wx.hideNavigationBarLoading() //完成停止加载
      $stopWuxRefresher() //停止下拉刷新
      that.setData({
        isLoading: false,
        isShowList: true,
        patientList: [{
            'id': 124512,
            'name': '黄士明',
            'sn': 20,
            'expectTime': '10:01'
          },
          {
            'id': 124513,
            'name': '张三',
            'sn': 21,
            'expectTime': '10:21'
          },
          {
            'id': 124514,
            'name': '李四',
            'sn': 22,
            'expectTime': '10:41'
          }
        ],
      });
    }, 2000);
  },
  onLoad: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        isLoading: false,
        patientList: [{
            'id': 124512,
            'name': '黄士明',
            'sn': 20,
            'expectTime': '10:01'
          },
          {
            'id': 124513,
            'name': '张三',
            'sn': 21,
            'expectTime': '10:21'
          },
          {
            'id': 124514,
            'name': '李四',
            'sn': 22,
            'expectTime': '10:41'
          }
        ],
      });
    }, 1000);
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
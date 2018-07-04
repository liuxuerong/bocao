//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  
  },
  globalData: {
    userInfo: null,
    defaultCity:"",
    tencentMapKey:"4HYBZ-EB23D-SLC42-HQ5R3-LP3LQ-OZFU5"
  }
})
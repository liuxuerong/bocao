//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    location: '',
  },
  onLoad: function () {
    this.getLocation();
  },
 
  //定位当前城市
  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        //当前的经度和纬度
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${app.globalData.tencentMapKey}`,
          success: res => {

            app.globalData.defaultCity = app.globalData.defaultCity ? app.globalData.defaultCity : res.data.result.ad_info.city;
            app.globalData.defaultCounty = app.globalData.defaultCounty ? app.globalData.defaultCounty : res.data.result.ad_info.district;
            console.log(app.globalData.defaultCity)
            that.setData({
              location: app.globalData.defaultCity,
              county: app.globalData.defaultCounty
            });
          }
        });

      }
    })
  },

  //点击城市切换到城市页面
  jump: function () {
    //关闭本页去切换城市，返回时就可以重新初始化定位信息哦
    wx.reLaunch({
      url: '../switchcity/switchcity'
    });
  },
  // 点击跳转至微信授权页面
  jumpAccredit: function () {
    wx.navigateTo({
      url: '../accredit/accredit',
    })
  },
  formSubmit: function (e) {
    let location = e.detail.value.location;
    let money = e.detail.value.money;
    let userName = e.detail.value.userName;
    if (!money || !userName){
      if (!money){
        wx.showModal({
          content: '请输入借款金额',
          showCancel: false,
          success: function (res) {
          }
        });
      } else if (!userName){
        wx.showModal({
          content: '请输入您的姓名',
          showCancel: false,
          success: function (res) {
          }
        });
      }
    }else{
      this.jumpAccredit()
    }


  }
})


App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    const token = wx.getStorageSync('token')
    this.checkToken(token);
  },
  globalData: {
    token: ''
  },
  checkToken(token) {
    if(!token) {
      this.login();
    } else {
      wx.request({
        url: 'http://123.207.32.32:3000/auth',
        method : 'POST',
        header: {
          token
        },
        success: (res) => {
          if(!res.data.errCode) {
            this.globalData.token = token;
          } else {
            this.login();
          }
        },
        fail: (err) => {
          console.log(err);
        }
      })
    }
  },
  login() {
    wx.login({
     
      success: (res) => {
        const code = res.code;

        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'POST',
          data: {
            code
          },
          success: (res) => {
            // console.log(res)
            const token = res.data.token;
            this.globalData.token = token;

            wx.setStorageSync('token', token);
          }
        })
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})

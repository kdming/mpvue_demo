import Fly from 'flyio'

const fly = new Fly()

//设置超时
fly.config.timeout = 10000
//设置请求基地址
fly.config.baseURL="http://192.168.1.42:46200"

// 响应拦截
fly.interceptors.response.use(
  (response) => {
    if (response.data.msg) {
      wx.hideLoading();
      wx.showToast({
        title: response.data.msg,
        icon: 'none',
      });
    }
    return response.data
  },
  (err) => {
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
    wx.hideLoading();
    wx.showToast({
      title: '网络不流畅，请稍后再试!',
      icon: 'none',
    });
  }
)

export default fly
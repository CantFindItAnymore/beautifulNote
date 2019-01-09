import { config } from './config.js'

// 错误码对应表
const tips = {
  '1': '未知错误',
  '1005': 'appkey无效',
  '3000': '期刊不存在'
}

const http = class HTTP {
  request (params) {
    // params包含 url, data, method, success回調函數
    params.method || (params.method = 'GET')
    wx.request({
      url: config.baseUrl + params.url,
      method: params.method,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      data: params.data,
      success: res => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          console.log(res)
          let errCode = res.data.error_code
          this._showErr(errCode)
        }
      },
      fail: err => {
        console.log(err)
        this._showErr(1)
      }
    })
  }

  // 类的私有方法，用以输出错误信息
  _showErr (errCode) {
    if (!errCode || !tips[errCode]) {
      console.log(errCode)
      errCode = 1
    }
    wx.showToast({
      title: tips[errCode],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  http as HTTP
}
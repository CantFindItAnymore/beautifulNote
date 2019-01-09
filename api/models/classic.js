import { HTTP } from '../http.js'

class ClassicModel extends HTTP {
  getLatest (callBack) {
    this.request({
      url: 'classic/latest',
      success: res => {
        callBack(res)
        this._setLatestId(res.index)
      }
    })
  }

  getMagezine (id, type, callBack) {
    // 缓存机制：去 缓存中读取 或者 从API获取并存入缓存
    let key = type === 'next' ?
      id + 1 : id - 1
    key = 'classic-' + key
    if (!wx.getStorageSync(key)) {
      this.request({
        url: `classic/${id}/${type}`,
        success: res => {
          wx.setStorageSync(key, res)
          callBack(res)
        }
      })
    } else {
      callBack(wx.getStorageSync(key))
    }
  }
  isFirst (id) {
    return id === 1 ? true : false
  }
  isLatest (id) {
    let latestId = this._getLatestId()
    return latestId === id ? true : false
  }
  _setLatestId (id) {
    wx.setStorageSync('latest', id)
  }
  _getLatestId () {
    return wx.getStorageSync('latest')
  }
}

export {
  ClassicModel
}
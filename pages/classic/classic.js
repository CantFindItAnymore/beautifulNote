import { ClassicModel } from '../../api/models/classic.js'
import { LikeModel } from '../../api/models/like.js'


let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    isFirst: false,
    isLatest: true,
    isLike: false,
    likeCount: 0
  },

  onLike (e) {
    let isLike = e.detail.isLike
    likeModel.like(isLike, this.data.content.id, this.data.content.type)
  },

  onLeft () {
    this._getMagezine('next')
  },
  onRight () {
    this._getMagezine('previous')
  },

  // 请求上/下一期的封装函数
  _getMagezine (type) {
    let id = this.data.content.index
    classicModel.getMagezine(id, type, res => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        content: res,
        isFirst: classicModel.isFirst(res.index),
        isLatest: classicModel.isLatest(res.index)
      })
    })
  },
  _getLikeStatus(id, category) {
    likeModel.getClassicLikeStatus(id, category, res => {
      this.setData({
        isLike: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    classicModel.getLatest(res => {
      this.setData({
        content: res,
        isLike: res.like_status,
        likeCount: res.fav_nums
      })
    })
  }
})
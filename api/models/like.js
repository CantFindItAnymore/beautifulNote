import { HTTP } from '../http.js'

class LikeModel extends HTTP {
  like (isLike, id, category) {
    let url = isLike ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: id,
        type: category
      }
    })
  }

  getClassicLikeStatus (id, category, callBack) {
    this.request({
      url: `classic/${category}/${id}/favor`,
      success: res => {
        callBack(res)
      }
    })
  }
}

export {
  LikeModel
}
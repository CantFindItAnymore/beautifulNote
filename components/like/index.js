Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: false
    },
    likeCount: {
      type: Number,
      value: 12,
      // observer () => {} // likeCount属性更新时会调用该函数
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeSrc: '../images/like.png',
    unlikeSrc: '../images/unlike.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike () {
      let like = this.properties.like
      let likeCount = this.properties.likeCount
      this.setData ({
        likeCount: like?likeCount-1:likeCount+1,
        like: !like
      })
      let isLike = this.properties.like?1:0
      this.triggerEvent('like', {
        isLike: isLike
      }, {})
    },
  }
})

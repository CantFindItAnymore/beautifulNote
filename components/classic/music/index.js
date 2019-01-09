const amg = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coverImg: String,
    desc: String,
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    tagImg: '../../images/music@tag.png',
    status: false,
    pauseImg: '../../images/player@pause.png',
    playerImg: '../../images/player@play.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeStatus () {
      this.setData({
        // 切换图片
        status: !this.data.status
      })
      if (this.data.status) {
        amg.src = this.properties.src
        amg.title = this.properties.title
      } else {
        amg.pause()
      }
    },
    /**
     * 私有方法
     */
    _check() {
      if (amg.paused) {
        this.setData({
          status: false
        })
        return
      }
      if (amg.src === this.properties.src) {
        this.setData({
          status: true
        })
      }
    },
    _watchAmg () {
      amg.onPause(() => {
        this.setData({
          status: false
        })
      }),
      amg.onPlay(() => {
        this.setData({
          status: true
        })
      }),
      amg.onEnded(() => {
        this.setData({
          status: false
        })
      })
    }
  },
  /**
   * 生命周期
   */
  attached () {
    this._check()
    this._watchAmg()
  }
})

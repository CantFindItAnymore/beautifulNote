// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    isFirst: Boolean,
    isLatest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc: '../images/triangle@left.png',
    rightSrc: '../images/triangle@right.png',
    leftSrcDis: '../images/triangle.dis@left.png',
    rightSrcDis : '../images/triangle.dis@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft () {
      this.data.isLatest || this.triggerEvent('onLeft', {}, {})
    },
    onRight() {
      this.data.isFirst || this.triggerEvent('onRight', {}, {})
    }

  }
})

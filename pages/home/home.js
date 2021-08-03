// pages/home/home.js
import {
  getGoods,
  getMuData
} from '../../utils/network/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    index: 0,
    goods: {
      pop: {page: 0, list: []},
      new: {page: 0, list: []},
      sell: {page: 0, list: []}
    },
    curType: 'pop',
    isShow: false,
    isTabShow: false,
    tabScrollTop: 0
     
    
  },
  
  onLoad() {
    
    // 获取轮播图推荐数据
    this._getMuData()
    // 获取商品数据
    this._getGoods('pop')
    this._getGoods('new')
    this._getGoods('sell')

    console.log(this.data.goods['pop'].list)
    
  },
  _getMuData() {
    getMuData().then((res) => {
      // console.log(res);
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      // console.log(banners, recommends)
      this.setData({
        banners,
        recommends
      })
      
    })
  },
 
  _getGoods(type) {
    const page = this.data.goods[type].page + 1
    getGoods(type, page).then((res) => {
      // console.log(res)
      const list = res.data.data.list;
     
      // 将数据设置到对应type的list中

      const oldList =  this.data.goods[type].list;
      oldList.push(...list);
      // 将数据设置到data中的goods中

      const settype = `goods${type}.list`;
      const setpage =  `goods${type}.page`;

      this.setData({
        [settype]: oldList,
        [setpage]: page
      })
    })
  },
  handleImageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
      // console.log(this.data.tabScrollTop)
    }).exec()
  },
  itemClick(event) {
    const select = ['pop', 'new', 'sell']
    const index = event.detail;

    this.setData({
      index,
      curType: select[index]
    })
  },
  backTop() {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  onPageScroll(options) {
   const scrollTop = options.scrollTop;

   const flag1 = scrollTop >= 1000;

   if(flag1 != this.data.isShow) {
     this.setData({
       isShow: flag1
     })
   }
   
   const flag2 = scrollTop >= this.data.tabScrollTop;

   if(flag2 != this.data.isTabShow) {
     this.setData({
       isTabShow: flag2
     })
   }
  }
})
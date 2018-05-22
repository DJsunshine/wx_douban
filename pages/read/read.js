// pages/read/read.js
var readData=require('../../data/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      readList:readData.postList
    })
  },

  //页面跳转
  detail:function(e){
    let readId=e.currentTarget.dataset.readid;
    wx.navigateTo({
      url: 'read-detail/read-detail?id='+readId
    })
  },
  //轮播跳转
  onSwiperTap:function(e){
      let readId=e.target.dataset.readid;
      wx.navigateTo({
        url: 'read-detail/read-detail?id=' + readId
      })
  }
  
})
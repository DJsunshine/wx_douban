// pages/read/read-detail/read-detail.js
var readList=require('../../../data/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var readidx=options.id;
    this.data.collectId=readidx;
    var readData=readList.postList[readidx];
    this.setData({
      readData:readData
    })
    //获取存储的收藏列表
    var readsCollected=wx.getStorageSync('reads_collected');
    if(readsCollected){
      //获取到当前文章的收藏状态
      var readCollected=readsCollected[readidx];
        if(readCollected){
          this.setData({
            collected:readCollected
          })
        }
    }else{
      var readsCollected={};
      readsCollected[readidx]=false;
      wx.setStorageSync('reads_collected', readsCollected)
    }
  },

  //收藏按钮点击
  onColletionTap:function(){
    this.getPostsCollectedAsy();
  },
  
  getPostsCollectedAsy(){
    var that=this;
    console.log()
    wx.getStorage({
      key: 'reads_collected',
      success: function(res) {
        var readsCollected = res.data;
        var readCollected = readsCollected[that.data.collectId];
        //收藏变为未收藏  未收藏变成收藏
        readCollected = !readCollected;
        readsCollected[that.data.collectId] = readCollected;
        that.showToast(readsCollected,readCollected);
      },
    })
  },

  //显示状态框
  showToast(readsCollected, readCollected){
      //先更新数据 在显示状态值
      wx.setStorageSync('reads_collected', readsCollected);
      this.setData({
        collected:readCollected
      })
      
      wx.showToast({
        title: readCollected ? "收藏成功":'取消成功',
        duration: 1000,
        icon : "success"
      })
  },

  //分享按钮
  onShareTap:function(){
      var itemList=[
        "分享到微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
      ];
      wx.showActionSheet({
        itemList: itemList,
        itemColor: "#405f80",
        success:function(res){
         //res.cancael 用户是不是点击了取消按钮
         //res.tapIndex 数组元素的序号，从0开始
         wx.showModal({
           title: '你'+itemList[res.tapIndex],
           content: '现在无法实现分享功能，我也不会做啊',
         })
        }
      })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that=this;
  return{
    title: that.readData.title,
    path: '/pages/read/read-detail/read-detail?id=' + that.data.collectId,
    success:function(res){
      console.log(res)
    }
  }
  }
})
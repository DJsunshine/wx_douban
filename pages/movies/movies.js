// pages/movies/movies.js
var until=require('../../utils/until.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},//正在上映
    comingSoon: {},//即将上映
    top250: {},//top250
    containerShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //正在上映
      var inTheaterUrl=app.globalData.doubanBase+'/v2/movie/in_theaters'+'?start=0&count=3';
      //即将上映
      const comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
      //top250
      const top250Url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=0&count=3';
      this.getMovieList(inTheaterUrl,'inTheaters','正在上映');
      this.getMovieList(comingSoonUrl, 'comingSoon', '正在热映');
      this.getMovieList(top250Url, 'top250', '豆瓣Top250');
      
  },
  //获取请求的数据
  getMovieList:function(url,settedKey,listTitle){
      var that = this;
      wx.request({
        url: url,
        method:'GET',
        header:{
          "Content-Type":"json"
        },
        success:function(res){
          that.processDouban(res.data, settedKey, listTitle);
        },
        fail:function(error){
          console.log(error)
        }

      })
  },
  //对请求的数据进行处理
  processDouban: function (moviesDouban, settedKey, listTitle){
      var movies=[];
      for(let idx in moviesDouban.subjects){
        let subject = moviesDouban.subjects[idx];
        //电影名字
        var title = subject.title;
        if(title.length>=6){
          title = title.substring(0,6)+"...";
        }

        const temp = {
          stars: until.Countstarts(subject.rating.stars),
          title: title,
          average: subject.rating.average,
          coverageUrl:subject.images.large,
          movidId: subject.id
        }

        movies.push(temp)
      }

      var readyData={};
      readyData[settedKey]={
        title: listTitle,
        movies:movies
      }
      this.setData(readyData)
  },

  //搜索框获得焦点
  onBindFocus: function (e) {
    this.setData({
      containerShow: false
    })
  },
  //搜索框失去焦点
  onBindBlur: function (e) {
    this.setData({
      containerShow: true
    })
  },
  //点击单个列表
  movieDetail:function(e){
    console.log(e.currentTarget.dataset.movieid)
  }
})
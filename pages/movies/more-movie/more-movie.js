// pages/movies/more-movie/more-movie.js
var util = require("../../../utils/util.js")
var app = getApp();
Page({
  data: {
    requestUrl:"",
    totalCount:0,
    isEmpty:true
  },
  onLoad: function (options) {
    var category = options.category;
    console.log(category)
    wx.setNavigationBarTitle({
      title: category
    })
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }

    //设到全局，用于滑动时获取url
    this.data.requestUrl=dataUrl
    //调用全局方法
    util.http(dataUrl, this.processDoubanData);
  },

  //上滑加载更多，每次加载20条新数据
  onScrollLower:function(event){
    var nextUrl=this.data.requestUrl+"?start="+this.data.totalCount+"&count=20";
    // this.data.totalCount+=20;
    // console.log(this.data.requestUrl)
    
    util.http(nextUrl, this.processDoubanData);
    //显示加载条
    wx.showNavigationBarLoading();
  },


  onPullDownRefresh:function(event){
    var refreshUrl=this.data.requestUrl+"?start=0&count=20";
    
    util.http(refreshUrl, this.processDoubanData);
    this.data.movies={};
    this.data.isEmpty=true;
    wx.showNavigationBarLoading();
  },

  //全局方法回调函数
  //数据填充方法
  processDoubanData: function (moviesDouban) {
    var movies = [];                                     //电影数组容器
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length > 6) {                            //处理超长的电影名
        title = title.substring(0, 6) + "..."
      }

      var temp = {                                    //提取出来的属性组成一个新对象
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }

    var totalMovies={};   //用于存放上滑加载后加了新项的对象
    //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if(!this.data.isEmpty){
      totalMovies=this.data.movies.concat(movies);
    }
    //第一次加载页面时，isEmpty为true
    else{
      totalMovies=movies;
      this.data.isEmpty=false;
    }

    this.data.totalCount+=20;
    this.setData({
      movies:totalMovies
    })

    //隐藏加载条
    wx.hideNavigationBarLoading();
    //停止下拉刷新
    wx.stopPullDownRefresh();
  },

  //跳转到电影详情页
    onMovieTap:function(event){
        var movieId=event.currentTarget.dataset.movieid;
         wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + movieId,
            success: function (res) {
                // success
            },
            fail: function (res) {
                // fail
            },
            complete: function (res) {
                // complete
            }
        })
    },
})


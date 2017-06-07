var util = require("../../utils/util.js")
var app = getApp();
Page({
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {},
        searchResult: {},
        containerShow: true,
        searchPanelShow: false,
    },
    onLoad: function (event) {
        var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?count=3";
        var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?count=3";
        var top250Url = app.globalData.doubanBase + "/v2/movie/top250";

        this.getMovieList(inTheatersUrl, "inTheaters", "正在热映");
        this.getMovieList(comingSoonUrl, "comingSoon", "即将上映");
        this.getMovieList(top250Url, "top250", "豆瓣Top250");
        // this.getMovieList(comingSoonUrl);
        // this.getMovieList(top250Url);
    },

    //搜索框获取焦点时隐藏页面，显示搜索页
    onBindFocus: function () {
        this.setData({
            containerShow: false,
            searchPanelShow: true
        })
    },

    //退出搜索页面
    onCancelImgTap: function () {
        this.setData({
            containerShow: true,
            searchPanelShow: false,
            //清空上次搜索结果
            // searchResult:{}
        })
    },

    //开始搜索
    onBindBlur: function (event) {
        var text = event.detail.value;
        var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
        this.getMovieList(searchUrl, "searchResult", "");
    },

    //更多 按钮触发的事件
    onMoreTap: function (event) {
        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'more-movie/more-movie?category=' + category,
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

    //跳转到电影详情页
    onMovieTap:function(event){
        var movieId=event.currentTarget.dataset.movieid;
         wx.navigateTo({
            url: 'movie-detail/movie-detail?id=' + movieId,
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

    //访问豆瓣接口方法
    getMovieList: function (url, settedKey, categoryTitle) {
        var that = this;
        wx.request({
            url: url,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            header: {
                "content-type": "application/xml"
            },
            success: function (res) {
                // success
                that.processDoubanData(res.data, settedKey, categoryTitle);
            },
            fail: function (res) {
                // fail
                console.log("fail")
            },

        })
    },

    //数据填充方法
    processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
        var movies = [];                                     //电影数组容器
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {                            //处理超长的电影名
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

        var readyData = {};                                  //区分三个栏目下的电影
        readyData[settedKey] = {
            movies: movies,
            categoryTitle: categoryTitle
        }
        this.setData(readyData)
    }
})
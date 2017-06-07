var postsData = require("../../../data/posts-data.js")
var app = getApp();
Page({
  data: {
    isPlayingMusic: false                                             //音乐是否正在播放
  },
  onLoad: function (options) {
    var globalData = app.globalData;
    console.log(globalData)
    // 生命周期函数--监听页面加载
    var postId = options.id;
    this.data.currentPostId = postId;                                 //存在data中，便于其他函数使用
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    })

    //初始化时获取收藏的标志位
    var postsCollected = wx.getStorageSync("posts-collected");
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    }
    else {                                                              //没缓存时，置false
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts-collected', postsCollected);
    }

    if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId===postId){             
      //进入页面时判定是否在播放当前页面的音乐,是的话就显示正在播放的图标
      this.setData({
        isPlayingMusic:true
      })
    }

    this.setMusicMonitor();
  },

  setMusicMonitor: function () {
    //点击播放图标和总控开关都会触发这个函数
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic=true;                              //全局变量置于播放
      app.globalData.g_currentMusicPostId=that.data.currentPostId;
    })

    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic=false;
       app.globalData.g_currentMusicPostId=null;
    })
    //音乐停止后改变图标
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic=false;
       app.globalData.g_currentMusicPostId=null;
    })
  },

  //改变收藏的状态
  onCollectionTap: function () {
    this.getPostsCollectedSyc();
  },

  onShareTap: function () {
    var itemList = ["分享给微信好友", "分享到朋友圈", "分享到QQ", "分享到微博"];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        wx.showModal({
          title: "用户" + itemList[res.tapIndex],
          content: "现在无法实现分享" + res.cancel
        })
      }
    })
  },

  getPostsCollectedAsy: function () {                                 //storage异步方法
    var that = this;
    wx.getStorage({
      key: "posts-collected",
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      }
    })
  },


  getPostsCollectedSyc: function () {                                     //同步方法
    var postsCollected = wx.getStorageSync("posts-collected");            //整个对象
    var postCollected = postsCollected[this.data.currentPostId];           //当前项
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;               //当前项置反
    this.showToast(postsCollected, postCollected);
  },

  showToast: function (postsCollected, postCollected) {                    //先设值再弹出 
    wx.setStorageSync('posts-collected', postsCollected);
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消收藏成功'
    })
  },

  showModal: function (postsCollected, postCollected) {                    //先弹出，确认后设值
    var that = this;                                                         //函数调用上下文环境
    wx.showModal({
      title: "收藏",
      content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('posts-collected', postsCollected);
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },

  onMusicTap: function () {
    var currentPostId = this.data.currentPostId;                                //当前文章对应的音乐数据
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }


})
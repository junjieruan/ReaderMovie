var postsData=require("../../data/posts-data.js")

Page({
  data:{
    
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    
    this.setData({
      posts_key:postsData.postList
    })
  },
  onPostTap:function(event){
    var postId=event.currentTarget.dataset.postid;
    console.log(postId);
    wx.navigateTo({
          url: 'post-detail/post-detail?id='+postId,
          success: function(res){
            // success
          },
          fail: function(res) {
            // fail
          },
          complete: function(res) {
            // complete
          }
        })
  },

  onSwiperTap:function(event){
    //target指的是当前点击的组件,currentTarget指的是事件捕获的组件
    //target指的是image，currentTarget指的是swiper
    var postId=event.target.dataset.postid;
    wx.navigateTo({
          url: 'post-detail/post-detail?id='+postId,  
    })
  }
})
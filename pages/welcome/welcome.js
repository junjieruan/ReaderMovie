Page({
    onTap:function(){
        // wx.redirectTo({
        //   url: '../posts/post',
        //   success: function(res){
        //     // success
        //   },
        //   fail: function(res) {
        //     // fail
        //   },
        //   complete: function(res) {
        //     // complete
        //   }
        // })

        wx.switchTab({
          url: '../posts/post',
          success: function(res){
            // success
            console.log("success")
          },
          fail: function(res) {
            // fail
            console.log("success1")
          },
          complete: function(res) {
            // complete
          }
        })
    },
    
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    console.log("onHide");
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    console.log("onUnload");
  },
})
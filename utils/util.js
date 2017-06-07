function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

//访问豆瓣接口方法
function http(url,callBack) {                    //回调
  wx.request({
    url: url,
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    header: {
      "content-type": "application/xml"
    },
    success: function (res) {
      callBack(res.data)
    },
    fail: function (res) {
      // fail
      console.log("fail")
    },

  })
}


function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}


module.exports = {
  convertToStarsArray: convertToStarsArray,
  http:http,
  convertToCastString:convertToCastString,
  convertToCastInfos:convertToCastInfos
}
# ReaderMovie
开发一个影视介绍微信小程序

> 基于微信小程序知识，在微信web开发者工具上进行开发

> 来自于慕课网《微信小程序入门与实战 常用组件api 开发技巧 项目实战》demo，为基于移动端的影视介绍播放小程序

> 具体api文档说明可在微信web开发者工具的帮助-关于-查看帮助文档  查看

> 编写技巧：

>（1）写wxml时应避免断裂式写法(即写完这个元素再写下一个元素)，应该用整体式写法
元素布局无非就是垂直或者水平布局，观察整个大的元素里面的布局，先把里面所有子元素都按布局位置写上，形成骨架，再把具体内容填入骨架

>（2）填入骨架后，再从最外层开始定义class名(名字要定好一点，见名知意)，书写样式，这样才能写出结构化可复用易维护的代码

>（3）样式(从最外层一层层往里写)


``` bash
# 事件绑定
bindxxx="事件名"

#自适应单位rpx的意义

# Page生命周期

# 小程序模板化（template多层嵌套）
对于wxml：
1.template模板的使用(把复用的wxml代码放到template中)
2.在需要引用模板的wxml页面头部用import标签引入模板

对于wxss：
将原wxss中和模板相关的代码贴入新建的wxss文件，并在原文件头部用@import引入

#自定义属性
1.组件绑定自定义属性，格式：data-xxx=“” ，到了页面显示中data和连字符都会去掉（catchtap绑定可以阻止冒泡，bindtap不阻止）
2.event.currentTarget 为当前点击的组件，dataset为标签属性的集合

# 数据绑定
1.js中的this.setData({})可以把数据set进data中
2.wx:if 控制元素显隐
3.wx:for=“{{}}” 循环数据  
4.wx:for-item=“item” 用字符代替循环中的每个数据，默认就用item指代数据，标签属性中不用写也可以在子元素中{{item.xxx}}获取数据
5.标签中data属性值可用{{…item}}，意思为将item展开，在模板文件中就不需要再{{item.xxx}}而直接{{xxx}}写变量名即可。同时，{{a:aaa,b:bbb}}
可将aaa和bbb这两个值赋给两个键封装成一个JS对象传给模板
6.菜单栏的AppData选项可以观察页面中数据绑定变量的相关数据情况，有助于数据绑定的验证

# RESTful API发起https请求

# 不同页面传参的几种方式：url后带参数，全局变量，缓存

# ES6在小程序中的使用（module，class，promise，=>）
```
# 程序展示
![image](https://github.com/junjieruan/ReaderMovie/raw/master/images/githubshow/1.png)
![image](https://github.com/junjieruan/ReaderMovie/raw/master/images/githubshow/4.png)
![image](https://github.com/junjieruan/ReaderMovie/raw/master/images/githubshow/2.png)
![image](https://github.com/junjieruan/ReaderMovie/raw/master/images/githubshow/3.png)
 

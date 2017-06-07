# ReaderMovie
开发一个影视介绍微信小程序

> 基于微信小程序知识，在微信web开发者工具上进行开发

> 来自于慕课网《微信小程序入门与实战 常用组件api 开发技巧 项目实战》demo，为基于移动端的影视介绍播放小程序

> 具体api文档说明可在微信web开发者工具的帮助-关于-查看帮助文档  查看

``` bash
# 事件绑定
bindxxx="事件名"

# 小程序模板化（template多层嵌套）
对于wxml：
1.template模板的使用(把复用的wxml代码放到template中)
2.在需要引用模板的wxml页面头部用import标签引入模板

对于wxss：
将原wxss中和模板相关的代码贴入新建的wxss文件，并在原文件头部用@import引入

#自定义属性
1.组件绑定自定义属性，格式：data-xxx=“” ，到了页面显示中data和连字符都会去掉（catchtap绑定可以阻止冒泡，bindtap不阻止）
2.event.currentTarget 为当前点击的组件，dataset为标签属性的集合

# ES6在小程序中的使用（module，class，promise，=>）
```

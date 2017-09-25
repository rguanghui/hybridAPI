# 扩展右上角菜单

> 参数是一个数组，可以设置多个自定义菜单按钮。

``` javascript
hybridAPI.setRightMenu([
  Config,
  Config,
])
```

`Config` 的结构

``` javascript
{
  text: '分享',
  eventName: 'shareStage', // 自定义的 event 事件名，你可以自己捕获到。
  action() { // 当点击这个自定义按钮时触发的行为
    hybridAPI.sharePanel({
      targets: ['weixin', 'weixin_timeline', 'weibo', 'qq', 'qzone'],
    })
  },
  overflow: false, // 是否收起（当我们设置多个按钮的时候可以将这些按钮收起来以友好交互）默认为 false
}
```

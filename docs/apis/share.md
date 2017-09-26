# 分享

## Navbar 右上角展示分享按钮

> 此方法在执行时会往页面中加入一些 `name` 为 `eleme-share:x` 的 `meta` 标签来告诉 App 需要展示分享按钮

``` javascript
hybridAPI.share({
  title: '分享标题',
  text: '分享副标题',
  weibo: '微博分享的内容',
  // 注意！imgUrl 和 link 必须是以 http 或 https 开头的绝对 URL
  url: '分享链接',
  image_url: '分享图标'
})
```

## 主动唤起 Native 中的分享 Panel

``` javascript
hybridAPI.sharePanel({
  source: [String], // 代表打开这个 Panel 的来源，可用来进行统计
  title: [String], // 分享到社交平台的标题，默认值：饿了么
  text: [String], // 分享到社交平台的简介文案，默认值：无
  url: [String], // 分享出去的链接，默认为当前页面的 URL
  targets: [Array], // 需要展示的分享平台。可供选择的有 ['weixin', 'weixin_timeline', 'weibo', 'qq', 'qzone']。默认展示全部
  image_url: [String], // 分享的图片缩略图或者图片（绝对路径）

  media: [String],  // 是否分享截屏，当设置为 screenshot 的时候分享出去的是当前 WebView 截屏，而不是链接。（支持版本：7.17）
  image_only: [Boolean], // 是否单独分享一张图片，当设置为 true 的时候分享出去的是一个图片，而不是链接。默认为 false（支持版本：7.18）
})
```

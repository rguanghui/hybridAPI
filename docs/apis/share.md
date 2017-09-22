# Navbar 右上角展示分享按钮

此方法在执行时会往页面中加入一些 `name` 为 `eleme-share:x` 的 `meta` 标签来告诉 App 需要展示分享按钮

``` js
hybridAPI.share({
  title: '分享标题',
  text: '分享副标题',
  weibo: '微博分享的内容',
  // 注意！imgUrl 和 link 必须是以 http 或 https 开头的绝对 URL
  url: '分享链接',
  image_url: '分享图标'
})
```

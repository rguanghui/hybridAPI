# hybirdAPI

这里提供的是目前饿了么mobile app端支持的hybird APIs的兼容版本，app5.9于2016年3月28日发版，届时将不支持旧版方法。建议大家及时更新，欢迎使用。

以及，若有新需求也可以给本仓库提issue，会更新到app那边支持。

1. 获取饿了么外卖app全局的geohash值。
2. 显示app右上角的分享功能，并定制分享文案
3. 下单选择红包

#### 安装与使用

###### 1. 安装

```html
<!-- 引入 hybirdAPI -->
<script src="//github.elemecdn.com/uglifyjs!eleme/hybirdAPI/0.1.2/hybirdAPI.js"></script>
```

###### 2. 使用

获取饿了么app全局的geohash值

```js
hybirdAPI.getGlobalGeohash(geohash => {
	//
  alert('geohash:' + geohash);
});
```

显示app右上角的分享功能，并定制分享文案

```js
hybirdAPI.share({
  title: '分享标题',
  text: '分享副标题',
  weibo: '微博分享的内容',
  // 注意！imgUrl 和 link 必须是以 http 或 https 开头的绝对 URL
  url: '分享链接',
  image_url: '分享图标'
});
```

下单选择红包
```js
hybirdAPI.selectHongbao(hongbaosn);hongbaosn为选中红包的SN，必传项
```

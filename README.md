# HybridAPI

这里提供的是目前饿了么APP支持的Hybrid API的兼容版本。 App 5.9于2016年3月28日发布，届时将不支持旧版方法。

以及，若有新需求也可以给本仓库提 issue ，会更新到 App 那边支持。

1. 获取饿了么外卖 App 全局的 geohash 值。v5.4
2. 显示 App 右上角的分享按钮，并定制分享文案。v5.6
3. 下单选择红包。v5.9
4. 设置页面的title。v5.10
3. 获取用户位置定位状态。v5.10.1
3. 关闭当前页面。v5.12.1

## 安装与使用

### 1. 安装

```html
<!-- 引入 HybridAPI -->
<script src="//github.elemecdn.com/uglifyjs!eleme/hybridAPI/0.2.2/hybrid-api.js"></script>
```

### 2. 使用

获取饿了么app全局的geohash值

```js
hybridAPI.getGlobalGeohash(geohash => {
  alert('geohash:' + geohash);
});
```

显示 App 右上角的分享按钮，并定制分享文案

```js
hybridAPI.share({
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
hybridAPI.selectHongbao(hongbaosn); // hongbaosn为选中红包的SN，必传项
```

设置页面的title
```js
hybridAPI.setTitle(title); // title为页面的title
```

获取用户位置定位状态
```js
hybridAPI.getLocateStatus(status => {
  // status 状态值
  // 0: 尚未发起定位
  // 1: 定位中
  // 2: 定位成功
  // 3: 定位失败
});
```

关闭当前页面
```js
hybridAPI.closePage();
```

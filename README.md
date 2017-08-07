# HybridAPI

这里提供的是目前饿了么APP支持的Hybrid API的兼容版本。 App 5.9于2016年3月28日发布，届时将不支持旧版方法。

以及，若有新需求也可以给本仓库提 issue ，会更新到 App 那边支持。

1. 获取饿了么外卖 App 全局的 geohash 值。v5.4
2. 显示 App 右上角的分享按钮，并定制分享文案。v5.6
3. 下单选择红包。v5.9
4. 设置页面的title。v5.10
3. 获取用户位置定位状态。v5.10.1
3. 关闭当前页面。v5.12.1
1. 唤出 App 分享按钮panel，并定制分享按钮，分享文案，分享来源 v5.4甚至更早:joy:
1. 给定应用包名查询是否安装。 v7.2(Android)
1. 打开传入包名的 app。 v7.2(Android)
1. 当前网络状态。 v7.5
1. 退出确认。 v?
1. 获取手机通信录 v7.9(iOS>=9.0 不支持安卓)

## 安装与使用

### 1. 安装

```html
<!-- 引入 HybridAPI -->
<script src="//github.elemecdn.com/uglifyjs!eleme/hybridAPI/${version}/hybrid-api.js"></script>
```

### 2. 使用

获取饿了么app全局的 geohash 值

```javascript
hybridAPI.getGlobalGeohash
.then(geohash => {
  // do you thing.
})
.catch(error => {
  // do you thing.
})
```

显示 App 右上角的分享按钮，并定制分享文案

```javascript
hybridAPI.share({
  title: '分享标题',
  text: '分享副标题',
  weibo: '微博分享的内容',
  // 注意！imgUrl 和 link 必须是以 http 或 https 开头的绝对 URL
  url: '分享链接',
  image_url: '分享图标'
})
```

下单选择红包
```javascript
hybridAPI.selectHongbao(hongbaosn) // hongbaosn为选中红包的SN，必传项
```

设置页面的title
```javascript
hybridAPI.setTitle(title) // title为页面的title
```

获取用户位置定位状态
```javascript
hybridAPI.getLocateStatus(status => {
  // status 状态值
  // 0: 尚未发起定位
  // 1: 定位中
  // 2: 定位成功
  // 3: 定位失败
})
```

关闭当前页面
```javascript
hybridAPI.closePage()
```

获取当前登录用户的 userID
```javascript
hybridAPI.getUserID(id => {
  callback(id)
})
```

唤出 App 分享按钮pannel，并定制分享按钮，分享文案，分享来源

```js
<!-- source: 来源，用于统计 -->
// 分享按钮如下，可选（需要哪个按钮加哪个参数）
// weixin: 微信
// weixin_timeline: 微信朋友圈
// weibo: 微博
// qq: QQ好友
// qzone: QQ空间

hybridAPI.sharePanel({
  source: '', //来源，用于统计
  targets: ['weixin', 'weixin_timeline', 'weibo', 'qq', 'qzone'], // 分享按钮
  title: '分享标题',
  text: '分享副标题',
  url: '分享链接',
  image_url: '分享图标'
})

> 其中分享链接里增加了一个type参数，用于识别不同的分享平台，免去在分享链接的另外获取。值为['weixin', 'weixin_timeline', 'weibo', 'qq', 'qzone']其中之一
```

当前网络状态:

```js
hybridAPI.networkType(function (status) {
  alert('NetworkType: ' + status);
});
```

退出确认:

```js
hybridAPI.exitConfirm({
  title: '提示',
  content: '是否确认关闭页面?',
  yes_text: '关闭页面',
  no_text: '取消'
});
```

设置右侧菜单：

```js
hybridAPI.setRightMenu([
  { text, eventName, action, iconHash, overflow },
])
hybridAPI.clearRightMenu()
```

拦截返回按钮：

```js
hybridAPI.hookBack({ eventName, action })
hybridAPI.cancelHookBack()
```

动态设置导航栏样式：（7.15 支持）

```js
hybridAPI.setNavStyle({
  navType: '1', // 不用担心，数字会被转为字符串
  navColor: '#ffffff', // 必须为 6 位 16 进制，传空字符串为默认蓝色（iOS 需要 7.16）
  navTextColor: '#000000', // 必须为 6 位 16 进制
})
```

给定应用包名查询是否安装(Android):

```js
hybridAPI.checkPackages(['com.tencent.mm'], function (result) {
  alert('PackagesStatus: ' + JSON.stringify(result));
});
```

打开传入包名的 App (Android):

```js
hybridAPI.openPackage('com.tencent.mm');
```

获取手机通信录 (iOS):

```js
// 从通信录中取 n 个联系人
hybridAPI.contactList(n);           // Promise
hybridAPI.contactList(n, callback); // callback
```

### 3.开发

安装依赖:

```shell
npm install
```

编译打包:

```shell
npm run build
```

开发环境(Android):

* 使用开发版"饿了么 App", `Change engpoint` 设置为 `production`
* 在 `Url/Scheme test` 通过网址打开, 主要需要 `*.ele.me` 来保证变量注入
* 通过网络代理等方式, 对应域名指向开发的环境

开发环境(iOS):

* 使用"饿了么 App", 处于 `production` 模式
* 在 `webViewTest` 当中通过 `console` 入口打开需要的网址
* 通过网络代理, 指向开发环境

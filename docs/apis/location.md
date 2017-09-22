# 定位

## 获取饿了么app全局的 geohash 值

```javascript
hybridAPI.getGlobalGeohash()
.then(geohash => {
  // do you thing.
})
.catch(error => {
  // do you thing.
})
```

## 获取用户位置定位状态

``` js
// 返回定位状态 0. 尚未发起定位 1. 定位中 2. 定位成功 3. 定位失败
hybridAPI.getLocateStatus(status => {
  // do your things
})
```

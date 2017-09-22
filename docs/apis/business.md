# 业务相关

## 下单页 - 选择红包

``` js
hybridAPI.selectHongbao(hongbaosn) // hongbaosn为选中红包的SN，必传项
```

## 下单页 - 选择商家代金券

``` js
hybridAPI.selectCoupon(couponId) // 参数为代金券 id
```

## 新零售购物袋入口 icon 是否显示小红点

``` js
hybridAPI.shouldShowNewRetailRedBadge()
```

## 获取当前用户的 userId

``` js
hybridAPI.getUserID(id => {
  ...
})
```

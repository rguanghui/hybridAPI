``` js
/**
 * @param {Object} params app scheme 参数
 * @param {Number} params.merchantId 支付的 merchant id
 * @param {Number} params.merchantOrderNo 落单后的 order number
 * @param {String=} params.eventName app 回调时发送给 webView 的事件名
 * @param {Function} params.action 接收 app 回调的函数
 * action 可获得的参数：{ merchantId: 1, merchantOrderNo: 'xxx', status: 'success' || 'failed' }
 * @param {String=} params.x_shard 自定义的多活 x-shard 值
 */

hybridAPI.pay({
  merchantId: 'merchant id',
  merchantOrderNo: 'order number',
  xShard: 'the value of shard id',
  action(response) {
    let { status } = response
    if (status === 'success') {
      ...
    }
    if (status === 'failure') {
      ...
    }
    if (status === 'cancel') {
      ...
    }
  },
})
```

import { invokeMethod, compareVersion } from '../util'

/**
 * @param {Object} params app scheme 参数
 * @param {Number} params.merchantId 支付的 merchant id
 * @param {Number} params.merchantOrderNo 落单后的 order number
 * @param {String=} params.eventName app 回调时发送给 webView 的事件名
 * @param {Function} params.action 接收 app 回调的函数
 * action 可获得的参数：{ merchantId: 1, merchantOrderNo: 'xxx', status: 'success' || 'failed' }
 * @param {String=} params.x_shard 自定义的多活 header
 */
export default params => {
  let { eventName, action, merchantId, merchantOrderNo, xShard } = params
  eventName = eventName || 'NATIVE_PAY_CALLBACk'

  document.addEventListener(eventName, event => {
    const response = event.detail
    // App 给我们的格式不是驼峰，这里做下 hard code
    let callbackParams = {}
    callbackParams.merchantId = response.merchant_id
    callbackParams.merchantOrderNo = response.merchant_order_no
    callbackParams.status = response.status
    action(callbackParams)
  }, false)

  let paramString = `merchant_id=${merchantId}&merchant_order_no=${merchantOrderNo}&event_name=${eventName}`
  let returnURL = `eleme://web_pay_result?${paramString}&event_name=${eventName}`
  let schemeURL = `eleme://pay?${paramString}&return_url=${encodeURIComponent(returnURL)}`

  if (xShard) {
    schemeURL += `&x_shard=${xShard}`
  }

  location.href = schemeURL
}

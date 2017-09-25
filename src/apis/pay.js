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
const isBugVersion = () => {
  if (!/Android/i.test(userAgent)) {
    return false
  }
  const version = (userAgent.match(/Eleme\/([\d|\.]+)/i) || [])[1]

  return !version || version === '7.9' || version === '7.9.1'
}

export default params => {
  return new Promise((resolve, reject) => {
    if (!/eleme/i.test(navigator.userAgent) || compareVersion('7.8') || isBugVersion()) {
      reject({ name: 'NOT_SUPPORT' })
    }

    let { eventName, action, merchantId, merchantOrderNo, xShard } = params
    eventName = eventName || 'NATIVE_PAY_CALLBACk'

    const payEvent = event => {
      const response = event.detail
      // App 给我们的格式不是驼峰，这里做下 hard code
      let callbackParams = {}
      callbackParams.merchantId = response.merchant_id
      callbackParams.merchantOrderNo = response.merchant_order_no
      callbackParams.status = response.status
      if (response.status === 'success') {
        resolve(callbackParams)
      } else {
        // failure: 支付失败，意外退出
        // cancel: 支付过程中主动取消
        reject({ name: response.status.toUpperCase(), data: callbackParams })
      }
    }

    document.addEventListener(eventName, payEvent, false)

    let paramString = `merchant_id=${merchantId}&merchant_order_no=${merchantOrderNo}&event_name=${eventName}`
    let returnURL = `eleme://web_pay_result?${paramString}`
    let schemeURL = `eleme://pay?${paramString}&return_url=${encodeURIComponent(returnURL)}`

    if (xShard) {
      schemeURL += `&x_shard=${xShard}`
    }

    location.href = schemeURL
  })
}

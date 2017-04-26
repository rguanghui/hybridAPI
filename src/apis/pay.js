import { invokeMethod } from '../util'

/**
 * @param {Object} params app scheme 参数
 * @param {Number} params.merchant_id 支付的 merchant id
 * @param {Number} params.merchant_order_no 落单后的 order number
 * @param {String=} params.event_name app 回调时发送给 webView 的事件名
 * @param {Function} params.action 接收 app 回调的函数
 * action 可获得的参数：{ merchant_id: 1, merchant_order_no: 'xxx', status: 'success' || 'failed' }
 * @param {String=} params.x_shard 自定义的多活 header
 */
export default params => {
  params.event_name = params.event_name || 'NATIVE_PAY_CALLBACk'
  const { event_name, action } = params
  document.addEventListener(event_name, action, false)

  invokeMethod('pay', params)
}

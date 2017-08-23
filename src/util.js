import { legacy } from './env'

export const parseJSON = function(string) {
  try {
    return JSON.parse(string) || {}
  } catch (error) {
    return false
  }
}

export const toQueryString = function(object) {
  return Object.keys(object).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(object[key])
  }).join('&')
}

export const isFunction = value => {
  let tag = value instanceof Object ? Object.prototype.toString.call(value) : ''
  return tag === '[object Function]' || tag === '[object GeneratorFunction]'
}

export const compareVersion = (compare, beCompared) => {
  if (!beCompared) {
    beCompared = (window.navigator.userAgent.match(/Eleme\/([\d|\.]+)/i) || [])[1]
    if (!beCompared) return false
  }

  compare = compare.split('.')
  beCompared = beCompared.split('.')

  let result
  compare.forEach((compareItem, index) => {
    let beComparedItem = beCompared[index]
    if (typeof beComparedItem === 'undefined') beComparedItem = 0
    if (typeof result !== 'undefined') return

    let difference = Number(compareItem) - Number(beComparedItem)
    if (difference === 0) return
    result = difference > 0
  })
  return !!result
 }

export const invokeMethod = function(method, ...args) {
  let lastParam = args[args.length - 1]
  let reject
  if (lastParam && lastParam.isReject) {
    reject = args.pop()
  }
  let webViewJSBridge = window.WebViewJavascriptBridge
  const INJECTED_EVENT_NAME = legacy ? 'WebViewJavascriptBridgeInjectFinishedReady' : 'WebViewJavascriptBridgeReady'

  const doInvokeMethod = function() {
    webViewJSBridge = window.WebViewJavascriptBridge
    try { // Fix for Android 5.8.3
      webViewJSBridge.init()
    } catch(error) {
    }

    setTimeout(function() { // Fix for Android 5.10
      /**
       * Android 版本5.9以上的 EJsBridge 和 JsBridge 不能用赋值给局部变量，不要使用 ES6 中的 spread。
       */
      try { // Fix for Android 5.8.3
        if (window.EJsBridge && window.EJsBridge[method]) {
          window.EJsBridge[method].apply(window.EJsBridge, args)
        } else if (window.JsBridge && window.JsBridge[method]) {
          window.JsBridge[method].apply(window.JsBridge, args)
        } else if (webViewJSBridge) {
          webViewJSBridge.callHandler(method, ...args)
        }
      } catch(error) {
        if (reject) {
          reject(error)
        }
      }
    }, 0)
  }

  if (window.EJsBridge || window.JsBridge || webViewJSBridge) {
    doInvokeMethod()
  } else {
    document.addEventListener(INJECTED_EVENT_NAME, doInvokeMethod)
  }
}

export const invokeMethodWithError = function(method, reject, ...args) {
  reject.isReject = true
  invokeMethod(method, ...args, reject)
}

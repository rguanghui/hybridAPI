export const parseJSON = function(string) {
  try {
    return JSON.parse(string) || {};
  } catch (error) {
    return false;
  }
};

export const toQueryString = function(object) {
  return Object.keys(object).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
  }).join('&');
};

import { legacy } from './env';

export const invokeMethod = function(method, ...args) {
  let webViewJSBridge = window.WebViewJavascriptBridge;
  const INJECTED_EVENT_NAME = legacy ? 'WebViewJavascriptBridgeInjectFinishedReady' : 'WebViewJavascriptBridgeReady';

  const doInvokeMethod = function() {
    webViewJSBridge = window.WebViewJavascriptBridge;
    try { // Fix for Android 5.8.3
      webViewJSBridge.init();  
    } catch(e) {
    }
    setTimeout(function() { // Fix for Android 5.10
      /**
       * Android 版本5.9以上的 EJsBridge 和 JsBridge 不能用赋值给局部变量，不要使用 ES6 中的 spread。
       */
      try { // Fix for Android 5.8.3
        if (window.EJsBridge && window.EJsBridge[method]) {
          window.EJsBridge[method].apply(window.EJsBridge, args);
        } else if (window.JsBridge && window.JsBridge[method]) {
          window.JsBridge[method].apply(window.JsBridge, args);
        } else if (webViewJSBridge) {
          webViewJSBridge.callHandler(method, ...args);
        }  
      } catch(e) {
      }
    }, 0);
  };

  if (window.EJsBridge || window.JsBridge || webViewJSBridge) {
    doInvokeMethod();
  } else {
    document.addEventListener(INJECTED_EVENT_NAME, doInvokeMethod);
  }
};
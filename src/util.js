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
    webViewJSBridge.init();
    if (window.EJsBridge && window.EJsBridge[method]) {
      window.EJsBridge[method](...args);
    } else if (window.JsBridge && window.JsBridge[method]) {
      window.JsBridge[method](...args);
    } else if (webViewJSBridge) {
      webViewJSBridge.callHandler(method, ...args);
    }
  };

  if (window.EJsBridge || window.JsBridge || webViewJSBridge) {
    doInvokeMethod();
  } else {
    document.addEventListener(INJECTED_EVENT_NAME, doInvokeMethod);
  }
};
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.hybridAPI = factory());
}(this, function () { 'use strict';

  var userAgent = window.navigator.userAgent;

  var version = void 0;
  if (/rajax|eleme/i.test(userAgent)) {
    var matches = userAgent.match(/Eleme\/([0-9]+)\.([0-9]+)/i);
    version = Number(matches[1]) * 100 + Number(matches[2]);
  }

  var legacy = version < 509;

  var parseJSON = function parseJSON(string) {
    try {
      return JSON.parse(string) || {};
    } catch (error) {
      return false;
    }
  };

  var toQueryString = function toQueryString(object) {
    return Object.keys(object).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
    }).join('&');
  };

  var invokeMethod = function invokeMethod(method) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var webViewJSBridge = window.WebViewJavascriptBridge;
    var INJECTED_EVENT_NAME = legacy ? 'WebViewJavascriptBridgeInjectFinishedReady' : 'WebViewJavascriptBridgeReady';

    var doInvokeMethod = function doInvokeMethod() {
      webViewJSBridge = window.WebViewJavascriptBridge;
      try {
        // Fix for Android 5.8.3
        webViewJSBridge.init();
      } catch (e) {}
      setTimeout(function () {
        // Fix for Android 5.10
        /**
         * Android 版本5.9以上的 EJsBridge 和 JsBridge 不能用赋值给局部变量，不要使用 ES6 中的 spread。
         */
        try {
          // Fix for Android 5.8.3
          if (window.EJsBridge && window.EJsBridge[method]) {
            window.EJsBridge[method].apply(window.EJsBridge, args);
          } else if (window.JsBridge && window.JsBridge[method]) {
            window.JsBridge[method].apply(window.JsBridge, args);
          } else if (webViewJSBridge) {
            var _webViewJSBridge;

            (_webViewJSBridge = webViewJSBridge).callHandler.apply(_webViewJSBridge, [method].concat(args));
          }
        } catch (e) {}
      }, 0);
    };

    if (window.EJsBridge || window.JsBridge || webViewJSBridge) {
      doInvokeMethod();
    } else {
      document.addEventListener(INJECTED_EVENT_NAME, doInvokeMethod);
    }
  };

  var index = {
    getGlobalGeohash: function getGlobalGeohash(callback) {
      var args = legacy ? [''] : [];
      args.push(function (geohash) {
        callback(parseJSON(geohash) || geohash);
      });

      invokeMethod.apply(undefined, ['getGlobalGeohash'].concat(args));
    },
    share: function share(options) {
      if (!legacy) {
        document.head.insertAdjacentHTML('afterbegin', '<meta name="eleme-share">\n        <meta name="eleme-share:title" content="' + options.title + '">\n        <meta name="eleme-share:description" content="' + options.text + '">\n        <meta name="eleme-share:image" content="' + options.image_url + '">');
      } else {
        // 0: 微信 1: 微信朋友圈 2: 微博
        var SHARE_TYPES = ['0', '1', '2'];
        var params = SHARE_TYPES.map(function (value) {
          return 'eleme://share?' + toQueryString({
            type: value,
            title: options.title,
            text: value === '2' ? options.weibo || options.text : options.text,
            url: options.url,
            image_url: options.image_url
          });
        });

        invokeMethod('showShareButton', {
          'weixin_session': params[0],
          'weixin_timeline': params[1],
          'weibo': params[2]
        });
      }
    },
    selectHongbao: function selectHongbao(sn) {
      invokeMethod(legacy ? 'selectedHongbao' : 'selectHongbao', sn, legacy ? function () {} : null);
    }
  };

  return index;

}));
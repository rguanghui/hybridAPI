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

  var isFunction = function isFunction(value) {
    var tag = value instanceof Object ? Object.prototype.toString.call(value) : '';
    return tag === '[object Function]' || tag === '[object GeneratorFunction]';
  };

  var invokeMethod = function invokeMethod(method) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var lastParam = args[args.length - 1];
    var reject = void 0;
    if (lastParam && lastParam.isReject) {
      reject = args.pop();
    }
    var webViewJSBridge = window.WebViewJavascriptBridge;
    var INJECTED_EVENT_NAME = legacy ? 'WebViewJavascriptBridgeInjectFinishedReady' : 'WebViewJavascriptBridgeReady';

    var doInvokeMethod = function doInvokeMethod() {
      webViewJSBridge = window.WebViewJavascriptBridge;
      try {
        // Fix for Android 5.8.3
        webViewJSBridge.init();
      } catch (error) {}

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
        } catch (error) {
          if (reject) {
            reject(error);
          }
        }
      }, 0);
    };

    if (window.EJsBridge || window.JsBridge || webViewJSBridge) {
      doInvokeMethod();
    } else {
      document.addEventListener(INJECTED_EVENT_NAME, doInvokeMethod);
    }
  };

  var invokeMethodWithError = function invokeMethodWithError(method, reject) {
    reject.isReject = true;

    for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    invokeMethod.apply(undefined, [method].concat(args, [reject]));
  };

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var bridgeProtocol = createCommonjsModule(function (module, exports) {
  !function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.bridgeProtocol=e.bridgeProtocol||{})}(commonjsGlobal,function(e){"use strict";var n=function(){var e=navigator.userAgent||navigator.vendor;return/windows phone/i.test(e)?"Windows Phone":/android/i.test(e)?"Android":/iPad|iPhone|iPod/.test(e)&&!window.MSStream?"iOS":"Unknown"},t=function(e){var n=document.createEvent("Events");n.initEvent("WebViewJavascriptBridgeReady"),n.bridge=WebViewJavascriptBridge,document.dispatchEvent(n)},i={},r="elmscheme",a="__ELM_QUEUE_MESSAGE__",o="elemejsbridge",d="_handler",c="_interface",s=n(),l={},u=void 0,f=function(){u=document.createElement("iframe"),u.style.display="none","iOS"===s&&(u.src=r+"://"+a),document.documentElement.appendChild(u)},v=1,p=[],g=function(e,n,t){if(n){var d="cb_"+v++ +"_"+(new Date).getTime();i[d]=n,e.callbackId=d}p.push(e);var c=JSON.stringify(p);"iOS"===s?u.src=r+"://"+a:(u.src=o+"://return/"+t+"/"+encodeURIComponent(c),p=[])},h=function(){var e=JSON.stringify(p);return p=[],e},m=function(e,n){l[e]=n},w=function(e){return l[e]},E=function(e,n,t){g({handlerName:e,data:n},t,d)},b=function(e,n,t,i){var r={obj:e,method:n};"undefined"!=typeof t&&null!==t&&(r.data=t),g(r,i,c)},_="_response",y=function(e){var n=JSON.parse(e),t=void 0;if(n.responseId)t=i[n.responseId],"function"==typeof t&&t(n.responseData||n.data),delete i[n.responseId];else{if(n.callbackId){var r=n.callbackId;t=function(e){g({responseId:r,data:e},null,_)}}var a=WebViewJavascriptBridge._messageHandler;n.handlerName&&(a=w(n.handlerName));try{a(n.data,t)}catch(e){"undefined"!=typeof console&&console.log("WebViewJavascriptBridge: WARNING: javascript handler threw.",n,e)}}},J=[],S=function(e){J?J.push(e):y(e)},j=!1,I=function(e){if(j)throw new Error("WebViewJavascriptBridge.init called twice");if(WebViewJavascriptBridge._messageHandler=e,j=!0,J){for(var n=0;n<J.length;n++)y(J[n]);J=null}},O=function(e,n){var t=window[e]={},i=function(n){n=n.replace(new RegExp(":","g"),""),t[n]=function(){var t=arguments.length;if(t>2)throw new Error("arguments Error");var i=arguments[0]||null,r=arguments[1]||null;1===t&&"function"==typeof i&&(r=i,i=null),b(e,n,i,r)}};(n||[]).forEach(i)},W=function(){var e=document.createEvent("Events");e.initEvent("WebViewJavascriptBridgeInjectFinishedReady"),document.dispatchEvent(e)},N=function(){};document.addEventListener("DOMContentLoaded",function(){f(),t(N)}),N.init=I,N.inject=O,N.injectEvent=W,N.registerHandler=m,N.callHandler=E;var B=n();"iOS"===B?(N._fetchQueue=h,N._handleMessageFromObjC=S):"Android"===B?N._handleMessageFromNative=S:console.warn("Error: "+B+" is not supported."),window.WebViewJavascriptBridge=N,e.inject=O,e.registerHandler=m,e.callHandler=E,e.callObjectMethod=b});
  });

  // polyfill for window onload won't fire
  if (!legacy) {
    var METHODS = ['getGlobalGeohash', 'showShareButton', 'selectedHongbao', 'selectHongbao', 'selectCoupon', 'getLocateStatus', 'setTitle', 'closePage', 'getUserID'];
    bridgeProtocol.inject('EJsBridge', METHODS);
  }

  var index = {
    getGlobalGeohash: function getGlobalGeohash(callback) {
      var args = legacy ? [''] : [];

      if (isFunction(callback)) {
        args.push(function (geohash) {
          callback(parseJSON(geohash) || geohash);
        });

        invokeMethod.apply(undefined, ['getGlobalGeohash'].concat(args));
      } else {
        return new Promise(function (resolve, reject) {
          args.push(function (geohash) {
            resolve(parseJSON(geohash) || geohash);
          });

          try {
            invokeMethodWithError.apply(undefined, ['getGlobalGeohash', reject].concat(args));
          } catch (error) {
            reject(error);
          }
        });
      }
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
    },
    selectCoupon: function selectCoupon(id) {
      invokeMethod('selectCoupon', '' + id);
    },
    getLocateStatus: function getLocateStatus(callback) {
      if (isFunction(callback)) {
        invokeMethod('getLocateStatus', callback);
      } else {
        return new Promise(function (resolve, reject) {
          try {
            invokeMethodWithError('getLocateStatus', reject, function (status) {
              resolve(status);
            });
          } catch (error) {
            reject(error);
          }
        });
      }
    },
    setTitle: function setTitle(title) {
      invokeMethod('setTitle', title);
    },
    closePage: function closePage() {
      invokeMethod('closePage');
    },
    getUserID: function getUserID(callback) {
      if (isFunction(callback)) {
        invokeMethod('getUserID', callback);
      } else {
        return new Promise(function (resolve, reject) {
          try {
            invokeMethodWithError('getUserID', reject, function (userId) {
              resolve(userId);
            });
          } catch (error) {
            reject(error);
          }
        });
      }
    },
    sharePanel: function sharePanel(options) {
      var SHARE_TYPES = {
        'weixin': {
          key: 'weixin_session',
          value: 0
        },
        'weixin_timeline': {
          key: 'weixin_timeline',
          value: 1
        },
        'weibo': {
          key: 'weibo',
          value: 2
        },
        'qq': {
          key: 'qq_session',
          value: 4
        },
        'qzone': {
          key: 'qzone_session',
          value: 5
        }
      };
      var url = options.url + (~options.url.indexOf('#') || ~options.url.indexOf('?') ? '&' : '?');
      var param = options.targets.reduce(function (prev, item) {
        prev[SHARE_TYPES[item].key] = 'eleme://share?' + toQueryString({
          type: SHARE_TYPES[item].value,
          title: options.title,
          text: SHARE_TYPES[item].value === 2 ? options.title + ', ' + options.text + '。分享链接：' + url + 'type=' + item : options.text,
          url: url + 'type=' + item,
          image_url: options.image_url
        });
        return prev;
      }, {});
      location.href = 'eleme://sns_share?source=' + options.source + '&' + toQueryString(param);
    }
  };

  return index;

}));

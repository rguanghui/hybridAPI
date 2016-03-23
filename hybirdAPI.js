'use strict';
var hybirdAPI = new function() {
  var parse = function(text) {
    try {
      return JSON.parse(text) || {};
    } catch (error) {
      return false;
    }
  };

  var UserAgent = (function() {
    var UA = window.navigator.userAgent;
    var eleme = (UA.toLowerCase().match(/(iphone|android)/i) || [])[1];
    var UAarray = [];
    if (/rajax/i.test(UA)) {
      // UAarray = [Rajax: "1", Apple: "iPhone8,2", iPhone_OS: "9.2", Eleme: "5.5.1", ID: "0CC711B6-ADAD-4E67-8E84-4E2F04708F5F"];
      try {
        UA.split(';')[0].split(' ').forEach(function(item) {
          var key = item.split('/')[0];
          UAarray[key] = item.split('/')[1];
        });
      } catch (e) {
        console.log(e);
      }
    }
    return {
      app: eleme || null,
      appVersion: UAarray['Eleme'] || null
    }
  })();

  this.getGlobalGeohash = function(callback) {
    var done = function done(geohash) {
      var location = parse(geohash) || geohash;
      callback(location);
    };
    if (UserAgent.appVersion >= '5.9') {
      var _callback = function _callback() {
        window.WebViewJavascriptBridge.init();
        window.EJsBridge.getGlobalGeohash(function(geohash) {
          done(geohash);
        });
      };
      window.EJsBridge && _callback() || document.addEventListener('WebViewJavascriptBridgeInjectFinishedReady', _callback);
    } else {
      var _callback = function _callback() {
        window.WebViewJavascriptBridge.init();
        window.WebViewJavascriptBridge.callHandler('getGlobalGeohash', '', function(geohash) {
          done(geohash);
        });
      };
      window.WebViewJavascriptBridge && _callback() || document.addEventListener('WebViewJavascriptBridgeReady', _callback);
    }
  };

  this.share = function(param) {
    if (UserAgent.appVersion >= '5.9') {
      var meta = '<meta name="eleme-share">' +
      '<meta name="eleme-share:title" content="' + param.title + '">' +
      '<meta name="eleme-share:description" content="' + param.text + '">' +
      '<meta name="eleme-share:image" content="' + param.image_url + '">';
      document.head.insertAdjacentHTML('afterbegin', meta);
    } else {
      var serialize = function serialize(obj) {
        return Object.keys(obj).map(function(key) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }).join('&');
      };
      // 0: 微信
      // 1: 微信朋友圈
      // 2: 微博
      var params = ['0', '1', '2'].map(function(value) {
        return 'eleme://share?' + serialize({
          type: value,
          title: param.title,
          text: '' + (value == 2 ? param.weibo : param.text),
          url: param.url,
          image_url: param.image_url
        });
      });
      var shareinfo = {
        'weixin_session': params[0],
        'weixin_timeline': params[1],
        'weibo': params[2]
      };
      if (UserAgent.app === 'iphone') {
        var _callback = function _callback() {
          window.WebViewJavascriptBridge.callHandler('showShareButton', shareinfo);
        };
        window.WebViewJavascriptBridge && _callback() || document.addEventListener('WebViewJavascriptBridgeReady', _callback);
      } else if (UserAgent.app === 'android') {
        var _callback = function _callback() {
          window.JsBridge.showShareButton(shareinfo);
        }
        window.JsBridge && _callback() || document.addEventListener('WebViewJavascriptBridgeInjectFinishedReady', _callback);
      }
    }
  };

  this.selectHongbao = function(hongbaosn) {
    if (UserAgent.appVersion >= '5.9') {
      var _callback = function() {
        window.WebViewJavascriptBridge.init();
        window.EJsBridge.selectHongbao(hongbaosn);
      };
      window.EJsBridge && _callback() || document.addEventListener('WebViewJavascriptBridgeInjectFinishedReady', _callback);
    } else {
      var _callback = function() {
        window.WebViewJavascriptBridge.callHandler('selectedHongbao', hongbaosn, function() {});
      }
      window.WebViewJavascriptBridge && _callback() || document.addEventListener('WebViewJavascriptBridgeReady', _callback);
    }
  };
};

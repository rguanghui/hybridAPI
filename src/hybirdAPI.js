/**/ define('hybirdAPI', ['Geohash'], function (Geohash) {
"use strict";

var parse = text => {
  try {
    return JSON.parse(text) || {};
  } catch (error) {
    return {};
  }
};


var UserAgent = (function () {
  let UA = window.navigator.userAgent;
  let eleme = UA.toLowerCase().match(/(iphone|android)/i) && UA.toLowerCase().match(/(iphone|android)/i)[1];
  let UAarray = [];
  if (/rajax/i.test(UA)) {
    // UAarray = [Rajax: "1", Apple: "iPhone8,2", iPhone_OS: "9.2", Eleme: "5.5.1", ID: "0CC711B6-ADAD-4E67-8E84-4E2F04708F5F"];
    try {
      UA.split(';')[0].split(' ').forEach(item => {
        let [key, value] = item.split('/');
        UAarray[key] = value;
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

return new function () {

  var _this = this;

  this.getGlobalGeohash = function (callback) {
    var done = function (geohash) {
      let location;
      try {
        location = Geohash.decode(geohash);
      } catch (error) {
        // for android
        location = Geohash.decode(parse(geohash));
      }
      callback(location);
    };

    if (UserAgent.appVersion >= '5.9') {
      let callback = () => window.EJsBridge.getGlobalGeohash(geohash => done(geohash));
      window.EJsBridge && callback() || document.addEventListener('WebViewJavascriptBridgeInjectFinishedReady', callback);
    } else {
      let callback = () => {
        WebViewJavascriptBridge.init();
        WebViewJavascriptBridge.callHandler('getGlobalGeohash', '', geohash => done(geohash));
      }
      window.WebViewJavascriptBridge && callback() || document.addEventListener('WebViewJavascriptBridgeReady', callback);
    }
  };

  this.share = function (param) {
    if (UserAgent.appVersion >= '5.9') {
      let meta = `<meta name='eleme-share'>
      <meta name='eleme-share:title' content='${param.title}'>
      <meta name='eleme-share:description' content='${param.text}'>
      <meta name='eleme-share:image ' content='${param.image_url}'>`;
      document.head.insertAdjacentHTML('afterbegin', meta);
    } else {
      var serialize = obj => {
        return Object.keys(obj)
              .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
              .join('&');
      };
      // 0: 微信
      // 1: 微信朋友圈
      // 2: 微博
      var params = ['0', '1', '2'].map((value) => {
        return `eleme://share?` + serialize({
          type: value,
          title: param.title,
          text: `${value == 2 ? param.weibo : param.text}`,
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
        let callback = () => window.WebViewJavascriptBridge.callHandler('showShareButton', shareinfo);
        window.WebViewJavascriptBridge && callback() || document.addEventListener('WebViewJavascriptBridgeReady', callback);
      } else if (UserAgent.app === 'android') {
        let callback = () => window.JsBridge.showShareButton(shareinfo);
        window.JsBridge && callback() || document.addEventListener('WebViewJavascriptBridgeInjectFinishedReady', callback);
      }
    }
  };

  this.selecteHongbao = function (hongbaosn) {
    if (UserAgent.appVersion >= '5.9') {
      let callback = () => window.EJsBridge.selecteHongbao(hongbaosn);
      window.EJsBridge && callback() || document.addEventListener('WebViewJavascriptBridgeInjectFinishedReady', callback);

    } else {
      let callback = () => window.WebViewJavascriptBridge.callHandler('selectedHongbao', hongbaosn, () => {});
      window.WebViewJavascriptBridge && callback() || document.addEventListener('WebViewJavascriptBridgeReady', callback);

    }
  };

}();

/**/ });

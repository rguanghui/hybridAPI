import { legacy } from './env';
import { parseJSON, toQueryString, invokeMethod } from './util';

export default {
  getGlobalGeohash(callback) {
    const args = legacy ? [''] : [];
    args.push(function(geohash) {
      callback(parseJSON(geohash) || geohash);
    });

    invokeMethod('getGlobalGeohash', ...args);
  },

  share(options) {
    if (!legacy) {
      document.head.insertAdjacentHTML('afterbegin', `<meta name="eleme-share">
        <meta name="eleme-share:title" content="${options.title}">
        <meta name="eleme-share:description" content="${options.text}">
        <meta name="eleme-share:image" content="${options.image_url}">`);
    } else {
      // 0: 微信 1: 微信朋友圈 2: 微博
      const SHARE_TYPES = ['0', '1', '2'];
      const params = SHARE_TYPES.map(function(value) {
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

  selectHongbao(sn) {
    invokeMethod(legacy ? 'selectedHongbao' : 'selectHongbao', sn, legacy ? function() {} : null);
  }
}

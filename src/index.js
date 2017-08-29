import { legacy } from './env'
import {
  parseJSON,
  toQueryString,
  invokeMethod,
  isFunction,
  invokeMethodWithError
} from './util'
import * as bridgeProtocol from 'bridge-protocol'
import { setRightMenu, clearRightMenu } from './apis/menu'
import { hookBack, cancelHookBack } from './apis/back'
import pay from './apis/pay'
import getTopBarHeight from './apis/bar'
import contactList from './apis/contactList'

// polyfill for window onload won't fire
if (!legacy) {
  const METHODS = [
    'getGlobalGeohash',
    'showShareButton',
    'selectedHongbao',
    'selectHongbao',
    'selectCoupon',
    'getLocateStatus',
    'setTitle',
    'closePage',
    'getUserID',
    'showRightBarItems',
    'removeRightBarItems',
    'hookGoback',
    'setNavStyle',
    'shouldShowNewRetailRedBadge',
    'networkType',
    'exitConfirm',
    'checkPackages',
    'openPackage',
    'defaultHeightOfTopBar',
    'contactList'
  ]
  bridgeProtocol.inject('EJsBridge', METHODS)
}

const hybridAPI = {
  getGlobalGeohash(callback) {
    const args = legacy ? [''] : []

    if (isFunction(callback)) {
      args.push(geohash => {
        callback(parseJSON(geohash) || geohash)
      })

      invokeMethod('getGlobalGeohash', ...args)
    } else {
      return new Promise((resolve, reject) => {
        args.push(geohash => {
          resolve(parseJSON(geohash) || geohash)
        })

        try {
          invokeMethodWithError('getGlobalGeohash', reject, ...args)
        } catch(error) {
          reject(error)
        }
      })
    }
  },

  share(options) {
    if (!legacy) {
      document.head.insertAdjacentHTML('afterbegin', `<meta name="eleme-share">
        <meta name="eleme-share:title" content="${options.title}">
        <meta name="eleme-share:description" content="${options.text}">
        <meta name="eleme-share:image" content="${options.image_url}">`)
    } else {
      // 0: 微信 1: 微信朋友圈 2: 微博
      const SHARE_TYPES = ['0', '1', '2']
      const params = SHARE_TYPES.map(function(value) {
        return 'eleme://share?' + toQueryString({
            type: value,
            title: options.title,
            text: value === '2' ? options.weibo || options.text : options.text,
            url: options.url,
            image_url: options.image_url
          })
      })

      invokeMethod('showShareButton', {
        'weixin_session': params[0],
        'weixin_timeline': params[1],
        'weibo': params[2]
      })
    }
  },

  selectHongbao(sn) {
    invokeMethod(legacy ? 'selectedHongbao' : 'selectHongbao', sn, legacy ? function() {} : null)
  },

  selectCoupon(id) {
    invokeMethod('selectCoupon', '' + id)
  },

  getLocateStatus(callback) {
    if (isFunction(callback)) {
      invokeMethod('getLocateStatus', callback)
    } else {
      return new Promise((resolve, reject) => {
        try {
          invokeMethodWithError('getLocateStatus', reject, status => {
            resolve(status)
          })
        } catch(error) {
          reject(error)
        }
      })
    }
  },

  networkType(callback) {
    if (isFunction(callback)) {
      invokeMethod('networkType', callback);
    } else {
      return new Promise((resolve, reject) => {
        try {
          invokeMethodWithError('networkType', reject, status => {
            resulve(status);
          });
        } catch (error) {
          reject(error);
        }
      });
    }
  },

  setTitle(title) {
    invokeMethod('setTitle', title)
  },

  closePage() {
    invokeMethod('closePage')
  },

  exitConfirm(options) {
    invokeMethod('exitConfirm', options);
  },

  getUserID(callback) {
    if (isFunction(callback)) {
      invokeMethod('getUserID', callback)
    } else {
      return new Promise((resolve, reject) => {
        try {
          invokeMethodWithError('getUserID', reject, userId => {
            resolve(userId)
          })
        } catch(error) {
          reject(error)
        }
      })
    }
  },

  sharePanel(options) {
    const SHARE_TYPES = {
      'weixin': {
        key: 'weixin_session',
        value: 0,
      },
      'weixin_timeline': {
        key: 'weixin_timeline',
        value: 1,
      },
      'weibo': {
        key: 'weibo',
        value: 2,
      },
      'qq': {
        key: 'qq_session',
        value: 4,
      },
      'qzone': {
        key: 'qzone_session',
        value: 5,
      },
    }
    let url = options.url + ((~options.url.indexOf('#') || ~options.url.indexOf('?')) ? '&' : '?')
    let param = options.targets.reduce((prev, item) => {
      prev[SHARE_TYPES[item].key] = 'eleme://share?' + toQueryString({
        type: SHARE_TYPES[item].value,
        title: options.title,
        text: SHARE_TYPES[item].value === 2 ? `${options.title}, ${options.text}。分享链接：${url}type=${item}` : options.text,
        url: `${url}type=${item}`,
        image_url: options.image_url,
        image_only: options.image_only ? 1 : 0,
        media: options.media || '',
      })
      return prev
    }, {})
    location.href = `eleme://sns_share?source=${options.source}&${toQueryString(param)}`
  },

  checkPackages(options, callback) {
    if (isFunction(callback)) {
      invokeMethod('checkPackages', options, callback);
    } else {
      return new Promise((resolve, reject) => {
        try {
          invokeMethodWithError('checkPackages', options, reject, status => {
            resulve(status);
          });
        } catch (error) {
          reject(error);
        }
      });
    }
  },

  openPackage(packageName) {
    invokeMethod('openPackage', packageName);
  },

  setRightMenu,
  clearRightMenu,

  hookBack,
  cancelHookBack,

  setNavStyle({ navType, navColor, navTextColor }) {
    invokeMethod('setNavStyle', {
      navType: String(navType),
      navColor, navTextColor,
    });
  },

  shouldShowNewRetailRedBadge(callback) {
    if (isFunction(callback)) {
      invokeMethod('shouldShowNewRetailRedBadge', callback);
    } else {
      return new Promise((resolve, reject) => {
        try {
          invokeMethodWithError('shouldShowNewRetailRedBadge', reject, status => {
            resolve(status);
          });
        } catch(error) {
          reject(error);
        }
      });
    }
  },

  pay,

  getTopBarHeight,

  contactList,
}

hybridAPI.default = hybridAPI

export default hybridAPI

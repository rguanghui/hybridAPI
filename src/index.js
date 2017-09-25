import {
  toQueryString,
  invokeMethod,
} from './util'
import * as bridgeProtocol from 'bridge-protocol'
import { setRightMenu, clearRightMenu } from './apis/menu'
import { hookBack, cancelHookBack } from './apis/back'
import pay from './apis/pay'
import getTopBarHeight from './apis/bar'
import contactList from './apis/contactList'
import setNav from './apis/nav'
import sharePanel from './apis/sharePanel'

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
  'shouldShowNewRetailRedBadge',
  'networkType',
  'exitConfirm',
  'checkPackages',
  'openPackage',
  'defaultHeightOfTopBar',
  'contactList',
  'setImmersiveMode',
  'setLightStatusBar',
  'setNavBgColor',
  'setNavTextColor',
  'setTriggerHeight',
]
bridgeProtocol.inject('EJsBridge', METHODS)

const hybridAPI = {
  getGlobalGeohash() {
    return invokeMethod('getGlobalGeohash')
  },

  getLocateStatus() {
    return invokeMethod('getLocateStatus')
  },

  share(options) {
    document.head.insertAdjacentHTML('afterbegin', `
      <meta name="eleme-share">
      <meta name="eleme-share:title" content="${options.title}">
      <meta name="eleme-share:description" content="${options.text}">
      <meta name="eleme-share:image" content="${options.image_url}">`)
  },

  selectHongbao(sn) {
    return invokeMethod(selectHongbao, sn, null)
  },

  selectCoupon(id) {
    return invokeMethod('selectCoupon', String(id))
  },

  networkType() {
    return invokeMethod('networkType')
  },

  setTitle(title) {
    document.title = title
    return invokeMethod('setTitle', title)
  },

  closePage() {
    return invokeMethod('closePage')
  },

  exitConfirm(options) {
    return invokeMethod('exitConfirm', options)
  },

  getUserID(callback) {
    return invokeMethod('getUserID')
  },

  checkPackages(options) {
    return invokeMethod('checkPackages')
  },

  openPackage(packageName) {
    return invokeMethod('openPackage', packageName)
  },

  setRightMenu,
  clearRightMenu,

  hookBack,
  cancelHookBack,

  shouldShowNewRetailRedBadge() {
    return invokeMethod('shouldShowNewRetailRedBadge')
  },

  pay,

  getTopBarHeight,

  contactList,

  setNav,

  sharePanel,
}

export default hybridAPI

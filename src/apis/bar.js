import { isFunction, invokeMethod, invokeMethodWithError } from '../util'

const flexibleDPR = ~~document.querySelector('html').getAttribute('data-dpr') || 1
const deviceDPR = window.devicePixelRatio || 1
const computePixel = (px = 0) => ~~(px * flexibleDPR / deviceDPR)
const computeData = (data = {}) => ({
  status_bar: computePixel(data.status_bar),
  nav_bar: computePixel(data.nav_bar),
})

export default (callback) => {
  if (isFunction(callback)) {
    invokeMethod('defaultHeightOfTopBar', data => {
      callback(computeData(data))
    })
  } else {
    return new Promise((resolve, reject) => {
      try {
        invokeMethodWithError('defaultHeightOfTopBar', reject, data => {
          resolve(computeData(data))
        })
      } catch(error) {
        reject(error)
      }
    })
  }
}

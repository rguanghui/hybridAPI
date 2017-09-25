import { invokeMethod } from '../util'

const flexibleDPR = ~~document.querySelector('html').getAttribute('data-dpr') || 1
const deviceDPR = window.devicePixelRatio || 1
const computePixel = (px = 0) => ~~(px * flexibleDPR / deviceDPR)
const computeData = (data = {}) => ({
  status_bar: computePixel(data.status_bar),
  nav_bar: computePixel(data.nav_bar),
})

export default () => {
  return invokeMethod('defaultHeightOfTopBar')
  .then(computeData)
}

import { invokeMethod } from '../util'

const handleOption = option => {
  if (typeof option === 'string') {
    return { solid: option }
  }
  return option
}

export default ({ immersive, statusText, navBg, navText, triggerHeight }) => {
  if (immersive !== undefined) {
    invokeMethod('setImmersiveMode', immersive)
  }
  if (statusText !== undefined) {
    if (statusText === 'black') {
      statusText = { solid: false }
    } else if (statusText === 'white') {
      statusText = { solid: true }
    }
    invokeMethod('setLightStatusBar', statusText)
  }
  if (navBg !== undefined) {
    invokeMethod('setNavBgColor', handleOption(navBg))
  }
  if (navText !== undefined) {
    invokeMethod('setNavTextColor', handleOption(navText))
  }
  if (triggerHeight !== undefined) {
    invokeMethod('setTriggerHeight', triggerHeight)
  }

  return new Promise((resolve) => {
    resolve()
  })
}

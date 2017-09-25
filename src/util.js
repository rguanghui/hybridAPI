export const toQueryString = object => {
  return Object
    .keys(object)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
    .join('&')
}

export const compareVersion = (compare, beCompared) => {
  if (!beCompared) {
    beCompared = (window.navigator.userAgent.match(/Eleme\/([\d|\.]+)/i) || [])[1]
    if (!beCompared) return false
  }

  compare = compare.split('.')
  beCompared = beCompared.split('.')

  let result
  compare.forEach((compareItem, index) => {
    let beComparedItem = beCompared[index]
    if (typeof beComparedItem === 'undefined') beComparedItem = 0
    if (typeof result !== 'undefined') return

    let difference = Number(compareItem) - Number(beComparedItem)
    if (difference === 0) return
    result = difference > 0
  })
  return !!result
 }

export const invokeMethod = (method, data) => {
  return new Promise((resolve, reject) => {
    let args = [data, resolve]
    window.EJsBridge[method].apply(window.EJsBridge, args)
  })
}

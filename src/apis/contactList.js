import { invokeMethod } from '../util'

export default count => {
  return new Promise((resolve, reject) => {
    if (/Android/i.test(navigator.userAgent)) {
      return reject({ name: 'NOT_SUPPORT' })
    }
    invokeMethod('contactList', count)
    .then(response => {
      if (typeof response === 'string') {
        reject({ name: 'PERMISSION_DENIED', data: response })
      } else {
        resolve(response)
      }
    })
  })
}

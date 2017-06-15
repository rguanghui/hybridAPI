import { isFunction, invokeMethod, invokeMethodWithError } from '../util'

export default (count, callback) => {
  if (isFunction(callback)) {
    invokeMethod('contactList', count, data => {
      callback(data)
    })
  } else {
    return new Promise((resolve, reject) => {
      try {
        invokeMethodWithError('contactList', reject, count, data => {
          resolve(data)
        })
      } catch(error) {
        reject(error)
      }
    })
  }
}

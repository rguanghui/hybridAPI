import { invokeMethod } from '../util'

const events = Object.create(null)
const listener = (type, name) => {
  document[`${type}EventListener`](name, events[name], false)
}

export const hookBack = ({ eventName, action }) => {
  if (typeof action !== 'function') return
  if (typeof events[eventName] === 'function') {
    listener('remove', eventName)
  }

  events[eventName] = event => {
    setTimeout(() => {
      action(event && event.detail)
    }, 0)
  }
  listener('add', eventName)

  return invokeMethod('hookGoback', eventName)
}

export const cancelHookBack = () => {
  Object.keys(events).forEach(eventName => {
    listener('remove', eventName)
    delete events[eventName]
  })

  return invokeMethod('hookGoback', null)
}

import { invokeMethod } from '../util'

const events = Object.create(null)
const listener = (type, name) => {
  document[`${type}EventListener`](name, events[name], false)
}

export const hookBack = ({ eventName, action }) => {
  if (typeof events[eventName] === 'function') {
    listener('remove', eventName)
  }

  events[eventName] = event => {
    setTimeout(() => {
      action(event.detail)
    }, 0)
  }
  listener('add', eventName)

  invokeMethod('hookGoback', eventName)
}

export const cancelHookBack = () => {
  invokeMethod('hookGoback', null)

  Object.keys(events).forEach(eventName => {
    listener('remove', eventName)
    delete events[eventName]
  })
}

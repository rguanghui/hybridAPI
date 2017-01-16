import { invokeMethod } from './util'

const events = Object.create(null)
const listener = (type, name) => {
  document[`${type}EventListener`](name, events[name], false)
}

// [{ text, eventName, action }]
export const setRightMenu = items => {
  const params = []

  items.forEach(item => {
    const eventName = item.eventName
    const eventHandle = () => {
      setTimeout(item.action, 0)
    }

    if (typeof events[eventName] === 'function') {
      listener('remove', eventName)
    }

    events[eventName] = eventHandle
    listener('add', eventName)

    params.push({ title: item.text, eventName })
  })

  invokeMethod('showRightBarItems', params)
}

export const clearRightMenu = () => {
  invokeMethod('removeRightBarItems')

  Object.keys(events).forEach(eventName => {
    listener('remove', eventName)
    delete events[eventName]
  })
}

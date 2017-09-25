import { invokeMethod } from '../util'

const events = Object.create(null)
const listener = (type, name) => {
  document[`${type}EventListener`](name, events[name], false)
}

// [{ text, eventName, action, iconHash, overflow }]
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

    params.push({
      title: item.text,
      iconHash: item.iconHash,
      overflow: !!item.overflow,
      eventName,
    })
  })

  return invokeMethod('showRightBarItems', params)
}

export const clearRightMenu = () => {
  Object.keys(events).forEach(eventName => {
    listener('remove', eventName)
    delete events[eventName]
  })

  return invokeMethod('removeRightBarItems')
}

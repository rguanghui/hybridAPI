import { toQueryString } from '../util'

export default options => {
  const SHARE_TYPES = {
    'weixin': { key: 'weixin_session', value: 0 },
    'weixin_timeline': { key: 'weixin_timeline', value: 1 },
    'weibo': { key: 'weibo', value: 2 },
    'qq': { key: 'qq_session', value: 4 },
    'qzone': { key: 'qzone_session', value: 5 },
  }
  const defaultConfig = {
    source: '',
    title: '饿了么',
    text: '',
    url: location.href,
    media: '',
    targets: Object.keys(SHARE_TYPES)
  }
  options = Object.assign(defaultConfig, options)
  let url = options.url + (/\?|#/.test(options.url) ? '&' : '?')
  let param = options.targets.reduce((prev, item) => {
    prev[SHARE_TYPES[item].key] = 'eleme://share?' + toQueryString({
      type: SHARE_TYPES[item].value,
      title: options.title,
      text: SHARE_TYPES[item].value === 2 ? `${options.title}, ${options.text}。分享链接：${url}type=${item}` : options.text,
      url: `${url}type=${item}`,
      image_url: options.image_url,
      image_only: options.image_only ? 1 : 0,
      media: options.media,
    })
    return prev
  }, {})
  location.href = `eleme://sns_share?source=${options.source}&${toQueryString(param)}`
  return new Promise((resolve) => {
    resolve()
  })
}

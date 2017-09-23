# setNav 动态设置导航栏样式

> 支持 7.18 及以后版本

```JS
/**
  colorString: '#RRGGBB' 或 '#AARRGGBB' 或 '#RRGGBB,#AARRGGBB' (表示渐变)
  colorOption: {
   from: colorString,  // 起始颜色，即滚动高度小于 triggerHeight 时的颜色
   to: colorString,    // 终止颜色，即滚动高度大于 triggerHeight 时的颜色
   solid: colorString, // 恒定颜色，`solid` 和 `from/to` 选其一
   direction: 0,       // 0: 从左到右渐变, 1: 从上到下渐变 (方向对文字颜色无效)
  }
 */

  // 以下参数都是可选的，不指定(undefined)即为不改变
  hybridAPI.setNav({
    // 是否沉浸。注意：沉浸后导航栏底下的 webview 不可点击。
    immersive: true,

    // 这个滚动高度为分界线，在这以上取 `from` 颜色，以下取 `to` 颜色。
    triggerHeight: 100,

    // 系统状态栏文字颜色，可选值： 'black', 'white', 或下例对象
    statusText: {
     from: true, // true 为白色，false 为黑色
     to: false,  // true 为白色，false 为黑色
    },

    // 导航栏背景色
    navBg: colorString || colorOption,

    // 导航栏文字颜色
    navTextColor: colorString || colorOption,
  })
```

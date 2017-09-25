# 原生能力的扩展

## 获取当前网络状态
``` javascript
hybridAPI.networkType()
.then(status => {
  // Return [String] 'WIFI'/'4G'/'3G'/'2G'/'UNKNOWN'
})
```

## 获取指定数量的通讯录记录
``` javascript
hybridAPI.contactList(number)
.then(list => {
  // Return: [Object]
  // {
  //  '莉莉': ['18888888888', '17777777777'],
  //  'sofish': ['16666666666']
  // }
})
.catch(({ name, data }) => {
  // name: catch 状态
  // data: app 抛出的数据
})
```

## 查询应用是否安装（Android Only）
``` javascript
// packages [Array] 要查询应用的包名列表
hybridAPI.checkPackages(packages)
.then(response => {
  ...
})
.catch(() => {})
```

## 打开指定应用（Android Only）
``` javascript
// packageName [String] 要打开的应用包名
hybridAPI.openPackage(packageName)
```

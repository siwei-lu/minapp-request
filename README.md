# minapp-request

封装 `wx.request`，使用中间件处理请求，更好用的小程序网络请求库。

## 如何使用

1. 打开微信开发者工具中的 `使用 npm 模块` 选项

2. 安装 `minapp-request`

    ```sh
    npm install minapp-request
    ```

3. 构建

    选中微信开发者工具 `工具` - `构建 npm`

4. 在代码中引入

    ```javascript
    import Request from 'minapp-request'

    const request = new Request()
    request.get('path/to/api').then(...)
    request.post('path/to/api', data).then(...)
    request.put('path/to/api', data).then(...)
    request.delete('path/to/api', data).then(...)
    request.upload('path/to/api', path).then(...)
    request.download('path/to/api').then(...)
    request.before(middleware).after(middleware).get('path/to/api').then(...)
    ```

## 版本记录

### v0.0.1

Feats:

- 完成基本功能

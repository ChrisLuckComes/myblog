### DevServer

前面都只是让 webpack 正常运行起来了，但实际开发中

- 1.提供 http 服务而不是使用本地文件预览
- 2.监听文件的变化并自动刷新网页，实时预览
- 3.支持 Source Map，以方便调试

Webpack 原生支持第 2、3 点，再结合官方提供的[DevServer](https://webpack.js.org/configuration/dev-server/)就能做到第 1 点。DevServer 启动一个 http 服务器，并接受 webpack 发出的文件变更信号，通过 websocket 协议自动刷新网页做到实时预览。

安装 DevServer
`cnpm i -D webpack-dev-server webpack-cli`
输出如下代表成功

```
$ webpack-dev-server
i ｢wds｣: Project is running at http://localhost:8080/
i ｢wds｣: webpack output is served from /
i ｢wds｣: Content not from webpack is served from I:\helloWebpack
i ｢wdm｣: Hash: 5f1f92e4f784e6b9baa4
Version: webpack 4.40.2
Time: 597ms
Built at: 2019-09-21 22:03:02
                  Asset      Size  Chunks                         Chunk Names
./css/main_51196976.css  26 bytes    main  [emitted] [immutable]  main
              bundle.js   365 KiB    main  [emitted]              main
Entrypoint main = ./css/main_51196976.css bundle.js
```

通过 http://localhost:8080/ 就可以访问到 index.html。但是进入之后发现一片空白并且 bundle.js 还报 404，没有文件输出到 dist 目录。原因是因为 DevServer 把 webpack 构建出的文件保存在内存中，在访问要输出的文件时，必须通过 http 访问。要获取 bundle.js 正确路径应该是在 server 根目录下，对应的 html 应该改为

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="main.css" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

启动 webpack 时，可在 package.json 里配置快捷命令，使用 vue 开发的同学是不是非常熟悉？

```json
{
  "scripts": {
    "dev": "webpack-dev-server --hot",
    "build": "webpack"
  },
  "devDependencies": {
    "css-loader": "^3.2.0",
    "extract-text-webpack-plugin": "^3.0.2",
    "mini-css-extract-plugin": "^0.8.0",
    "style-loader": "^1.0.0",
    "webpack": "^4.40.2",
    "webpack-cli": "^3.3.9",
    "webpack-dev-server": "^3.8.1"
  }
}
```

以后使用 npm run dev 就可以开启热替换模式启动 devServer

如果需要 debug 代码，需要加上 source map

```js
module.exports = {
  //...
  devtool: "source-map"
};
```

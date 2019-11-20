# 在 VS Code 中调试 Vue

# 1.第一步，安装 Chrome 浏览器，VS Code，Debugger for chrome 插件

![Debugger](https://images2018.cnblogs.com/blog/616891/201808/616891-20180824164305825-858251458.png)

# 2.配置 launch.json

点击在 Activity Bar 里的 Debugger 图标来到 Debug 视图，然后点击那个齿轮图标来配置一个 launch.json 的文件，内容如下。其中 webRoot 以源码实际目录为准，url 以实际 url 为准,sourceMap 是为了准确定位断点
这里选择了 attach 方式，也可以选择 launch 方式。选择 attach 方式还需要配置谷歌浏览器

Windows
右键点击 Chrome 的快捷方式图标，选择属性
在目标一栏，最后加上 --remote-debugging-port=9222，注意要用空格隔开

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "attach",
      "port": 9222,
      "name": "vuejs: chrome",
      "url": "http://localhost:8080/data/dashBoard",
      "webRoot": "${workspaceFolder}/web/src",
      "sourceMaps": true,
      "sourceMapPathOverrides": {
        "webpack:///./src/*": "${webRoot}/*"
      }
    }
  ]
}
```

# 3.配置 devTool 属性

vue-cli2: config/index.js

```js
devtool: 'eval-source-map',
```

vue-cli3

```js
module.exports = {
  configureWebpack: {
    devtool: "eval-source-map"
  }
};
```

# 4.启动

启动之后，在你想要打断点的地方打断点就可以啦

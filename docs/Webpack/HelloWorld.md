### Webpack

[Webpack](https://webpack.js.org/)是一个打包模块化 JavaScript 的工具，在 Webpack 里所有文件都是模块，当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。。官网首页图：
![Webpack](http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/img/1-2webpack.png)

## 核心概念

- 入口 entry
- 输出 output
- loader
- plugins

# 入口 entry

**入口起点（entry point）**指示 webpack 应该使用哪个模块，进入入口起点后，webpack 会找出有哪些模块和库是入口起点依赖的，处理完最后输出到*bundles*的文件中。可以在配置中配置`entry`属性，来指定一个或多个入口，默认值为`./src`

# 出口 output

**output**属性告诉 webpack 在哪里输出*bundles*，以及如何命名这些文件，默认值为`./dist`。基本上，整个程序结构都会被编译到你指定的输出路径的文件夹中。

# loader

loader 可以将所有类型文件转换为 webpack 能够处理的模块。

1. `test`属性，标识出哪些文件要被对应的 loader 转换
2. `use`属性，表示应该使用哪个 loader

# 插件 plugins
loader用于转换某种类型的module，而插件可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种任务。

想要使用一个插件，使用`require()`函数引入，添加到`plugins`数组中。可以在配置文件中多次使用同一个插件。

# 模式

通过选择`development`和`production`中的一个，来设置`mode`，启用相应模式下的内置优化。

以下是最基本的 webpack 使用方式
首先安装 webpack

```
cnpm i -g webpack
```

然后安装 webpack-cli(Webpack4 以及将命令行相关内容都迁移到 webpack-cli 中)

```shell
cnpm i -g webpack-cli
```

完成后创建一个 hello world 项目

页面入口`index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./dist/bundle.js"></script>
  </body>
</html>
```

js `show.js`

```js
function show(content) {
  window.document.getElementById("app").innerText = "Hello," + content;
}

module.exports = show;
```

执行入口文件`app.js`

```
let show = require("./show");

show("Webpack");

```

webpack 配置文件 `webpack.config.js`

```js
const path = require("path");

module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  }
};
```

执行 webpack，完成，生成 dist 目录和 bundle.js。此时在浏览器中打开 index.html，显示 Hello,Webpack。代码仓库如下

[demo](https://github.com/ChrisLuckComes/helloWebpack)

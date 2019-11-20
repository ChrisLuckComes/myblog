### Loader

## 介绍

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS 文件！

## 实践

接 Hello world，给页面添加一点样式。

`main.css`

```css
#app {
  color: red;
}
```

然后在 app.js 里引入

```
require('./main.css')
```

执行 webpack 报错如下

```js
ERROR in ./main.css 1:0
Module parse failed: Unexpected character '#' (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> #app{
|     color: red;
| }
 @ ./app.js 1:0-21
```

提示需要正确的 Loader 处理 main.css 文件，webpack 处理 JS 以外的文件需要使用 Loader 机制。这里要处理 CSS，我们要先安装[css-loader](https://github.com/webpack-contrib/css-loader)来读取 css 文件，再交给[style-loader](https://github.com/webpack-contrib/style-loader)来把 CSS 内容注入到 JS 里。

`cnpm i -D style-loader css-loader`

安装完成后，webpack.config.js 配置如下

```js
const path = require("path");

module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/, //用正则匹配CSS文件
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
```

- use 的值是由 loader 组成的数组，执行顺序由后到前
- 每一个 loader 可以通过 URL querystring 方式传参数，例如 css-loader?minimize 意思是要开启 css 压缩，也可写成

```js
{loader:'css-loader',options:{minimize:true}}
```

再执行命令，样式生效。bundle.js 发生变化，可以看到 css 被写入了。
使用浏览器 F12->Elements 页
可以看到 head 里插入了

```html
<style>
  #app {
    color: red;
  }
</style>
```

```js
function(t, e, n) {
    (t.exports = n(3)(!1)).push([t.i, "#app{\r\n    color: red;\r\n}", ""])
}
```

那么如何单独输出 css 文件呢？下节使用 Plugin 将会介绍。

## 编写一个 loader

# 准则 guidelines

- 简单易用。
- 使用链式传递。
- 模块化的输出。
- 确保无状态。
- 使用 loader utilities。
- 记录 loader 的依赖。
- 解析模块依赖关系。
- 提取通用代码。
- 避免绝对路径。
- 使用 peer dependencies。

**loader.js**

```js
let getOptions = require("loader-utils").getOptions;

/**
 * @todo 处理.txt文件，将任何实例中的[name]直接替换为loader选项中设置的name
 * @param {*} source 文本内容
 */
module.exports = function loader(source) {
  const options = getOptions(this);
  source = source.replace(/\[name\]/g, options.name);
  console.log(source);
  return `export default ${JSON.stringify(source)}`;
};
```

用这个 loader 处理以下文件

**1.txt**

```txt
Hey [name]!
```

```js
require("./main.css");
import content from "./1.txt";
import show from "./show.js";

show(content);
```

**.babelrc**

```json
{
  "presets": ["@babel/preset-env"]
}
```

**webpack.config.js**

```js
const path = require("path");
const CssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/, //用正则匹配CSS文件
        use: [CssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.txt$/,
        use: {
          loader: path.resolve(__dirname, "loader.js"),
          options: {
            name: "罗运来"
          }
        }
      }
    ]
  },
  plugins: [
    new CssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    })
  ],
  devServer: {
    open: true
  },
  devtool: "source-map"
};
```

最后页面显示 Hello,Hey 罗运来!

[demo](https://github.com/ChrisLuckComes/helloWebpack)

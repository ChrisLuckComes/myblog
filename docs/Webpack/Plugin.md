### Plugin

插件是 webpack 的支柱功能，webpack 自身也是构建在插件系统之上。插件的目的在于解决 loader 无法解决的其他事。

## 使用 plugin 单独提取 css

实现把 css 文件提取到单独的文件中，先安装
`cnpm i -D mini-css-extract-plugin`

`webpack.config.js`

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
        test: /\.css$/, //用正则匹配CSS文件
        use: [CssExtractPlugin.loader, "css-loader"]
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
  }
};
```

执行 webpack，dist 目录下出现 css 文件夹和 main_c1f5ed6c.css，bundle.js 里也没有 css 代码了，再把 css 文件引入到 html 里就 OK 了。

webpack 通过`plugins`属性来配置需要使用的插件列表，plugins 是一个数组，里面每一项都是插件的一个实例，在实例化组件时可以通过构造函数传入这个组件支持的配置。

例如`mini-css-extract-plugin`支持配置 filename，contenthash:8 代表根据文件内容 8 位 hash。

## 创建插件

- 一个 JavaScript 命名函数
- 在插件函数的 prototype 上定义一个 apply 方法
- 指定一个绑定到 webpack 自身的 event hook
- 处理 webpack 内部实例的特定数据
- 功能完成后调用 webpack 提供的回调

  `examplePlugin.js`

```js
function MyExampleWebpackPlugin() {}
// 在插件函数的 prototype 上定义一个 `apply` 方法。
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
  // 指定一个挂载到 webpack 自身的事件钩子。
  compiler.plugin("done", function() {
    console.log("this is an example plugin");
  });
};

module.exports = MyExampleWebpackPlugin;
```

`webpack.config.js`

```js
let ExamplePlugin = require("./examplePlugin");
module.exports = {
  ...,
  plugins:[new ExamplePlugin()]
}
```

执行 webback，打印出 this is an example plugin

## Compiler 和 Compilation

在插件开发中最重要的两个资源就是`compiler`和`compilation`对象。

- [compiler](https://github.com/webpack/webpack/blob/master/lib/Compiler.js)代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用，可以使用它来访问 webpack 的主环境。
- [compilation](https://github.com/webpack/webpack/blob/master/lib/Compilation.js)对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到文件变化，就会创建一个新的 compilation，生成一组新的编译资源。一个`compilation`对象表现了当前的模块资源、编译生成资源、变化的文件以及被跟踪依赖的状态信息，还提供了很多关键时机的回调。

## 访问 compilation 对象

`examplePlugin.js`

```js
compiler.plugin("compilation", function(compilation) {
  // 优化hook
  compilation.plugin("optimize", function() {
    console.log("Assets are being optimized");
  });
});
```

## 示例

生成一个文件`fileList.md` 内容是所有构件生成文件的列表
`fileListPlugin.js`

```js
function FileListPlugin() {}

FileListPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", (compilation, callback) => {
    let filelist = "文件列表：\n";
    //遍历资源列表，写文件
    for (let filename in compilation.assets) {
      filelist += `- ${filename}+\n`;
    }
    //将列表作为新的文件资源
    compilation.assets["filelist.md"] = {
      source: () => filelist,
      size: () => filelist.length
    };
    callback();
  });
};

module.exports = FileListPlugin;
```

`webpack.config.js`

```js
let ExamplePlugin = require("./fileListPlugin");
module.exports = {
  ...,
  plugins:[new FileListPlugin()]
}
```

## 插件的不同类型

webpack 插件可以按照它所注册的事件分成不同的类型。每一个事件钩子决定了它该如何应用插件的注册。

- **同步(synchronous)** Tapable 实例应用插件时会使用：
  applyPlugins(name: string, args: any...)

applyPluginsBailResult(name: string, args: any...)

这意味着每个插件回调，都会被特定的 args 一个接一个地调用。 这是插件的最基本形式。许多有用的事件（例如 "compile", "this-compilation"），预期插件会同步执行。

- **瀑布流(waterfall)** 插件应用时会使用：
  applyPluginsWaterfall(name: string, init: any, args: any...)

这种类型，每个插件都在其他插件依次调用之后调用，前一个插件调用的返回值，作为参数传入后一个插件。这类插件必须考虑其执行顺序。 必须等前一个插件执行后，才能接收参数。第一个插件的值是初始值(init)。这个模式用在与 webpack 模板相关的 Tapable 实例中（例如 ModuleTemplate, ChunkTemplate 等）。

- **异步(asynchronous)** When all the plugins are applied asynchronously using
  applyPluginsAsync(name: string, args: any..., callback: (err?: Error) -> void)

这种类型，插件处理函数在调用时，会传入所有的参数和一个签名为 (err?: Error) -> void 的回调函数。处理函数按注册时的顺序调用。在调用完所有处理程序后，才会调用 callback。 这也是 "emit", "run" 等事件的常用模式。

- **异步瀑布流(async waterfall)** 插件将以瀑布方式异步应用。
  applyPluginsAsyncWaterfall(name: string, init: any, callback: (err: Error, result: any) -> void)

这种类型，插件处理函数在调用时，会传入当前值(current value)和一个带有签名为 (err: Error, nextValue: any) -> void. 的回调函数。当调用的 nextValue 是下一个处理函数的当前值(current value)时，第一个处理程序的当前值是 init。在调用完所有处理函数之后，才会调用 callback，并将最后一个值传入。如果其中任何一个处理函数传入一个 err 值，则会调用此 callback 并将此 error 对象传入，并且不再调用其他处理函数。 这种插件模式适用于像 "before-resolve" 和 "after-resolve" 这样的事件。

- **异步串联(async series)** 它与异步(asynchronous)相同，但如果任何插件注册失败，则不再调用其他插件。
  applyPluginsAsyncSeries(name: string, args: any..., callback: (err: Error, result: any) -> void)

- **并行(parallel)**

applyPluginsParallel(name: string, args: any..., callback: (err?: Error) -> void)

applyPluginsParallelBailResult(name: string, args: any..., callback: (err: Error, result: any) -> void)

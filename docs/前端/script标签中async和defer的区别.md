# script 标签中 async 和 defer 的区别

顾名思义，async 是异步，defer 是延迟
以下内容摘自 js 高程

> async: 可选。表示应该立即下载脚本，但不应妨碍页面其他操作。<br>
> defer: 可选。表示脚本可以延迟到文档完全被解析和显示之后执行。

他俩的区别主要在于：

- async 是 script 下载完立即执行，defer 是延迟到遇到`</html>`才执行。
- async 不保证按照指定的先后顺序运行，而 defer 会按照出现顺序执行（现实中不一定,所以最好只包含一个 defer 脚本）。

![async,defer](https://segmentfault.com/img/bVWhRl?w=801&h=814)

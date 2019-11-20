# XSS (Cross Site Scripting)攻击

> 攻击者利用 Web 应用的漏洞或缺陷，向页面注入恶意的程序或代码攻击站点。
> 如果页面在加载过程中执行了意料之外的程序或代码（js,css），可以认为受到了 CSS 攻击。

## XSS 危害

- 盗取 cookie(`document cookie`)
- 使用 js 或 css 破坏页面正常结构与样式
- 流量劫持(`window.location.href`定位到其他页面)
- 利用 iframe,ajax 或 Flash 等方式，以用户的身份执行操作，并且还可以进一步的进行[CSRF](https://baike.baidu.com/item/CSRF/2735433?fr=aladdin)攻击
- 获取并操作页面敏感数据

## 类型

![xss类型](http://blog.nsfocus.net/wp-content/uploads/2017/09/3b58430793944a738ffaf20e4a0a1aed.png)

## DOM(Document Object Model)简介

1. DOM 概念
   Dom 一种以树形方式展示页面元素的方法，可以被 Js 操作。
2. 常用 Dom 方法
   ![dom方法](http://blog.nsfocus.net/wp-content/uploads/2017/09/8822e4f04ae50d78c321295a8574802d.png)
3. 四个重要的 DOM 属性

   `nodeName` 规定节点名称。 - 只读 - 元素节点的 nodeName 和标签名相同 - 属性节点的 nodeName 和属性名相同 - 文本节点的 nodeName 始终是#text - 文档节点的 nodeName 始终是 document
   `nodeValue` 规定节点的值 - 元素节点的 nodeValue 是 undefined 或 null - 文本节点的 nodeValue 是文本本身 - 属性节点的 nodeValue 是属性值
   `nodeType` 返回节点的类型 - 只读
   `innerHTML` 获取元素内容 - 可读可写，被引用次数最多，也最容易产生安全问题。

4. 输入一般在哪

   `Location`对象属性
   ![location](http://blog.nsfocus.net/wp-content/uploads/2017/09/0e1665fdd991958bb232d36444f9b191.png)

## XSS 攻击类型

1. 反射型 XSS

### 前端 URL 参数解析

    会被攻击的代码

    ```js
    var data = eval("(" + getUrlParams("data") + ")");
    ```

    举个例子：正常页面连接
    `http://xss-example.com/index.html?data={}`

    攻击者包装后的链接

    `http://xss-example.com/index.html?data={alert(document.cookie)}`

    实际情况下不会这么明显，经过编码后的链接

    `http://xss-example.com/index.html?data=\u0061\u006c\u0065\u0072\u0074(1)`

    解析 URL 参数不用 eval 可以避免上述攻击，下面的代码不用 eval 也不安全，获取 url 参数并且放在 a 标签的 href 里

    ```js
    var _href = getUrlParams("url");
    $("a").attr("href", _href);
    ```

    此功能就会被攻击

    `http://xss-example.com/index.html?url=javascript:eval(alert(document.cookie))`

    编码之后的结果

    `http://xss-example.com/index.html?url=javascript:\u0065\u0076\u0061\u006c(\u0061\u006c\u0065\u0072\u0074(document.cookie))`

### 后端 URL 参数解析

    一个get请求

    `http://xss-example.com/index.html?name=<script>alert(document.cookie)</script>`

    如果后端不做处理的结果也是被盗取cookie

2. 存储型攻击

   注入型攻击常见的地方就是含有表单提交的地方。例如一个`textarea`，前端输入值不做处理直接提交，然后后端写入数据库，前端再次查询原样展示攻击代码的时候页面就发生了存储型攻击

XSS 攻击流程：首先分析程序寻找漏洞，然后构建攻击代码，例如`<script>`标签，代码注入成功后，再寻找输出点就完成了。

## 如何规避 xss 攻击

简单的通过正则表达式判断 html 标记是不够的，因为输入点的情况变化多样，对 html 标记的限制也会降低产品可用性，再者这种判断会被关键字中加入空格、制表符以及其他 HTML 编码躲避。

控制好输入输出就可以规避 xss

- 对输入内容的特定字符进行编码，例如<>符号
- 对重要的 cookie 设置 httpOnly，防止通过`document.cookie`读取
- 将不可信的值输入 url 参数之前，进行`URLEncode`操作。从 URL 参数中获取值一定要经过格式检测（根据需要）
- 不要使用 Eval!!!，解析 JSON 使用`JSON.parse()`
- 后端也要过滤关键字符

概括一下，主要还是编码和过滤两种手段应对，编码用于转义特殊符号，过滤是阻止特定标记、属性、事件。
例如在百度百科搜索框里输入`<script>`，会被转义为\&lt;script\&gt;

```js
function encode(str) {
  if (!str || str.length === 0) {
    return;
  } else {
    return str
      .replace(/</gm, "&gt;")
      .replace(/>/gm, "&lt;")
      .replace(/"/gm, "&quot;")
      .replace(/'/gm, "&apos;");
  }
}
```

自己写的函数可能覆盖不了各种情况，实际项目中推荐使用第三方 xss 库[xss](https://github.com/leizongmin/js-xss)

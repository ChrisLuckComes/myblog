# 14 条规则

1. 尽量减少 Http 请求
2. 使用 CDN
3. 缓存策略（expires,cache-control）
4. 压缩
5. 样式表置顶
6. js 置底
7. 避免 css 表达式
8. 使用外部的 js 和 css
9. 减少 DNS 查询
10. 精简 js
11. 避免重定向
12. 删除重复 js 文件
13. 使 ajax 可缓存

## 第一章 理解 Ajax 性能

### 权衡

**过早的优化是万恶之源**，现实中的情况通常是时间、质量和成本三选二。

### 优化原则

重点放在开销占比最高的模块（循环）

### 炫酷特效的使用

如果酷炫特效使用不当会导致不必要的 dom 操作，带来额外开销。应该只在确实能改善用户体验时才使用，而不应用于炫耀或弥补功能与可用性上的缺陷。

### js

通常情况下,js 不是瓶颈，而是 dom。如果必须在这方面优化，首先要经过评估。

### 总结

一切都是权衡，当我们做性能优化时，不要浪费时间去尝试为那些不消耗大量时间的代码提速，评估优先。

为质量编程，简洁易读的代码更易于正确理解和优化，避免耍小聪明。

## 第二章 创建快速响应的 Web 应用

什么是“足够快”，来自于 Jakob Nielsen

> - 0.1 秒：用户直接操作 UI 对象的感觉极限。

- 1 秒：用户随意的在计算机指令空间进行操作而无需过度等待的感觉极限。0.2~1.0 秒的延迟会被用户注意到，如果 0.1 秒无法完成，那么必须在 1 秒内完成，否则会失去流畅的体验，超过 1 秒的延迟要提示用户计算机正在解决这个问题，例如 loading 等。
- 10 秒：用户专注于任务的极限。超过 10 秒的任何操作都需要一个百分比完成指示器，以及一个方便用户中断操作且有清晰标识的方法。

### 测量延迟时间

1. 手动检测

```js
let start = new Date().getMilliseconds();
// 一些代码
console.log(new Date().getMilliseconds() - start);
```

2. 使用浏览器工具检测

Chrome Performance

### 别把运行时间可能很长的低性能代码引入到网页中

### 多线程

`Web Worker`可以用于解除威胁到UI快速响应能力的复杂计算。

```js
//worker.js
let i = 0;
function timedCount() {
  i += 1;
  postMessage(i);
  setTimeout(() => {
    timedCount();
  }, 1000);
}

timedCount();
```

```js
//入口
let w;

function startWorker() {
  if (typeof Worker !== "undefined") {
    if (typeof w == "undefined") {
      w = new Worker("worker.js");
    }
    w.onmessage = function(event) {
      document.getElementById("result").innerHTML = event.data;
    };
  } else {
    document.getElementById("result").innerHTML =
      "抱歉，你的浏览器不支持 Web Workers...";
  }
}

function stopWorker() {
  w.terminate();
  w = undefined;
}

document.getElementById("start").addEventListener("click", startWorker);
document.getElementById("end").addEventListener("click", stopWorker);
```

```html
<div id="app">
  <button id="start">开始计时</button>
  <button id="end">结束计时</button>
  <div id="result"></div>
</div>
```
[demo](https://codepen.io/luoyunlai/project/editor/AJEqJe)

当`worker`不可用时，可以使用定时器。

## 第三章 拆分初始化负载

## 第四章 无阻塞加载脚本

使用defer属性可以允许其他资源并行下载，并且把行内脚本移到最后，因为它会阻塞后续资源的下载。
```html
<script defer src="a.js"></script>
```

## 第七章 编写高效的JavaScript

1. 管理作用域

标识符在作用域链的位置越深，查找和访问它所需的时间越长。

 1.1 使用局部变量
    一个好的经验是任何非局部变量在函数中的使用超过一次时，都应该将其存储为局部变量。
2. 高效的数据存取
 2.1 如果需要对HTMLCollection对象的成员反复存取，更高效的方式是先将它们复制到一个数组里

3. 流控制

 3.1 判断条件有两个以上时，使用switch更快

4. 避免运行时间过长的脚本
 - 过多的dom交互
 - 过多的循环
 - 过多的递归

 4.1 使用定时器挂起

## 第九章 压缩代码
## 第十章 图像优化
 - 用jpeg保存照片，gif保存动画，其他都用PNG
 - png 无损压缩
 - 使用并优化css sprite
 - 不要在HTML中对图像进行缩放
 - favicons保持很小的大小，并被缓存。
## 划分主域

大多浏览器限制同一域名下并行下载数为6，划分两个域是一个平衡的方式。

## 第十四章 简化css选择符

css选择符是从右到左匹配

**最佳实践** 仅使用ID,类和标签选择符
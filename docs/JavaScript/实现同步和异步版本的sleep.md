# 实现同步和异步版本的 sleep

## 同步版

循环计算结束时间减去开始时间的差值，时间到了就退出循环

```js
function sleep(sec) {
  let start = new Date().getTime();
  let range = sec * 1000;
  while (new Date().getTime() - start < range) {}
}
```

## 异步版

返回一个 promise，在 settimeout 回调函数执行

```js
let asyncSleep = sec => new Promise(resolve => setTimeout(resolve, sec * 1000));
```

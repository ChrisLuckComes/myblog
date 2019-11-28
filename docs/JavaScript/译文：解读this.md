# 解读 this

参考于 [Gentle Explanation of "this" in JavaScript](https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/)，有改动。

## this 之谜

js 中，`this`是当前函数的执行上下文。js 有以下 4 种调用方式。

- function invocation 函数调用:`alert(1)`
- method invocation 方法调用:`console.log(1)`
- constructor invocation 构造函数调用:`new Number(1)`
- indirect invocation:`alert.call(undefined,'1')`

每种调用方式定义了不同的上下文，所以`this`的行为有点不同.
另外在严格模式下也会有不同的行为。

## function invocation 函数调用

function invocation 就是函数名后面直接跟上()，比如`parsetInt('18')`。如果有.那就是 method invocation。例如`[1,2].join(',')` 不是 function invocation.

**`This` is the _Global Object_ in a function invocation**

为什么？知识铺垫里提到，ResolveThisBinding()第一步首先是获取环境，如果是 function invocation，envRec 的环境是 global environment，所以 this=envRec.[[GlobalThisValue]]

在浏览器环境，GlobalThisValue 就是 window.所以该情况下 this===window

```js
fucntion a(){
    this.b=1;
}
a();
console.log(window.b); //1
console.log(this === window)//true

this.c=2
console.log(window.c); //2
```

### 严格模式

在严格模式下，this is undefined。不过 js 代码可能混用严格模式和非严格模式，这就要具体情况具体判断了。

```js
function b() {
  "use strict";
  console.log(this === undefined); //true
}
b();
```

### inner function 内部函数

这种方式通常会被误以为和`this`和外部函数一样。内部函数的上下文只看它的调用方式，不看函数的上下文

> 7.3.18 章 Invoke  
> The abstract operation Invoke is used to call a method property of an ECMAScript language value.

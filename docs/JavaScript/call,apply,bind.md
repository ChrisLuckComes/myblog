### call,apply,bind

## call,apply

func.apply(thisArg, [argsArray])

- `thisArg`
  可选的。在 func 函数运行时使用的 this 值。请注意，this 可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。

- `argsArray`
  可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为 null 或 undefined，则表示不需要传入任何参数。从 ECMAScript 5 开始可以使用类数组对象。 浏览器兼容性

apply() 方法调用一个具有给定 this 值的函数，以及作为一个数组（或类似数组对象）提供的参数。

> call()方法的作用和 apply() 方法类似，区别就是 call()方法接受的是参数列表，而 apply()方法接受的是一个参数数组

举个例子

```js
//取出一个数组的最大值
let arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(Math.max.apply(this, arr)); //apply写法
console.log(Math.max.call(this, ...arr)); //call写法
```

## bind

bind()方法创建一个新的函数，在 bind()被调用时，这个新函数的 this 被 bind 的第一个参数指定，其余的参数将作为新函数的参数供调用时使用

```js
this.a = 1;
function b() {
  console.log(this.a);
}
let c = b.bind(this);
b(); //undefined
c(); // 1
```

## 三个函数 es6 实现
[codepen](https://codepen.io/luoyunlai/pen/ExYzWJY)
```js
Function.prototype.my_apply = function(thisArg, args) {
  let fn = Symbol();
  thisArg[fn] = this;
  if (!args) {
    result = thisArg[fn]();
  } else {
    result = thisArg[fn](...args);
  }
  delete thisArg.fn;
  return result;
};

Function.prototype.my_call = function(thisArg, ...args) {
  let fn = Symbol();
  thisArg[fn] = this;
  if (!args) {
    result = thisArg[fn]();
  } else {
    result = thisArg[fn](...args);
  }
  delete thisArg.fn;
  return result;
};

Function.prototype.my_bind = function() {
  let that = this,
    thisArg = Array.from(arguments).shift(),
    args = Array.from(arguments).slice(1);
  return function() {
    return that.apply(thisArg, args.concat(Array.from(arguments)));
  };
};
```

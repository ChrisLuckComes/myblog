# es5,es6实现 watch

首先模拟一个 vue 实例

```js
let a = {
  data: {
    a: 1
  },
  watch: {
    a: function(value) {
      console.log(value);
    }
  },
  setA: function(number) {
    this.a = number;
  }
};
```

## 1. ES5：使用`Object.defineProperty()`

该静态函数可以直接在对象上定义新属性或者修改已存在的属性

> Object.defineProperty(obj, prop, descriptor)
>
> - obj 操作对象
> - prop 属性名
> - 描述符

### descriptor

- `configurable` 可配置的 只有在描述符可能被改变且属性可能被删除的时候为 true 默认为 false
- `enumerable` 可枚举的 默认为 false
- `value` 值 默认为 undefined
- `writable` 是否可写 只有当属性可以被赋值时为 true 默认为 false
- `get` 当属性被访问时触发该函数，返回值作为属性新值 默认为 false
- `set` 当属性被赋值时触发该函数，只有一个参数为赋值后的值。

```js
function watch_es5(obj) {
  for (let key in obj.data) {
    Object.defineProperty(obj, key, {
      set: function(value) {
        if (key in obj.watch) {
          obj.watch[key](value);
        }
      }
    });
  }
}

watch_es5(a);

a.setA(5); //log 5
a.setA(10); //log 10
```

## 2. ES6 使用`Proxy`

Proxy 用于定义基础操作的自定义行为，例如属性查找，赋值，枚举，函数调用等。

> `let p = new Proxy(target, handler);`

接受两个参数，返回一个对象，对 p 的操作全部会转发到 target 上。

- target 用 Proxy 包装的目标对象，任意类型。
- handler 占位符，包含 Proxy 的捕捉器，有很多可选项，这里我们只需要用到`handler.set()`

和`Object.defineProperty()`descriptor set 属性不同的是`Proxy()`handler set 函数有三个参数

- obj 对象
- prop key
- value 值

```js
function watch(obj) {
  let p = new Proxy(obj, {
    set: function(obj, prop, value) {
      if (prop in obj.watch) {
        obj.watch[prop](value);
      }
    }
  });
  return p;
}

let p = watch(a);

p.setA(5);//log 5

p.setA(10);//log 10
```

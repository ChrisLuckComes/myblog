# es5,es6 实现 computed

继实现 watch 之后，我们来接着实现 computed，还是先模拟一个实例

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
  },
  computed: {
    getA: function() {
      return this.a + 1;
    }
  }
};
```

## 1. ES5：使用`Object.defineProperty()`

这次需要用到的是 handler get 属性，读取 computed 的某个属性时，返回 computed 函数执行的结果

```js
function computed_es5(obj) {
  if (obj.computed) {
    for (let key in obj.computed) {
      Object.defineProperty(obj, key, {
        get: function() {
          return obj.computed[key].call(obj.data); //此处需要手动绑定this为obj.data，否则计算属性中this不正确
        }
      });
    }
  }
}

computed_es5(a);

console.log(a.getA); //2
```

## 2. ES6 使用`Proxy`

使用 proxy 的话，也是加上 get 属性，我们继续补充上次的函数，不用单独再写

```js
function watch(obj) {
  let p = new Proxy(obj, {
    get: function(obj, prop) {
      if (prop in obj.computed) {
        return obj.computed[prop].call(obj.data); //原理同上
      }
    },
    set: function(obj, prop, value) {
      if (prop in obj.watch) {
        obj.watch[prop](value);
      }
    }
  });
  return p;
}

let p = watch(a);

console.log(console.log(p.getA)); //2
```

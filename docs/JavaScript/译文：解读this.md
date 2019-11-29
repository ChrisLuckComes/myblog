# 解读 this

参考文章

- Dmitri Pavlutin - [Gentle Explanation of "this" in JavaScript](https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/)
- ECMA - ECMAScript 9th Edition / June 2018
- 自己 - 解读 this 的知识铺垫 - ECMA 规范

## this 之谜

js 中，`this`是当前函数的执行上下文。js 有以下 4 种调用方式。

- function invocation 函数调用:`alert(1)`
- method invocation 方法调用:`console.log(1)`
- constructor invocation 构造函数调用:`new Number(1)`
- indirect invocation:`alert.call(undefined,'1')`

每种调用方式定义了不同的上下文，所以`this`的行为有点不同.
另外在严格模式下也会有不同的行为。

## 1. function invocation 函数调用

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

### function invocation 严格模式

在严格模式下，this is undefined。不过 js 代码可能混用严格模式和非严格模式，这就要具体情况具体判断了。

```js
function b() {
  "use strict";
  console.log(this === undefined); //true
}
b();
```

### inner function 内部函数

```js
let numbers = {
  a: 1,
  b: 2,
  sum: function() {
    console.log(this === numbers); //true
    console.log(this.a + this.b); //3

    function calculate() {
      console.log(this === numbers); //false
      console.log(this.a + this.b); //NaN
    }
    return calculate();
  }
};

numbers.sum();
```

这种方式通常会被误以为和`this`和外部函数一样。内部函数的上下文只看它的调用方式，不看函数的上下文

> 7.3.18 章 Invoke  
> The abstract operation Invoke is used to call a method property of an ECMAScript language value.The operation with arguments _V_,_P_,and optionally _argumentsList_ where _V_ serves as both the lookup point for the property and the **this** value of the call,P is the property key,and _argumentsList_ is the list of arguments values passed to the method.If arguments List is not present,a new empty List is used as its value.This abstract operation performs the following steps.

总结一下就是这种方式被用来调用 method property，其中由 V,P,argumentsList 三个参数，步骤如下

1. Assert:IsPropertyKey(P) is true
   1. If Type(argument) is String, return true.
   2. If Type(argument) is Symbol, return true.
   3. Return false.
2. If argumentsList is not present,set argumentsList is a new empty List
3. let func be GetV(V,P)
4. Return ? Call(func,V,argumentsList)
   7.3.12 Call
   和 Invoke 描述类似，V 就是 Call 的**this** 1.没参数 argumentsList=[] 2.如果 IsCallable(func)==false，报错
   3.return func.[[Call]](V,argumentsList)

描述一下步骤

对于 numbers.sum()
第一步 判断 sum 是不是属性 key，是字符串进入第二步
第二步 如果没有传参，参数就是空列表
第三部 获取函数
第三步 使用 Call 方式 Call(numbers.sum,numbers,[]),此时 this 就是 numbers

对于 calculate()就是上面提到的 function invocation,`this===window`，如果想让它工作，需要改变 this，例如 call()，或者直接使用箭头函数

```js
let numbers = {
  a: 1,
  b: 2,
  sum: function() {
    console.log(this === numbers); //true

    function calculate() {
      console.log(this === numbers); //false
      console.log(this.a + this.b); //NaN
    }

    return calculate.call(this);
  }
};

numbers.sum(); //3
```

```js
let numbers = {
  a: 1,
  b: 2,
  sum: function() {
    console.log(this === numbers); //true
    //使用箭头函数
    let calculate = () => {
      console.log(this === numbers); //false
      console.log(this.a + this.b); //NaN
    };

    return calculate();
  }
};

numbers.sum(); //3
```

## 2. method invocation 方法调用

保存在对象属性的中的函数就是 method,上面例子 numbers.sum()就是 method invocation

原理在上面 inner function 已经讲过了 此处不再重复。

### separating method from its object 从对象分离方法

```js
function Pet(type, legs) {
  this.type = type;
  this.legs = legs;
  this.logInfo = function() {
    console.log(`The ${this.type} has ${this.legs} legs`); //The undefined has undefined legs
  };
  this.logInfo1 = () => {
    console.log(`The ${this.type} has ${this.legs} legs`);
  };
}

const myCat = new Pet("cat", 4);
setTimeout(myCat.logInfo, 1000);
```

你可能认为 logInfo 会打印出 The cat has 4 legs，不幸的是方法在 settimeout 已经被分离出来了。

以上调用相当于

```js
const extractedLogInfo = myCat.logInfo;
setTimeout(extractedLogInfo);
```

此时 extractedLogInfo 的调用方式就是 function invocation,this 是全局对象,不是 myCat。为了让函数可以正确工作，这里可以使用 `bind()` 绑定 this 为 myCat 生成一个新的函数传入，或者直接使用箭头函数定义 logInfo

```js
function Pet(type, legs) {
  this.type = type;
  this.legs = legs;
  this.logInfo = function() {
    console.log(`The ${this.type} has ${this.legs} legs`); //The undefined has undefined legs
  };
  this.logInfo1 = () => {
    console.log(`The ${this.type} has ${this.legs} legs`);
  };
}

const myCat = new Pet("cat", 4);
setTimeout(myCat.logInfo1, 1000);
setTimeout(myCat.logInfo.bind(myCat), 1000);
```

这波操作好像很熟悉啊，React 类组件里不就要这样干才能在函数里使用 this 吗？是不是豁然开朗。

## 3. Constructor invocation 构造函数调用

形如 `new A()`的方式就是构造函数调用，例如上面例子的`new Pet('cat',4)`  
省略()一样可以工作，相当于没传参数。

此时 this 就是新创建的对象，为什么？来模拟一下 new 函数发生了什么。

```js
function my_new(classToNew, ...args) {
  let f = new Object();
  f.__proto__ = constructor.prototype;
  let ret = constructor.apply(f, args);
  return typeof ret == "object" ? ret : f;
}
```

new 的过程中创建了新的对象，执行构造函数时传入了它作为 this

### forgetting about new 忘记 new 的情况

执行构造函数时，不加 new 一样可以执行。只不过有潜在的问题（除了工厂模式），因为有些构造函数不用 new 会省略初始化的逻辑，下面的例子模拟了这个问题

```js
function Vehicle(type, wheelsCount) {
  this.type = type;
  this.wheelsCount = wheelsCount;
  return this;
}

let car = Vehicle("Car", 4); //function invocation
console.log(car.type, car.wheelsCount); //Car 4
console.log(car === window); //true
```

`let car = Vehicle("Car", 4);`这行代码是 function invocation，this 是 global，所以相当于在 window 上添加了属性。要保证使用 new 怎么办呢？加上类型检查：

```js
function Vehicle(type, wheelsCount) {
  if (!(this instanceof Vehicle)) {
    throw Error("Error:Incorrect invocation");
  }
  this.type = type;
  this.wheelsCount = wheelsCount;
  return this;
}

let car = new Vehicle("Car", 4); //function invocation
console.log(car.type, car.wheelsCount); //Car 4
console.log(car === window); //false

let car1 = Vehicle("Car", 1); //Throws an error
```

## 4. Indirect invocation 间接调用

使用`func.call()`或`func.apply()`时就是间接调用。

函数其实是一个对象，只不过它的类型是 Function,它有 call 和 apply 这两个可以指定上下文的调用函数的 method。

- call(thisArg,[,arg1,[,arg2[,...]]])
- apply(thisArg,[arg1,arg2,...])

同样都是接受 thisArg,区别在于传参方式，call 是一系列参数，apply 是传入类数组对象（包括数组）。

那么很明显间接调用时 `this` 就是传入的第一个参数

```js
let rabbit = { name: "White Rabbit" };
function concatName(string) {
  return string + this.name;
}
concatName.call(rabbit, "Hello "); //Hello White Rabbit
concatName.apply(rabbit, ["Bye "]); //Bye White Rabbit
```

一个实际的用法就是 ES5 调用父类构造函数创建子类，继承构造函数属性。

```js
function A(number) {
  this.a = 1;
  this.b = number;
}
function B(number) {
  A.call(this, number);
}

let b = new B(2);
console.log(b); //{a:1,b:2}
```

## 5. Bound function 绑定函数

使用`func.bind(thisArg,[,arg1[,...]])`可以指定 this 创建新的函数

```js
function multiply(number) {
  return this * number;
}
let double = multiply.bind(2);
console.log(double(3)); //6
console.log(double(10)); //20
```

### Tight context binding 牢固的上下文绑定

`bind()` 产生了一个永久的上下文链接，并且一直保持，新产生的函数不会被 call,apply 改变已链接的上下文，也不能重复 bind

只有构造函数调用可以改变已绑定的上下文，原因参考上文构造函数调用

## 6. Arrow function 箭头函数

箭头函数被设计成更短方式的函数，并且绑定上下文的词法。它没有名字，也没有`arguments`对象，在箭头函数中使用...展开符获取 arguments。

箭头函数不会创建它自己的运行上下文，this 就是在箭头函数定义的地方附加的上下文，不会被其他方式改变。

## 总结

判断函数如何调用才是判断 this 的正确方式，对于箭头函数直接看它定义时的上下文，这样就不会再头疼了。

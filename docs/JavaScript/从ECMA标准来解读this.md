# 从 ECMA 标准来解读 this

## ECMAScript Language Types 语言类型

本文基于 ECMAScript 9th Edition / June 2018

首先从 ECMA 语言类型说起,来到第六章,分为如下两种

1. ECMAScript Language Types 第 6.1 章
   undefined,null,number,boolean,string,symbol,object
2. ECMAScript Specification Types 第 6.2 章
   Reference,List,Completion,Property Descriptor,Lexical Environment,Environment Record,Data Block

   这些类型值在使用 js 的过程中不可见，语言内部使用。本文重点在于 Reference 类型。

## The Reference Specification Type

节选至 6.2.4 章

> The Reference type is used to explain the behaviour of such operators as `delete`,`typeof`,the assignment operators,the `super` keyword and the other language features.For example,the left-hand operand of an assignment is expected to produce a reference.

reference 类型就是用来解释 delete,typeof,super 以及赋值等操作行为的。

> A _Reference_ is a resolved name or property binding.

reference 就是一个确定的名称或者属性的集合。

> A reference consists of three components

Reference 由三个组件组成

- base value
  可选值有 undefined,Object,Boolean,String,Symbol,Number,Environment Record。当 reference 不能被确定为是 binding 时，base value 为 undefined。如果使用 super 时，super reference 有额外的 thisValue component，永远不会是 environment record.
- the referenced name component
  可选值有 Symbol 或者字符串
- boolean-valued strict reference flag

## Environment Record 环境记录

根据目录，找到第 8 章 Executable Code and Execution Contexts 执行代码和执行上下文，Environment Record 在 8.1.1 章，从头看起。

### 8.1 Lexical Environments 词法环境

Lexical Environment 由 Environment Record 和一个可能为空的外层词法环境 reference 组成。它通常和一些特定的句法结构相关,例如

- Function Declaration 函数声明
- BlockStatement 代码块
- Catch (TryStatement)

当这些代码执行时 a new Lexical Environment 就会被创建。

Environment Record 记录由词法环境在作用域内创建的标识符的集合，被称为词法环境的环境记录。

- **global environment**:全局环境，没有外层环境，outer reference 为 null。全局环境可能或预填充一些包含全局对象的标识符集合。当代码被执行，额外属性可能会添加到全局对象，初始属性可能会被修改。

- **module environment**:包括模块的顶层声明集合，也包括 Module 引入的集合。

- **function environment** 对应函数调用。函数环境可能会创建新的 this 集合，也会捕捉必要的状态支持 super 方法调用。

## GetThisValue

回到 6.2.4.10 章 GetThisValue

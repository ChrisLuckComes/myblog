# 从ECMA标准来解读this

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
  可选值有 undefined,Object,Boolean,String,Symbol,Number,Environment Record。当 reference 不能被确定为是 binding 时，base value 为 undefined。如果使用super时，super reference有额外的thisValue component，永远不会是environment record.
- the referenced name component
  可选值有 Symbol 或者字符串
- boolean-valued strict reference flag

## Environment Record

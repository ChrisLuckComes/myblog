# 从 ECMA 标准来解读 this

本文基于 ECMAScript 9th Edition / June 2018

读书先看目录，来到第十二章 ECMAScript Language: Expressions

## 12.2.2 章 The this Keyword

> Runtime Semantics: Evaluation  
> _PrimaryExpression_ : **This**

运行时语义:求值  
主要描述符：This

> Return ? `ResolveThisBinding()`.

回到目录 找到 ResolveThisBinding()位置

## 8.3.4 章 ResolveThisBinding()

> The abstract operation ResolveThisBinding determines the binding of the keyword **this** using the LexicalEnvironment of the running execution context.ResolveThisBinding performs the following steps:
>
> 1.  Let envRec be `GetThisEnvironment()`
> 2.  Return ? envRec.`GetThisBinding()`

envRec=environment running execution context

虚拟运算 ResolveThisBinding()决定**this**用运行中的执行上下文的词法环境。步骤如下

1.  设置 envRec 8.3.3 章 GetThisEnvironment()

    ## 8.3.3 章 GetThisEnvironment()

    > 1. Let lex be the running execution context's LexicalEnvironment
    > 2. Repeat,

        a. Let envRec be lex's EnvironmentRecord
        b. Let exists be envRec.HasThisBinding().
        c. If exists is true,return envRec.
        d. Let outer be the value of lex's outer environment reference
        e. Assert:outer is not null
        f. Set lex to outer.

    **The loop step2 will alwats terminate because the list of environments always ends with the global environment which has _this_**

    1. let lex=运行中的执行上下文的词法环境
    2. 重复以下步骤，直到全局环境或者找到 this 为止。

    ```js
    let envRec = lex.Environment;
    let exists = envRec.HashThisBinding();
    if (exists) {
      return envRec;
    } else {
      let outer = lex.outer;
      if (outer !== null) {
        lex = outer;
      }
    }
    ```

    ### Environment Record 环境记录

    根据目录，找到第 8 章 Executable Code and Execution Contexts 执行代码和执行上下文，Environment Record 在 8.1.1 章

    #### 8.1 Lexical Environments 词法环境

    Lexical Environment 由 Environment Record 和一个可能为空的外层词法环境 reference 组成。它通常和一些特定的句法结构相关,例如

    - Function Declaration 函数声明
    - BlockStatement 代码块
    - Catch (TryStatement)

    当这些代码执行时 a new Lexical Environment 就会被创建。

    Environment Record 记录由词法环境在作用域内创建的标识符的集合，被称为词法环境的环境记录。

    - **global environment**:全局环境，没有外层环境，outer reference 为 null。全局环境可能或预填充一些包含全局对象的标识符集合。当代码被执行，额外属性可能会添加到全局对象，初始属性可能会被修改。

    - **module environment**:包括模块的顶层声明集合，也包括 Module 引入的集合。

    - **function environment** 对应函数调用。函数环境可能会创建新的 this 集合，也会捕捉必要的状态支持 super 方法调用。

2.  返回 envRec.GetThisBinding

回到目录查找 GetThisBinding，结果如下

1.  8.1.1.3 章 Function Environment Records 8.1.1.3.4 节
    ### Function Environment Records
        函数环境记录用来表示函数的顶级作用域。
        如果函数不是箭头函数，提供this。
        如果函数不是箭头函数且用到*super*，它的函数环境记录包括执行了super()函数调用的情况。
    ### GetThisBinding()
        if envRec.[[ThisBindingStatus]]=='lexical'，该函数是箭头函数，不提供this
        if envRec.[[ThisBindingStatus]]=='uninitialized',抛出Reference error,
        return envRec.[[ThisValue]]
2.  8.1.1.4 章 Global Environment Records 8.1.1.4.11 节
    ### Global Environment Records
        全局环境记录用来表示最外层作用域，被公共领域中运行的的所有脚本元素共享。它提供了内置全局对象，全局对象的属性集合和所有顶层声明。
    ### GetThisBinding()
        此时envRec是全局环境记录，返回envRec.[[GlobalThisValue]]
3.  8.1.1.5 章 Module Environment Records 8.1.1.5.4 节
    return undefined

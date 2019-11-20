### AST 抽象语法树

_It is a hierarchical program representation that presents source code structure according to the grammar of a programming language, each AST node corresponds to an item of a source code._

_AST=abstract syntax tree_
个人翻译：这是一个根据编程语言语法表示源码结构的层次程序，每一个抽象语法树节点对应一个源码块

常用的各种代码转换，格式化插件或库全部都要用到AST

举个栗子

```js
//a
function a(p) {
  let a = 1;
  return a + 1;
}
/*
 * a
 */
```

转换成 AST [在线转换](https://astexplorer.net) 选择不同的库结果可能会不一样，这里选择 babel-eslint

```json
{
  "type": "Program",
  "start": 0,
  "end": 60,
  "loc": {
    "start": {
      "line": 2,
      "column": 0
    },
    "end": {
      "line": 5,
      "column": 1
    }
  },
  "comments": [
    {
      "type": "Line",
      "value": "a",
      "start": 0,
      "end": 3,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 3
        }
      },
      "range": [0, 3]
    },
    {
      "type": "Block",
      "value": "\n * a\n ",
      "start": 49,
      "end": 60,
      "loc": {
        "start": {
          "line": 6,
          "column": 0
        },
        "end": {
          "line": 8,
          "column": 3
        }
      },
      "range": [49, 60]
    }
  ],
  "range": [4, 48],
  "sourceType": "module",
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 4,
      "end": 48,
      "loc": {
        "start": {
          "line": 2,
          "column": 0
        },
        "end": {
          "line": 5,
          "column": 1
        }
      },
      "id": {
        "type": "Identifier",
        "start": 13,
        "end": 14,
        "loc": {
          "start": {
            "line": 2,
            "column": 9
          },
          "end": {
            "line": 2,
            "column": 10
          },
          "identifierName": "a"
        },
        "name": "a",
        "leadingComments": null,
        "range": [13, 14],
        "_babelType": "Identifier"
      },
      "generator": false,
      "expression": false,
      "async": false,
      "params": [
        {
          "type": "Identifier",
          "start": 15,
          "end": 16,
          "loc": {
            "start": {
              "line": 2,
              "column": 11
            },
            "end": {
              "line": 2,
              "column": 12
            },
            "identifierName": "p"
          },
          "name": "p",
          "range": [15, 16],
          "_babelType": "Identifier"
        }
      ],
      "body": {
        "type": "BlockStatement",
        "start": 18,
        "end": 48,
        "loc": {
          "start": {
            "line": 2,
            "column": 14
          },
          "end": {
            "line": 5,
            "column": 1
          }
        },
        "body": [
          {
            "type": "VariableDeclaration",
            "start": 22,
            "end": 30,
            "loc": {
              "start": {
                "line": 3,
                "column": 2
              },
              "end": {
                "line": 3,
                "column": 10
              }
            },
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 26,
                "end": 29,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 6
                  },
                  "end": {
                    "line": 3,
                    "column": 9
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 26,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 6
                    },
                    "end": {
                      "line": 3,
                      "column": 7
                    },
                    "identifierName": "a"
                  },
                  "name": "a",
                  "range": [26, 27],
                  "_babelType": "Identifier"
                },
                "init": {
                  "type": "Literal",
                  "start": 28,
                  "end": 29,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 8
                    },
                    "end": {
                      "line": 3,
                      "column": 9
                    }
                  },
                  "extra": {
                    "rawValue": 1,
                    "raw": "1"
                  },
                  "value": 1,
                  "range": [28, 29],
                  "_babelType": "NumericLiteral",
                  "raw": "1"
                },
                "range": [26, 29],
                "_babelType": "VariableDeclarator"
              }
            ],
            "kind": "let",
            "range": [22, 30],
            "_babelType": "VariableDeclaration"
          },
          {
            "type": "ReturnStatement",
            "start": 33,
            "end": 46,
            "loc": {
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 4,
                "column": 15
              }
            },
            "argument": {
              "type": "BinaryExpression",
              "start": 40,
              "end": 45,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 9
                },
                "end": {
                  "line": 4,
                  "column": 14
                }
              },
              "left": {
                "type": "Identifier",
                "start": 40,
                "end": 41,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 9
                  },
                  "end": {
                    "line": 4,
                    "column": 10
                  },
                  "identifierName": "a"
                },
                "name": "a",
                "range": [40, 41],
                "_babelType": "Identifier"
              },
              "operator": "+",
              "right": {
                "type": "Literal",
                "start": 44,
                "end": 45,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 13
                  },
                  "end": {
                    "line": 4,
                    "column": 14
                  }
                },
                "extra": {
                  "rawValue": 1,
                  "raw": "1"
                },
                "value": 1,
                "range": [44, 45],
                "_babelType": "NumericLiteral",
                "raw": "1"
              },
              "range": [40, 45],
              "_babelType": "BinaryExpression"
            },
            "range": [33, 46],
            "_babelType": "ReturnStatement"
          }
        ],
        "trailingComments": null,
        "range": [18, 48],
        "_babelType": "BlockStatement"
      },
      "leadingComments": [
        {
          "type": "Line",
          "value": "a",
          "start": 0,
          "end": 3,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 3
            }
          },
          "range": [0, 3]
        }
      ],
      "trailingComments": [
        {
          "type": "Block",
          "value": "\n * a\n ",
          "start": 49,
          "end": 60,
          "loc": {
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 3
            }
          },
          "range": [49, 60]
        }
      ],
      "range": [4, 48],
      "_babelType": "FunctionDeclaration",
      "defaults": []
    }
  ]
}
```

作为前端，树状结构没有 json 来的清晰，这样一下瞬间明白 AST 是干啥的了。

分析一下结果 json，可以get到常用的Babel、Prettier等工作原理无非是按行一个字母一个字母读取代码，然后创建AST，遍历AST再生成代码

## 1.Program

记录了程序开始结束信息

## 2.comments 注释

数组类型，里面是所有的注释，分为 Line 单行注释和 Block 多行注释，并记录了开始结束信息。
还有 leadingComments 和 trailingComments 表示开头注释和结尾注释

## 3.body 代码体

分为如下部分

# FunctionDeclaration 函数声明

整个函数体

# Identifier 标识符

函数名

# params 参数

参数

# BlockStatement 函数体

# VariableDeclaration

declarations 数组，里面是所有的声明
参数声明，包括VariableDeclarator（变量声明符）、Identifier（变量名）、init（初始化）

# ExpressionStatement 表达式

expression

AssignmentExpression（赋值表达式）：left、operator（运算符）、right

ConditionalExpression（条件表达式）

# ReturnStatement 
return 
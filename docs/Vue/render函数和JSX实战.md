## 1.render 函数

# 节点、树以及虚拟 DOM

![DOM节点树](https://cn.vuejs.org/images/dom-tree.png)

使用模板

```html
<h1>{{ blogTitle }}</h1>
```

使用 render 函数

```js
render: createElement => createElement("h1", blogTitle);
```

# 虚拟 dom

createElement 到底会返回什么呢？其实不是一个实际的 DOM 元素。它更准确的名字可能是 createNodeDescription，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为“VNode”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

# createElement 参数

```js
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。必填项。
  "div",

  // {Object}
  // 一个与模板中属性对应的数据对象。可选。
  {
    // (详情见下一节)
  },

  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    "先写一些文字",
    createElement("h1", "一则头条"),
    createElement(MyComponent, {
      props: {
        someProp: "foobar"
      }
    })
  ]
);
```

在使用 iView 的表格组件的过程中，接到了这样的需求，不同的父表头，子表头内容相同，并且每个单元格需要加上 tooltip。

A abc B abc

使用 slot 方式整行替换是不可行的，除非挨个写一堆 slot。
解决方案是使用 render 函数，return tooltip

```typescript
//获取tooltip组件
getTooltip(row: any) {
    let content = "",
        result = "";
    if (this.active_tab == "system") {
        content += `阈值为${row.check_config_percent}`;
        result = row.check_result;
    } else {
        result = row.check_value + " " + row.check_result;
    }
    content += row.check_message;
    return (
        <i-tooltip
        transfer={true}
        content={content}
        maxWidth={300}
        placement={"top"}
        style={{
            color: row.check_status === "正常" ? "#1bcab4" : "#d72323",
            whiteSpace: "normal"
        }}
        >
        {result}
        </i-tooltip>
    );
}
  /**
   * 获取表头
   */
  getColumns(type: string, reportType: string) {
    if (type == "system") {
      return [
        { title: "系统编码", key: "sys_code" },
        ...this.columnTypes().map((x: any) => {
          let temp: any = {};
          (temp.title = this.dict.translate[x]), (temp.align = "center");

          temp.children = [
            {
              title: "当前值",
              render: (h: any, params: any) => {
                let row = params.row[x + "_month"];
                return h("div", row.check_value);
              }
            }
          ];
          if (reportType == "day") {
            temp.children.push(
              ...[
                {
                  title: "日",
                  render: (h: any, params: any) =>
                    this.getTooltip(params.row[x + "_day"])
                },
                {
                  title: "周",
                  render: (h: any, params: any) =>
                    this.getTooltip(params.row[x + "_week"])
                },
                {
                  title: "月",
                  render: (h: any, params: any) =>
                    this.getTooltip(params.row[x + "_month"])
                }
              ]
            );
          } else {
            temp.children.push({
              title: "月",
              render: (h: any, params: any) =>
                this.getTooltip(params.row[x + "_week"])
            });
          }
          return temp;
        })
      ];
    } else {
      return [
        { title: "表名", key: "table_name" },
        { title: "日期", key: "date" },
        ...this.columnTypes().map((x: any) => {
          let temp: any = {
            title: this.dict.translate[x],
            render: (h: any, params: any) => {
              let item = params.row[x];
              if (item) {
                return this.getTooltip(item);
              } else {
                return <div>-</div>;
              }
            }
          };
          return temp;
        })
      ];
    }
  }

```

## 2.JSX

就像我上面的示例，如果我不用 jsx，写法如下

```js
return h(
  "Tooltip",
  {
    props: {
      transfer: true,
      content: item.check_message,
      maxWidth: "500",
      placement: "top"
    },
    style: {
      color: item.check_status === "正常" ? "#1bcab4" : "#d72323"
    }
  },
  item.check_value + " " + item.check_result
);
```

我还是觉得 jsx 写法会比较简单直观

将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的。从 Vue 的 Babel 插件的 3.4.0 版本开始，我们会在以 ES2015 语法声明的含有 JSX 的任何方法和 getter 中 (不是函数或箭头函数中) 自动注入 const h = this.\$createElement，这样你就可以去掉 (h) 参数了。对于更早版本的插件，如果 h 在当前作用域中不可用，应用会抛错。

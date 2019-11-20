# 什么是 BFC

**BFC 全称为 块格式化上下文 (Block Formatting Context) **

MDN:

> 一个块格式化上下文（block formatting context） 是 Web 页面的可视化 CSS 渲染出的一部分。它是块级盒布局出现的区域，也是浮动层元素进行交互的区域。
> 一个块格式化上下文由以下之一创建：
>
> - 根元素或其它包含它的元素
> - 浮动元素 (元素的 float 不是 none)
> - 绝对定位元素 (元素具有 position 为 absolute 或 fixed)
> - 内联块 (元素具有 display: inline-block)
> - 表格单元格 (元素具有 display: table-cell，HTML 表格单元格默认属性)
> - 表格标题 (元素具有 display: table-caption, HTML 表格标题默认属性)
> - 具有 overflow 且值不是 visible 的块元素，
> - display: flow-root
> - column-span: all 应当总是会创建一个新的格式化上下文，即便具有 column-span: all 的元素并不被包裹在一个多列容器中。
> - 一个块格式化上下文包括创建它的元素内部所有内容，除了被包含于创建新的块级格式化上下文的后代元素内的元素。
> - 块格式化上下文对于定位 (参见 float) 与清除浮动 (参见 clear) 很重要。定位和清除浮动的样式规则只适用于处于同一块格式化上下文内的元素。浮动不会影响其它块格式化上下文中元素的布局，并且清除浮动只- 能清除同一块格式化上下文中在它前面的元素的浮动。

## BFC 特性

1.使 BFC 内部浮动元素不会到处乱跑。 2.和浮动元素产生边界

## 等高布局

```html
<header class="header"></header>
<div class="body">
  <div class="side">666</div>
  <div class="content">123</div>
</div>
```

```css
.header {
  height: 60px;
  background: gray;
}
.body {
  background-color: rgb(224, 206, 247);
  border: 5px solid rebeccapurple;
  display: flow-root; /*可产生无副作用的BFC*/
}

.side {
  width: 200px;
  float: left;
  height: 300px;
  background: green;
}
```

[等高布局 demo](https://codepen.io/luoyunlai/pen/ZEEGBKK)

产生最终效果的关键属性是`.body{display: flow-root;}`和`.side{float:left}`

overflow:hidden 使这个 div 产生了一个 BFC，此时.side 就不会跑到.body 外面,.content 和.side 分开了
,.body 的高度也等于内部最高的.side 的高度

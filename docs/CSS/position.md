# position

css `position`属性用于指定一个元素在文档中的定位方式。top,right,bottom,left 决定了该元素的最终位置

> - 如果 top 和 bottom 都被指定（严格来说，这里指定的值不能为 auto ），top 优先。
> - 如果指定了 left 和 right ，当 direction 设置为 ltr（水平书写的中文、英语）时 left 优先， 当 direction 设置为 rtl（阿拉伯语、希伯来语、波斯语由右向左书写）时 right 优先。

<style>
.container{
    width:300px;
    height:300px;
    display:flex;
    background:gray;
}
.box{
    width:50px;
    height:50px;
    background:yellow;
    border:2px solid red;
    color:black;
}
.static{
    position:static;
    top:10px;
    right:0
}
.relative{
    position:relative;
    top:10px;
    left:0px;
}
.absolute{
    position:absolute;
    top:50px;
}
.fixed{
    position:fixed;
    top:50px;
}
.transform{
    transform:scale(1)
}
</style>

- `static`
  该元素指定元素使用正常布局行为。此时 top,right,bottom,left,z-index 属性无效。
- `relative`
  元素先放置在定位时的位置，再在不改变页面布局的前提下调整元素位置。
  > 元素仍然保持其未定位前的形状，它原本所占的空间仍保留。
- `absolute`
  不预留空间，通过指定元素相对于最近的非 static 定位祖先的偏移来确定位置，如果没有这种祖先就相对于 body 定位。可以设置 margin，且不会和其他边距合并。通常结合相对定位父元素一起使用
- `fixed`
  不预留空间，而是通过指定元素相对于 [viewport](https://www.runoob.com/css/css-rwd-viewport.html) 的位置来指定元素位置，元素的位置在屏幕滚动时不会改变。`fixed`会创建新的层叠上下文，当元素的祖先 transform 属性不为 none 时，容器由 viewport 改为该祖先。
- `sticky`
  粘性定位，实验中的功能，此处不做具体介绍了，未被各大浏览器厂商完全支持。

---

<div class="container relative">
  <div class="box static">static</div>
  <div class="box relative">relative</div>
  <div class="box absolute">absolute</div>
  <div class="box fixed">fixed</div>
  <div class="box transform">transform
    <div class="box fixed">fixed in transform</div>
  </div>
</div>
<br>

---

```html
<div class="container relative">
  <div class="box static">static</div>
  <div class="box relative">relative</div>
  <div class="box absolute">absolute</div>
  <div class="box fixed">fixed</div>
  <div class="box transform">
    transform
    <div class="box fixed">fixed in transform</div>
  </div>
</div>
```

---

```css
.container {
  width: 300px;
  height: 300px;
  display: flex;
  background: gray;
}
.box {
  width: 50px;
  height: 50px;
  background: yellow;
  border: 2px solid red;
  color: black;
}
.static {
  position: static;
  top: 10px;
  right: 0;
}
.relative {
  position: relative;
  top: 10px;
  left: 0px;
}
.absolute {
  position: absolute;
  top: 50px;
}
.fixed {
  position: fixed;
  top: 50px;
}
.transform {
  transform: scale(1);
}
```

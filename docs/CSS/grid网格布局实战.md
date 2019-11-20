# grid 网格布局实战

现在前端用到的最多的布局是 flex 布局，但是它的能力有限，只能针对某一条轴线。

flex-direction 是 row 只能控制行级，column 只能控制列级，要实现行列同时控制，形成完整布局，需要多重 flex 嵌套，会产生额外的元素和工作量,特别是在元素的宽高大小不一致的情况下，flex 布局就不太好用了。

例如下图的任务（图片来自于阮老师的博文）
![grid布局](https://www.wangbase.com/blogimg/asset/201903/1_bg2019032501.png)

不用 grid 布局实现上图功能需要的代码如下 [flex 实现](https://codepen.io/luoyunlai/full/mdbLgxR)

```html
<div class="container">
  <div class="left">
    <div class="box-1">1</div>
    <div class="left-bottom">
      <div class="box-3">3</div>
      <div class="box-5">5</div>
    </div>
  </div>
  <div class="right">
    <div class="box-2">2</div>
    <div class="box-4">4</div>
  </div>
</div>
```

```scss
.container {
  display: flex;
  width: 800px;
  height: 400px;
  color: white;
  .left {
    flex: 2;
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    .box-1 {
      flex: 2;
      background: red;
      margin-bottom: 1rem;
    }
    .left-bottom {
      display: flex;
      flex: 1;
      .box-3,
      .box-5 {
        flex: 1;
      }
      .box-3 {
        background: green;
        margin-right: 1rem;
      }
      .box-5 {
        background: orange;
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .box-2 {
      flex: 1;
      background: blue;
      margin-bottom: 1rem;
    }
    .box-4 {
      background: purple;
      flex: 2;
    }
  }
}
```

使用 grid 布局代码如下 [grid 实现](https://codepen.io/luoyunlai/pen/LYPmoYR)

```html
<div class="grid-container">
  <div class="box-1">1</div>
  <div class="box-2">2</div>
  <div class="box-3">3</div>
  <div class="box-5">5</div>
  <div class="box-4">4</div>
</div>
```

```scss
.grid-container {
  display: grid;
  width: 800px;
  height: 400px;
  color: white;
  grid-template-columns: repeat(33.3%, 3);
  grid-template-rows: repeat(33.3%, 3);
  grid-gap: 1rem;
  .box-1 {
    background: red;
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .box-2 {
    background: blue;
    grid-column-start: 3;
    grid-row-end: 2;
  }
  .box-3 {
    background: green;
    grid-row-start: 3;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .box-5 {
    background: orange;
    grid-row-start: 3;
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .box-4 {
    background: purple;
    grid-row-start: 2;
    grid-row-end: 4;
    grid-column-start: 3;
  }
}
```

相比之下可以看出 flex 布局实现该布局需要多出三个 flex 布局的 div，复杂了不少。

总结：grid 布局不需要过多思考，使用 grid-template-columns 和 grid-template-rows 制定好网格行和列之后，指定每一块内容的开始和结束位置就可以轻松完成布局。

用它实现常用布局几行 css 就能搞定，可谓布局神器。

唯一的缺憾是，兼容性略差，支持 Chrome>=57，不过 57 都是 2017 年的版本了，这方面问题可能不太大。 [查看 grid 布局兼容性](https://caniuse.com/#search=grid)

详细教程见 [阮一峰老师的博客](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

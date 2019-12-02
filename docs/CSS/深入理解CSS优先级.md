# 深入理解 CSS 优先级

参考：O.REILLY - CSS Refactoring

## Selector Specificity 选择器特性

计算过程：按下述规则给(a,b,c,d)赋值

1. 如果有内联样式 style=""，a=1;否则 a=0;
2. b = ID 选择器的数量
3. c = 类选择器，属性选择器，伪类的数量
4. d = 类型选择器和伪元素的数量

比较时，最左边的数字权重最高，如果值相同比较下一位。  
(1,0,0,0) > (0,1,1,3)  
(0,2,1,3) > (0,1,1,3)

如果全部相等呢？下文说明

## Ruleset order 规则顺序

如果有两个同样特性的 css 规则，那么生效的是后出现的那个。

```css
#nav-global > ul > li > a.nav-link {
  color: #ffffff;
}
#nav-global > ul > li > a.nav-link {
  color: #000000;
}
```

```html
<nav id="nav-global">
  <ul>
    <li>
      <a href="#" class="nav-link">Link</a>
    </li>
  </ul>
</nav>
```

<style>
#nav-global > ul > li > a.nav-link {
color: #333333;
}
#nav-global > ul > li > a.nav-link {
color: #000000;
}
.nav-link-important {
  color: #333333 !important;
}
</style>
<nav id="nav-global">
    <ul>
        <li>
            <a href="#" class="nav-link">Link</a>
        </li>
    </ul>
</nav>

## Inline CSS 内联样式

修改一下上面的例子，加上内联样式。此时可以覆盖之前 css,因为 a=1

```html
<a style="color:red" href="#" class="nav-link">Link</a>
```

<nav id="nav-global">
    <ul>
        <li>
            <a style="color:red" href="#" class="nav-link">Link</a>
        </li>
    </ul>
</nav>

## !important

如果要覆盖内联样式,就需要!important 出马了。它会忽略其他选择器相同的属性，如果有多个!important，生效的是后出现的那个。

```css
.nav-link-important {
  color: #333333 !important;
}
```

```html
<a style="color:red" href="#" class="nav-link">Link</a>
```

<nav id="nav-global">
    <ul>
        <li>
            <a style="color:red" href="#" class="nav-line nav-link-important">Link</a>
        </li>
    </ul>
</nav>

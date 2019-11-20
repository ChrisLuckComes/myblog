# 使用 include-media 简化媒体查询写法

[github 地址](https://github.com/eduardoboucas/include-media)  
 [点击打开 scss 文件](https://raw.githubusercontent.com/eduardoboucas/include-media/master/dist/_include-media.scss)

引入文件后

```scss
$breakpoints: (
  phone: 320px,
  tablet: 768px,
  desktop: 1024px
);
/* Inclusive and exclusive operators for a finer control over the intervals */
@include media(">phone", "<=tablet") {
  width: 50%;
}
/* Use ligatured operators if you fancy a slicker declaration */
@include media("≥phone", "≤tablet") {
  line-height: 1.5;
}
```

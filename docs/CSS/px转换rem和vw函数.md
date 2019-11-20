# px 转换 rem 和 vw 函数

```scss
//参数
$design-width: 1920;
$design-height: 1080;

$root: 14;
//px转vw函数
@function px2vw($px) {
  @return ($px * 100 / $design-width) * 1vw;
}

@function px2rem($px) {
  @return ($px/$root) * 1rem;
}
```

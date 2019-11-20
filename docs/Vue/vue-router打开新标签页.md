# vue-router 打开新标签页

```js
let { href } = this.$router.resolve({
  path: `/table`,
  query: { data: JSON.stringify(data), name: option.title.text } //query 路由参数非必须
});
window.open(href, "_blank");
```

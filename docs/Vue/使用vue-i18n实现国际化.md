# 使用 vue-i18n 实现国际化

## 安装

npm install vue-i18n

## 初始化代码

```js
//main.js
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: "cn", // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    cn: require("./locales/cn"), // 中文语言包
    en: require("./locales/en") // 英文语言包
  }
});
new Vue({
  components: {
    App
  },
  i18n,
  router,
  store,
  template: "<App/>"
}).$mount("#app");
```

```json
//cn.json
{
    "a":"啊"
}
//en.json
{
    "a":"A"
}
```

## 切换语言

```js
this.$i18n.locale = "cn";
```

### 使用方式

```html
<div>{{$t('a')}}</div>
```

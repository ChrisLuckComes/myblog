# 前言

使用 vuex 的时候，会存储一些初始值/默认值，如果这些数据是来自于接口，如何保证在页面加载前初始化完成呢？
此时使用组件生命周期钩子是做不到的，无法保证在页面渲染前准备好数据。

解决方案如下:

```ts
//store.ts
import Vue from "vue";
import Vuex from "vuex";

import ajax from "@/assets/tool/axios.ts";

Vue.use(Vuex);

export async function store(): Promise<any> {
  let systems: any = [];
  let system = "";

  try {
    let sys = await ajax("/tdata/api/public/sys_code", {}, "get");
    systems = sys;
    system = (sys as any[])[0].sys_code;
  } finally {
  }
  return new Vuex.Store({
    state: {
      activeMenu: "",
      theme: "black",
      user: {},
      systems: systems
    }
  });
}

//main.ts
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

//store.ts返回一个promise对象
store().then((s: Store<any>) => {
  new Vue({
    router,
    store: s,
    render: h => h(App)
  }).$mount("#app");
});
```

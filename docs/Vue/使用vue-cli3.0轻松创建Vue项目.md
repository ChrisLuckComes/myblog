# 使用 vue-cli3.0 轻松创建 Vue 项目

### 项目构建

首先安装 vue-cli3.0+

```bash
npm i -g @vue/cli
```

使用 vue-cli 可以轻松完成项目构建

### **PS:已有项目如果需要引入 typescript 可直接添加插件 vue add @vue/typescript**

## 1

输入 vue create name

Vue CLI v3.4.0
? Please pick a preset:
my-template (vue-router, vuex, sass, babel)
default (babel, eslint)

> Manually select features

选择 Manually select feeatures 回车

## 2

? Check the features needed for your project:
(_) Babel
(_) TypeScript
( ) Progressive Web App (PWA) Support
(_) Router
(_) Vuex
(\*) CSS Pre-processors

> (\*) Linter / Formatter
> ( ) Unit Testing
> ( ) E2E Testing

按需勾选，回车

## 3

? Use class-style component syntax? (Y/n) y

## 4

? Use Babel alongside TypeScript for auto-detected polyfills? (Y/n) y

## 5

? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n) y

## 6

? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with node-sass)

## 7

? Pick a linter / formatter config: Prettier

## 8

? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)Lint on save

## 9

Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files

##

再就是需不需要保存模板，选择完后开始安装依赖，稍等几分钟就创建完成了。

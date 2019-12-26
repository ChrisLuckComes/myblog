module.exports = {
  title: "Chris Luo",
  description: "个人博客",
  base: "/realBlog/",
  themeConfig: {
    displayAllHeaders: true,
    activeHeaderLinks: false,
    sidebar: [
      { title: "介绍", children: [["/main/main", "介绍"]] },
      {
        title: "CSS",
        // collapsable: true,
        children: [
          ["/CSS/深入理解CSS优先级", "深入理解CSS优先级"],
          ["/CSS/盒模型", "盒模型"],
          ["/CSS/text-overflow", "text-overflow"],
          ["/CSS/textarea去除右下角箭头", "textarea去除右下角箭头"],
          ["/CSS/关于whitespace", "关于whitespace"],
          ["/CSS/字体颜色渐变", "字体颜色渐变"],
          ["/CSS/首行缩进", "首行缩进"],
          ["/CSS/锚点定位", "锚点定位"],
          [
            "/CSS/样式名很麻烦？使用postcss-alias偷懒",
            "样式名很麻烦？使用postcss-alias偷懒"
          ],
          [
            "/CSS/sass共用代码 @include 和 @extend",
            "sass共用代码 @include 和 @extend"
          ],
          [
            "/CSS/使用include-media简化媒体查询写法",
            "使用include-media简化媒体查询写法"
          ],
          [
            "/CSS/前端利器 - 使用iconfont管理图标",
            "前端利器 - 使用iconfont管理图标"
          ],
          ["/CSS/滚动条样式", "滚动条样式"],
          ["/CSS/px转换rem和vw函数", "px转换rem和vw函数"],
          ["/CSS/grid网格布局实战", "grid网格布局实战"],
          ["/CSS/由等高布局引出的BFC概念", "由等高布局引出的BFC概念"],
          ["/CSS/实现长宽比恒定的元素", "实现长宽比恒定的元素"],
          ["/CSS/居中", "居中"],
          ["/CSS/position", "position"]
        ]
      },
      {
        title: "Vue",
        children: [
          ["/Vue/跨域配置", "跨域配置"],
          ["/Vue/render函数和JSX实战", "render函数和JSX实战"],
          ["/Vue/初始化vuex数据", "初始化vuex数据"],
          ["/Vue/在VS Code中调试vue", "在VS Code中调试vue"],
          ["/Vue/路由鉴权", "路由鉴权"],
          ["/Vue/过滤器实战", "过滤器实战"],
          ["/Vue/使用vue-i18n实现国际化", "使用vue-i18n实现国际化"],
          ["/Vue/vue-router打开新标签页", "vue-router打开新标签页"],
          ["/Vue/history路由nginx配置", "history路由nginx配置"],
          ["/Vue/在客户端侧代码中使用环境变量", "在客户端侧代码中使用环境变量"],
          ["/Vue/es5,es6实现watch", "es5,es6实现watch"],
          ["/Vue/es5,es6实现computed", "es5,es6实现computed"]
        ]
      },
      {
        title: "Node.js",
        children: [["/Node.js/路径总结", "路径总结"]]
      },
      {
        title: "JavaScript",
        children: [
          ["/JavaScript/防抖和节流", "防抖和节流"],
          ["/JavaScript/AST抽象语法树", "AST抽象语法树"],
          ["/JavaScript/call,apply,bind.md", "call,apply,bind"],
          ["/JavaScript/函数柯里化", "函数柯里化"],
          ["/JavaScript/大数计算", "大数计算"],
          ["/JavaScript/相等运算符==的细节", "相等运算符==的细节"],
          ["/JavaScript/继承的6种实现方式", "继承的6种实现方式"],
          [
            "/JavaScript/解读this的知识铺垫 - ECMA规范",
            "解读this的知识铺垫 - ECMA规范"
          ],
          ["/JavaScript/译文：解读this", "译文：解读this"],
          [
            "/JavaScript/实现同步和异步版本的sleep",
            "实现同步和异步版本的sleep"
          ],
          [
            "/JavaScript/实现一个可以连续传参的累加函数",
            "实现一个可以连续传参的累加函数"
          ],
          ["/JavaScript/字符串字串操作", "字符串字串操作"]
        ]
      },
      {
        title: "前端",
        children: [
          ["/前端/缓存机制", "缓存机制"],
          ["/前端/模块化", "模块化"],
          ["/前端/前端工程化", "前端工程化"],
          ["/前端/Web开发者性能优化最佳实践", "Web开发者性能优化最佳实践"],
          ["/前端/语义化", "语义化"],
          [
            "/前端/script标签中async和defer的区别",
            "script标签中async和defer的区别"
          ],
          ["/前端/https原理及流程", "https原理及流程"],
          ["/前端/xss攻击", "xss攻击"],
          ["/前端/Event Loop", "Event Loop"]
        ]
      },
      {
        title: "数据结构",
        children: [["/数据结构/链表", "链表"]]
      },
      {
        title: "Webpack",
        children: [
          ["/Webpack/HelloWorld", "HelloWorld"],
          ["/Webpack/Loader", "Loader"],
          ["/Webpack/Plugin", "Plugin"],
          ["/Webpack/devServer", "devServer"]
        ]
      },
      {
        title: "flutter",
        children: [["/flutter/windows环境安装与配置", "windows环境安装与配置"]]
      },
      {
        title: "正则表达式",
        children: [
          ["/正则表达式/金额格式化", "金额格式化"],
          ["/正则表达式/实现模板字符串", "实现模板字符串"],
          ["/正则表达式/表单校验", "表单校验"],
          ["/正则表达式/匹配规则速查表", "匹配规则速查表"]
        ]
      }
    ]
  }
};

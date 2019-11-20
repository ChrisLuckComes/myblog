# sass 共用代码 @include 和 @extend

@include 主要是用来调用@mixin 定义的函数模块。在@mixin 中可以定义一个相似功能样式，而且可以设置变量、定义参数和默认参数值；  
@extend 主要是用来调用.class 或者%placeholders 定义的属性模块；在.class 或者%placeholders 中可以定义一个相同样式，但这里面不能定义参数；  
@include 每次调用相同的@mixin 时，编译出来的 CSS 相同样式不会进行合并；  
@extend 每次调用相同的 .class 时，如果.class 在样式出现多次，那么编译出来的 CSS 有可能不是您需要的样式；  
@extend 每次调用相同的%placeholders 时，编译出来的 CSS 相同样式会进行合并。

使用 Mixins 和继承的细节
不要使用没有设置参数的@mixin，他们应该是.class 或者%placeholders;  
不要轻意（从不使用）@extend 调用.class。会得到你意想不到的结果，特别是定义的.class 出现在嵌套或其他的样式表中，你应该使用@extend 调用%placeholders;  
不要使用太深的选择器嵌套。  
如果你能避免，不要使用标签名，比 id 或者类名的性能要更低；  
不要使用子选择器符号>，在 SASS 中很无效；  
不要使用同史选择器+，配合你当前的标记他是非常无效。  
不要太相信 SASS 的自动编译，你应该时时检查生成的 CSS。在 SASS 中纠错能力比较差；

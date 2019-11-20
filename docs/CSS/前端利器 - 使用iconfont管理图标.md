# 前端利器 - 使用 iconfont 管理图标

**[iconfont](https://www.iconfont.cn)**:阿里妈妈 MUX 倾力打造的矢量图标管理、交流平台。
设计师将图标上传到 Iconfont 平台，用户可以自定义下载多种格式的 icon，平台也可将图标转换为字体，便于前端工程师自由调整与调用。

在 iconfont.cn 准备好图标后，使用方式有两种：

1. 可生成 CDN 连接，项目引用即可
   //at.alicdn.com/t/font_1059753_a09qtakulsf.css

2. 下载使用
   解压，并 import iconfont.css
   @import "./iconfont/iconfont.css";

iconfont 支持 unicode,fontclass,symbol 三种方式，其中 fontclass 只支持单色图标，如多色需要用 symbol 方式

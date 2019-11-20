# 开始

## 使用镜像

由于网络限制，flutter 官方提供了临时镜像，在用户环境变量下添加：

```
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

## 依赖项

首先要安装[Git for windows](https://git-scm.com/download/win)

> 如果已安装 Git for Windows，请确保命令提示符或 PowerShell 中运行 git 命令，不然在后面运行 flutter doctor 时将出现 Unable to find git in your PATH 错误, 此时需要手动添加 C:\Program Files\Git\bin 至 Path 系统环境变量中。

## 获取 Flutter SDK

1. 点击下载官网安装包 [点击下载](https://flutter.dev/docs/development/tools/sdk/releases#windows)

也可以去[github](https://github.com/flutter/flutter/releases)下载

2. 将安装包解压到你想要安装的路径，不要安装到 C 盘里需要高权限的路径。

3. 在安装目录的 flutter 文件下找到`flutter_console.bat`运行，完成后就可以输入 flutter 命令了。

**更新环境变量**

- 在用户变量 Path 追加 flutter\bin 路径

重启 windows

## 运行 flutter doctor

打开 cmd 或者 powershell，运行`flutter doctor`

该命令检查您的环境并在终端窗口中显示报告。Dart SDK 已经在捆绑在 Flutter 里了，没有必要单独安装 Dart。 仔细检查命令行输出以获取可能需要安装的其他软件或进一步需要执行的任务（以粗体显示）

例如

```
[-] Android toolchain - develop for Android devices
    • Android SDK at D:\Android\sdk
    ✗ Android SDK is missing command line tools; download from https://goo.gl/XxQghQ
    • Try re-installing or updating your Android SDK,
      visit https://flutter.io/setup/#android-setup for detailed instructions.
```

## 安装 Android Studio

1. 点击下载[Android Studio](http://www.android-studio.org/)

2. 安装完后，根据安装向导一路向下，会安装最新的 Android SDK 以及平台工具、构建工具，这都是 Flutter Android 开发所必备的

3. 设置模拟器。点击 AVD Manager，选择 Create Virtual Device，选择一个设备，一路向下完成后，启动模拟器。

## VS Code 配置

1. 启动 VS Code
2. 点击插件（Extensions），搜索 flutter，安装完成后重启 VS Code
3. CTRL+\`打开一个 CMD 终端，输入`fluter doctor`，没问题后就可以使用 VS Code 来开发 Flutter 了。

## Hello World

打开 VS Code

1. 在终端内输入 flutter create，输入名称和目录后创建项目。
2. 完成后，进入项目目录,按 F5 启动
3. 如果一切正常，在打开的模拟器上就能看到Hello world界面


![](https://flutterchina.club/images/flutter-starter-app-android.png)

Flutter 支持热重载，编辑完后保存即可看到更改。

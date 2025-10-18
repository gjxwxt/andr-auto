# Android 开发环境配置指南

## 方案 1：使用 Android Studio（推荐）

### 1. 下载和安装 Android Studio

1. 访问 https://developer.android.com/studio
2. 下载最新版本的 Android Studio
3. 运行安装程序，选择"Standard"安装
4. 安装完成后启动 Android Studio，完成初始设置

### 2. 配置环境变量（Windows）

在系统环境变量中添加：

```
ANDROID_HOME = C:\Users\你的用户名\AppData\Local\Android\Sdk
ANDROID_SDK_ROOT = C:\Users\你的用户名\AppData\Local\Android\Sdk
```

在 PATH 中添加：

```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
```

### 3. 验证安装

```bash
# 检查Android SDK
adb version

# 检查Capacitor
npx cap doctor
```

## 方案 2：使用命令行工具

### 1. 安装 Android SDK 命令行工具

1. 下载 Android SDK 命令行工具
2. 解压到某个目录，如 `C:\Android\Sdk`
3. 设置环境变量：
   ```
   ANDROID_HOME = C:\Android\Sdk
   ANDROID_SDK_ROOT = C:\Android\Sdk
   ```

### 2. 安装必要的 SDK 组件

```bash
# 使用sdkmanager安装组件
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"
```

## 方案 3：使用 Docker（高级用户）

如果你熟悉 Docker，可以使用预配置的 Android 开发环境。

## 快速解决方案

### 临时解决方案：直接构建 APK

如果只是想要 APK 文件，可以：

1. 安装 Android Studio
2. 打开项目：`npx cap open android`
3. 在 Android Studio 中：
   - 点击 "Build" -> "Build Bundle(s) / APK(s)" -> "Build APK(s)"
   - 等待构建完成
   - APK 文件位置：`android/app/build/outputs/apk/debug/app-debug.apk`

### 使用在线构建服务

- 使用 GitHub Actions 自动构建
- 使用 GitLab CI/CD
- 使用第三方构建服务

## 故障排除

### 1. 环境变量问题

```bash
# Windows PowerShell
$env:ANDROID_HOME = "C:\Users\你的用户名\AppData\Local\Android\Sdk"
$env:ANDROID_SDK_ROOT = "C:\Users\你的用户名\AppData\Local\Android\Sdk"

# 添加到PATH
$env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools"
```

### 2. 权限问题

确保你有足够的权限安装软件和修改环境变量。

### 3. 网络问题

如果下载速度慢，可以配置代理或使用国内镜像。

## 验证配置

安装完成后，运行以下命令验证：

```bash
# 检查Capacitor配置
npx cap doctor

# 检查Android SDK
adb version

# 检查可用设备
adb devices
```

如果所有检查都通过，就可以运行：

```bash
pnpm android:run
```

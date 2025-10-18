# 自动化插件设计 - 部署指南

## 概述

本指南将帮助你将自动化插件设计应用部署到 Android 设备上，实现真正的自动化功能。

## 前置要求

### 1. 开发环境

- Node.js 18+
- pnpm 包管理器
- Android Studio
- Java JDK 11+

### 2. Android 设备要求

- Android 6.0 (API 23) 或更高版本
- 开启开发者选项和 USB 调试
- 允许安装未知来源应用

## 部署步骤

### 第一步：构建 Web 应用

```bash
# 安装依赖
pnpm install

# 构建Web应用
pnpm build
```

### 第二步：同步到 Android 平台

```bash
# 同步Web资源到Android项目
npx cap sync

# 打开Android Studio
npx cap open android
```

### 第三步：配置 Android 项目

#### 1. 权限配置

确保 `android/app/src/main/AndroidManifest.xml` 包含以下权限：

```xml
<!-- 悬浮窗权限 -->
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />

<!-- 无障碍服务权限 -->
<uses-permission android:name="android.permission.BIND_ACCESSIBILITY_SERVICE" />

<!-- 屏幕截图权限 -->
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

<!-- 应用启动权限 -->
<uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" />
```

#### 2. 无障碍服务配置

在 `android/app/src/main/res/xml/accessibility_service_config.xml` 中配置无障碍服务。

#### 3. 插件注册

确保在 `MainActivity.java` 中注册自定义插件：

```java
import com.automation.plugin.FloatingWindowPlugin;
import com.automation.plugin.AutomationPlugin;

// 在onCreate方法中注册插件
this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
    add(FloatingWindowPlugin.class);
    add(AutomationPlugin.class);
}});
```

### 第四步：构建 APK

#### 方法 1：使用命令行

```bash
# 构建并运行
pnpm android:run

# 或者只构建
pnpm android:build
```

#### 方法 2：使用 Android Studio

1. 打开 Android Studio
2. 打开 `android` 文件夹
3. 等待 Gradle 同步完成
4. 点击 "Build" -> "Build Bundle(s) / APK(s)" -> "Build APK(s)"

### 第五步：安装和配置

#### 1. 安装 APK

```bash
# 通过ADB安装
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

#### 2. 配置权限

安装后需要手动配置以下权限：

**悬浮窗权限：**

1. 打开设置 -> 应用管理 -> 自动化插件设计
2. 权限管理 -> 悬浮窗权限 -> 允许

**无障碍服务权限：**

1. 打开设置 -> 辅助功能 -> 已安装的服务
2. 找到"自动化插件设计"并开启
3. 确认授权

#### 3. 测试功能

1. 启动应用
2. 创建一个测试插件
3. 点击"执行"按钮
4. 检查悬浮窗是否显示
5. 测试自动化功能

## 功能说明

### 1. 悬浮窗功能

- 真正的系统级悬浮窗
- 支持拖拽移动
- 跨应用显示
- 点击执行/暂停脚本

### 2. 自动化功能

- **点击操作**：精确坐标点击
- **滑动操作**：支持自定义路径和时长
- **文本输入**：自动输入指定文本
- **应用跳转**：启动指定应用
- **屏幕截图**：获取当前屏幕内容
- **颜色匹配**：检查指定位置颜色
- **图像匹配**：模板图像识别
- **OCR 识别**：文字内容识别

### 3. 条件判断

- **颜色匹配**：检查屏幕指定位置颜色
- **图像匹配**：模板图像识别
- **文字识别**：OCR 文字内容检查
- **元素检测**：UI 元素存在性检查
- **通知监听**：系统通知检测
- **应用检查**：当前前台应用判断
- **设备状态**：屏幕方向、充电状态等
- **时间判断**：定时执行条件
- **变量判断**：脚本变量条件
- **随机延迟**：模拟人工操作

## 故障排除

### 1. 悬浮窗不显示

- 检查悬浮窗权限是否开启
- 确认应用在后台运行
- 重启应用

### 2. 自动化功能不工作

- 检查无障碍服务权限
- 确认目标应用可访问
- 检查坐标和参数设置

### 3. 构建失败

- 检查 Android Studio 版本
- 确认 Gradle 版本兼容性
- 清理项目重新构建

### 4. 权限问题

- 手动在设置中开启所有权限
- 重启设备
- 重新安装应用

## 高级配置

### 1. 自定义插件

可以在 `src/plugins/` 目录下添加更多自定义插件。

### 2. 原生功能扩展

在 `android/app/src/main/java/com/automation/plugin/` 目录下添加更多原生功能。

### 3. 性能优化

- 调整脚本执行间隔
- 优化图像匹配算法
- 减少内存占用

## 注意事项

1. **安全性**：自动化功能可能被恶意利用，请谨慎使用
2. **兼容性**：不同 Android 版本可能有差异
3. **性能**：长时间运行可能影响设备性能
4. **权限**：需要用户手动授权多个敏感权限

## 技术支持

如遇到问题，请检查：

1. 设备 Android 版本是否支持
2. 权限是否正确配置
3. 应用版本是否最新
4. 日志输出中的错误信息

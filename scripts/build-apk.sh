#!/bin/bash

echo "🚀 自动化插件设计 - APK构建脚本"
echo "=================================="

# 检查是否安装了必要的工具
check_requirements() {
    echo "📋 检查构建要求..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js 未安装"
        exit 1
    fi
    
    if ! command -v pnpm &> /dev/null; then
        echo "❌ pnpm 未安装"
        exit 1
    fi
    
    echo "✅ 基础要求满足"
}

# 构建Web应用
build_web() {
    echo "🌐 构建Web应用..."
    pnpm install
    pnpm build
    echo "✅ Web应用构建完成"
}

# 同步到Android
sync_android() {
    echo "📱 同步到Android平台..."
    npx cap sync
    echo "✅ Android同步完成"
}

# 提供构建选项
show_options() {
    echo ""
    echo "请选择构建方式："
    echo "1. 使用Android Studio构建（需要安装Android Studio）"
    echo "2. 使用命令行构建（需要配置Android SDK）"
    echo "3. 使用Docker构建（需要安装Docker）"
    echo "4. 使用GitHub Actions构建（需要推送到GitHub）"
    echo "5. 退出"
    echo ""
    read -p "请输入选项 (1-5): " choice
    
    case $choice in
        1)
            echo "🔧 打开Android Studio..."
            npx cap open android
            ;;
        2)
            echo "⚡ 使用命令行构建..."
            if command -v adb &> /dev/null; then
                cd android && ./gradlew assembleDebug
            else
                echo "❌ 未找到Android SDK，请先配置环境"
                echo "📖 请参考 ANDROID_SETUP.md 文件"
            fi
            ;;
        3)
            echo "🐳 使用Docker构建..."
            if command -v docker &> /dev/null; then
                docker build -t automation-plugin .
                docker run -v $(pwd)/output:/app/output automation-plugin
            else
                echo "❌ Docker未安装"
            fi
            ;;
        4)
            echo "☁️ 使用GitHub Actions构建..."
            echo "请将代码推送到GitHub仓库，然后查看Actions页面"
            ;;
        5)
            echo "👋 退出"
            exit 0
            ;;
        *)
            echo "❌ 无效选项"
            show_options
            ;;
    esac
}

# 主函数
main() {
    check_requirements
    build_web
    sync_android
    show_options
}

# 运行主函数
main

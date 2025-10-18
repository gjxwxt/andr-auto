FROM node:18-alpine

# 安装必要的工具
RUN apk add --no-cache openjdk11-jdk

# 设置工作目录
WORKDIR /app

# 复制package文件
COPY package.json pnpm-lock.yaml ./

# 安装pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 构建Web应用
RUN pnpm build

# 安装Capacitor CLI
RUN npm install -g @capacitor/cli

# 同步到Android
RUN npx cap sync

# 设置Android SDK环境变量
ENV ANDROID_HOME=/opt/android-sdk
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# 安装Android SDK
RUN mkdir -p $ANDROID_HOME && \
    cd $ANDROID_HOME && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip && \
    unzip commandlinetools-linux-9477386_latest.zip && \
    rm commandlinetools-linux-9477386_latest.zip

# 接受Android SDK许可证
RUN yes | $ANDROID_HOME/cmdline-tools/bin/sdkmanager --licenses

# 安装必要的SDK组件
RUN $ANDROID_HOME/cmdline-tools/bin/sdkmanager \
    "platform-tools" \
    "platforms;android-33" \
    "build-tools;33.0.0"

# 构建APK
WORKDIR /app/android
RUN ./gradlew assembleDebug

# 复制APK到输出目录
RUN mkdir -p /app/output && \
    cp app/build/outputs/apk/debug/app-debug.apk /app/output/

WORKDIR /app
CMD ["ls", "-la", "/app/output/"]

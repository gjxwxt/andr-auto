import { registerPlugin } from "@capacitor/core";

export interface AutomationPlugin {
  /**
   * 执行点击操作
   */
  click(options: { x: number; y: number }): Promise<void>;

  /**
   * 执行滑动操作
   */
  swipe(options: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    duration: number;
  }): Promise<void>;

  /**
   * 发送文本
   */
  sendText(options: { text: string }): Promise<void>;

  /**
   * 跳转到应用
   */
  launchApp(options: { packageName: string }): Promise<void>;

  /**
   * 获取屏幕截图
   */
  takeScreenshot(): Promise<{ data: string }>;

  /**
   * 检查颜色匹配
   */
  checkColorMatch(options: {
    x: number;
    y: number;
    color: string;
    tolerance: number;
  }): Promise<{ matched: boolean }>;

  /**
   * 检查图像匹配
   */
  checkImageMatch(options: {
    x: number;
    y: number;
    width: number;
    height: number;
    template: string;
    similarity: number;
  }): Promise<{ matched: boolean }>;

  /**
   * OCR文字识别
   */
  ocrText(options: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): Promise<{ text: string }>;

  /**
   * 检查无障碍服务权限
   */
  checkAccessibilityPermission(): Promise<{ granted: boolean }>;

  /**
   * 请求无障碍服务权限
   */
  requestAccessibilityPermission(): Promise<{ granted: boolean }>;
}

const Automation = registerPlugin<AutomationPlugin>("Automation", {
  web: () =>
    import("./AutomationPluginWeb").then((m) => new m.AutomationPluginWeb()),
});

export default Automation;

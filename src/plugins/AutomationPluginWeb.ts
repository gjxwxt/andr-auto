import { WebPlugin } from "@capacitor/core";
import type { AutomationPlugin } from "./AutomationPlugin";

export class AutomationPluginWeb extends WebPlugin implements AutomationPlugin {
  async click(options: { x: number; y: number }): Promise<void> {
    console.log("Web平台不支持点击操作:", options);
    throw new Error("Web平台不支持点击操作");
  }

  async swipe(options: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    duration: number;
  }): Promise<void> {
    console.log("Web平台不支持滑动操作:", options);
    throw new Error("Web平台不支持滑动操作");
  }

  async sendText(options: { text: string }): Promise<void> {
    console.log("Web平台不支持文本输入:", options);
    throw new Error("Web平台不支持文本输入");
  }

  async launchApp(options: { packageName: string }): Promise<void> {
    console.log("Web平台不支持应用启动:", options);
    throw new Error("Web平台不支持应用启动");
  }

  async takeScreenshot(): Promise<{ data: string }> {
    console.log("Web平台不支持屏幕截图");
    throw new Error("Web平台不支持屏幕截图");
  }

  async checkColorMatch(options: {
    x: number;
    y: number;
    color: string;
    tolerance: number;
  }): Promise<{ matched: boolean }> {
    console.log("Web平台不支持颜色匹配:", options);
    return { matched: false };
  }

  async checkImageMatch(options: {
    x: number;
    y: number;
    width: number;
    height: number;
    template: string;
    similarity: number;
  }): Promise<{ matched: boolean }> {
    console.log("Web平台不支持图像匹配:", options);
    return { matched: false };
  }

  async ocrText(options: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): Promise<{ text: string }> {
    console.log("Web平台不支持OCR识别:", options);
    return { text: "" };
  }

  async checkAccessibilityPermission(): Promise<{ granted: boolean }> {
    return { granted: false };
  }

  async requestAccessibilityPermission(): Promise<{ granted: boolean }> {
    return { granted: false };
  }
}

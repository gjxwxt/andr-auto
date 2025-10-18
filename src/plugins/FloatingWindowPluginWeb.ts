import { WebPlugin } from "@capacitor/core";
import type { FloatingWindowPlugin } from "./FloatingWindowPlugin";

export class FloatingWindowPluginWeb
  extends WebPlugin
  implements FloatingWindowPlugin
{
  async show(options: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): Promise<void> {
    console.log("Web平台不支持悬浮窗功能");
    throw new Error("Web平台不支持悬浮窗功能");
  }

  async hide(): Promise<void> {
    console.log("Web平台不支持悬浮窗功能");
    throw new Error("Web平台不支持悬浮窗功能");
  }

  async updatePosition(options: { x: number; y: number }): Promise<void> {
    console.log("Web平台不支持悬浮窗功能");
    throw new Error("Web平台不支持悬浮窗功能");
  }

  async checkPermission(): Promise<{ granted: boolean }> {
    return { granted: false };
  }

  async requestPermission(): Promise<{ granted: boolean }> {
    return { granted: false };
  }
}

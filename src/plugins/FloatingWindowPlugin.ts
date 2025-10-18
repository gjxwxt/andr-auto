import { registerPlugin } from "@capacitor/core";

export interface FloatingWindowPlugin {
  /**
   * 显示悬浮窗
   */
  show(options: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): Promise<void>;

  /**
   * 隐藏悬浮窗
   */
  hide(): Promise<void>;

  /**
   * 更新悬浮窗位置
   */
  updatePosition(options: { x: number; y: number }): Promise<void>;

  /**
   * 检查悬浮窗权限
   */
  checkPermission(): Promise<{ granted: boolean }>;

  /**
   * 请求悬浮窗权限
   */
  requestPermission(): Promise<{ granted: boolean }>;
}

const FloatingWindow = registerPlugin<FloatingWindowPlugin>("FloatingWindow", {
  web: () =>
    import("./FloatingWindowPluginWeb").then(
      (m) => new m.FloatingWindowPluginWeb()
    ),
});

export default FloatingWindow;

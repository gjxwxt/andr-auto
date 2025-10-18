// 本地存储管理
export class PluginStorage {
  private static STORAGE_KEY = "automation_plugins";

  static savePlugins(plugins: Plugin[]): void {
    try {
      const data = JSON.stringify(plugins);
      localStorage.setItem(this.STORAGE_KEY, data);
    } catch (error) {
      console.error("保存插件数据失败:", error);
    }
  }

  static loadPlugins(): Plugin[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const plugins = JSON.parse(data);
        // 转换日期对象
        return plugins.map((plugin: any) => ({
          ...plugin,
          createdAt: new Date(plugin.createdAt),
          updatedAt: new Date(plugin.updatedAt),
        }));
      }
    } catch (error) {
      console.error("加载插件数据失败:", error);
    }
    return [];
  }

  static clearPlugins(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

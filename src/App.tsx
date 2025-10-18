import { useState, useEffect } from "react";
import { Plugin } from "./types/plugin";
import { mockPlugins } from "./lib/mock-data";
import { PluginStorage } from "./lib/storage";
import { ScriptEngine } from "./lib/script-engine";
import { PluginCard } from "./components/PluginCard";
import { PluginEditor } from "./components/PluginEditor";
import { FloatingWidget } from "./components/FloatingWidget";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import { ScrollArea } from "./components/ui/scroll-area";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

type View = "list" | "editor";

export default function App() {
  const [view, setView] = useState<View>("list");
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [editingPluginId, setEditingPluginId] = useState<string | null>(null);
  const [runningPluginId, setRunningPluginId] = useState<string | null>(null);
  const [scriptEngine] = useState(() => new ScriptEngine());
  const [isScriptRunning, setIsScriptRunning] = useState(false);

  // 加载保存的插件数据
  useEffect(() => {
    const savedPlugins = PluginStorage.loadPlugins();
    if (savedPlugins.length > 0) {
      setPlugins(savedPlugins);
    } else {
      setPlugins(mockPlugins);
      PluginStorage.savePlugins(mockPlugins);
    }
  }, []);

  const editingPlugin = editingPluginId
    ? plugins.find((p) => p.id === editingPluginId) || null
    : null;

  const handleCreateNew = () => {
    setEditingPluginId(null);
    setView("editor");
  };

  const handleEdit = (id: string) => {
    setEditingPluginId(id);
    setView("editor");
  };

  const handleDelete = (id: string) => {
    const updatedPlugins = plugins.filter((p) => p.id !== id);
    setPlugins(updatedPlugins);
    PluginStorage.savePlugins(updatedPlugins);
    toast.success("插件已删除");
  };

  const handleSave = (plugin: Plugin) => {
    let updatedPlugins: Plugin[];

    if (editingPluginId) {
      // 更新现有插件
      updatedPlugins = plugins.map((p) => (p.id === plugin.id ? plugin : p));
      toast.success("插件已更新");
    } else {
      // 创建新插件
      updatedPlugins = [...plugins, plugin];
      toast.success("插件已创建");
    }

    setPlugins(updatedPlugins);
    PluginStorage.savePlugins(updatedPlugins);
    setView("list");
    setEditingPluginId(null);
  };

  const handleToggleRun = (id: string) => {
    const plugin = plugins.find((p) => p.id === id);
    if (!plugin) return;

    if (plugin.status === "running") {
      // 停止运行
      setPlugins(
        plugins.map((p) => (p.id === id ? { ...p, status: "enabled" } : p))
      );
      setRunningPluginId(null);
      toast.info("插件已停止");
    } else {
      // 开始运行
      if (plugin.steps.length === 0) {
        toast.error("插件没有配置任何步骤");
        return;
      }
      setPlugins(
        plugins.map((p) => (p.id === id ? { ...p, status: "running" } : p))
      );
      setRunningPluginId(id);
      toast.success("插件已启动，点击悬浮窗开始执行");
    }
  };

  const handleFloatingWidgetToggle = async () => {
    if (!runningPluginId) return;

    const plugin = plugins.find((p) => p.id === runningPluginId);
    if (!plugin) return;

    if (isScriptRunning) {
      // 停止脚本
      scriptEngine.stop();
      setIsScriptRunning(false);
      toast.info("脚本已停止");
    } else {
      // 开始执行脚本
      try {
        setIsScriptRunning(true);
        toast.info(`正在执行：${plugin.name}`);

        await scriptEngine.executePlugin(plugin);

        toast.success("脚本执行完成");
      } catch (error) {
        toast.error("脚本执行失败");
        console.error("脚本执行错误:", error);
      } finally {
        setIsScriptRunning(false);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {view === "list" ? (
        <>
          {/* 主页 - 插件列表 */}
          <div className="border-b bg-background p-4">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <h1>自动化插件</h1>
              <Button onClick={handleCreateNew}>
                <Plus className="h-4 w-4 mr-2" />
                新增插件
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="max-w-4xl mx-auto p-6">
              {plugins.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>还没有创建任何插件</p>
                  <p className="text-sm mt-2">
                    点击右上角"新增插件"按钮开始创建
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {plugins.map((plugin) => (
                    <PluginCard
                      key={plugin.id}
                      plugin={plugin}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onToggleRun={handleToggleRun}
                    />
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </>
      ) : (
        /* 编辑器视图 */
        <PluginEditor
          plugin={editingPlugin}
          onSave={handleSave}
          onBack={() => {
            setView("list");
            setEditingPluginId(null);
          }}
        />
      )}

      {/* 悬浮窗 - 仅在有插件运行时显示 */}
      {runningPluginId && (
        <FloatingWidget
          isRunning={isScriptRunning}
          onToggle={handleFloatingWidgetToggle}
        />
      )}

      <Toaster />
    </div>
  );
}

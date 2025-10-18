import { Plugin, Step } from '@/types/plugin';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { StepCard } from './StepCard';
import { ArrowLeft, Plus, Save } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { useState, useEffect } from 'react';

interface PluginEditorProps {
  plugin: Plugin | null;
  onSave: (plugin: Plugin) => void;
  onBack: () => void;
}

export function PluginEditor({ plugin, onSave, onBack }: PluginEditorProps) {
  const [editingPlugin, setEditingPlugin] = useState<Plugin>(
    plugin || {
      id: `p${Date.now()}`,
      name: '',
      description: '',
      targetApp: '',
      status: 'disabled' as const,
      steps: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  );

  useEffect(() => {
    if (plugin) {
      setEditingPlugin(plugin);
    }
  }, [plugin]);

  const updateField = (field: keyof Plugin, value: any) => {
    setEditingPlugin({ ...editingPlugin, [field]: value });
  };

  const addStep = () => {
    const newStep: Step = {
      id: `s${Date.now()}`,
      name: `步骤 ${editingPlugin.steps.length + 1}`,
      actions: []
    };
    updateField('steps', [...editingPlugin.steps, newStep]);
  };

  const updateStep = (index: number, step: Step) => {
    const newSteps = [...editingPlugin.steps];
    newSteps[index] = step;
    updateField('steps', newSteps);
  };

  const deleteStep = (index: number) => {
    const newSteps = editingPlugin.steps.filter((_, i) => i !== index);
    updateField('steps', newSteps);
  };

  const handleSave = () => {
    onSave({
      ...editingPlugin,
      updatedAt: new Date()
    });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* 顶部导航栏 */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1>
              {plugin ? '编辑插件' : '新建插件'}
            </h1>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            保存
          </Button>
        </div>
      </div>

      {/* 主内容区 */}
      <ScrollArea className="flex-1">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* 基础信息 */}
          <div className="space-y-4">
            <h2>基础信息</h2>
            <div className="space-y-4">
              <div>
                <Label>插件名称 *</Label>
                <Input
                  value={editingPlugin.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="例如：微信抢红包"
                />
              </div>
              <div>
                <Label>插件说明</Label>
                <Textarea
                  value={editingPlugin.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="简要描述插件的用途"
                  rows={3}
                />
              </div>
              <div>
                <Label>目标应用包名（可选）</Label>
                <Input
                  value={editingPlugin.targetApp}
                  onChange={(e) => updateField('targetApp', e.target.value)}
                  placeholder="例如：com.tencent.mm"
                />
              </div>
            </div>
          </div>

          {/* 脚本逻辑 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2>脚本逻辑</h2>
              <Button onClick={addStep}>
                <Plus className="h-4 w-4 mr-2" />
                添加步骤
              </Button>
            </div>

            {editingPlugin.steps.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                <p>还没有添加步骤</p>
                <p className="text-sm mt-2">点击上方"添加步骤"按钮开始创建脚本</p>
              </div>
            ) : (
              <div className="space-y-4">
                {editingPlugin.steps.map((step, index) => (
                  <StepCard
                    key={step.id}
                    step={step}
                    stepNumber={index + 1}
                    onChange={(updatedStep) => updateStep(index, updatedStep)}
                    onDelete={() => deleteStep(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* 底部操作栏 */}
      <div className="border-t bg-background p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Button variant="outline" onClick={onBack}>
            取消
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleSave}>
              保存草稿
            </Button>
            <Button onClick={handleSave}>
              保存并启用
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

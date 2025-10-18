import { ActionType } from '@/types/plugin';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface ActionFormProps {
  type: ActionType;
  params: Record<string, any>;
  onChange: (params: Record<string, any>) => void;
}

export function ActionForm({ type, params, onChange }: ActionFormProps) {
  const updateParam = (key: string, value: any) => {
    onChange({ ...params, [key]: value });
  };

  switch (type) {
    case 'click':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>X 坐标</Label>
              <Input
                type="number"
                value={params.x || ''}
                onChange={(e) => updateParam('x', parseInt(e.target.value))}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Y 坐标</Label>
              <Input
                type="number"
                value={params.y || ''}
                onChange={(e) => updateParam('y', parseInt(e.target.value))}
                placeholder="0"
              />
            </div>
          </div>
        </div>
      );

    case 'swipe':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>起点 X</Label>
              <Input
                type="number"
                value={params.startX || ''}
                onChange={(e) => updateParam('startX', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>起点 Y</Label>
              <Input
                type="number"
                value={params.startY || ''}
                onChange={(e) => updateParam('startY', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>终点 X</Label>
              <Input
                type="number"
                value={params.endX || ''}
                onChange={(e) => updateParam('endX', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>终点 Y</Label>
              <Input
                type="number"
                value={params.endY || ''}
                onChange={(e) => updateParam('endY', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div>
            <Label>持续时间 (ms)</Label>
            <Input
              type="number"
              value={params.duration || ''}
              onChange={(e) => updateParam('duration', parseInt(e.target.value))}
              placeholder="300"
            />
          </div>
        </div>
      );

    case 'wait':
      return (
        <div className="space-y-3">
          <div>
            <Label>等待时间 (ms)</Label>
            <Input
              type="number"
              value={params.duration || ''}
              onChange={(e) => updateParam('duration', parseInt(e.target.value))}
              placeholder="1000"
            />
          </div>
        </div>
      );

    case 'jumpApp':
      return (
        <div className="space-y-3">
          <div>
            <Label>目标应用包名</Label>
            <Input
              value={params.packageName || ''}
              onChange={(e) => updateParam('packageName', e.target.value)}
              placeholder="com.example.app"
            />
          </div>
        </div>
      );

    case 'sendText':
      return (
        <div className="space-y-3">
          <div>
            <Label>文本内容</Label>
            <Textarea
              value={params.text || ''}
              onChange={(e) => updateParam('text', e.target.value)}
              placeholder="输入要发送的文本"
              rows={3}
            />
          </div>
        </div>
      );

    case 'stopScript':
      return (
        <div className="text-sm text-muted-foreground">
          此操作将停止脚本执行
        </div>
      );

    case 'jumpToStep':
      return (
        <div className="space-y-3">
          <div>
            <Label>跳转到步骤</Label>
            <Input
              type="number"
              value={params.stepIndex || ''}
              onChange={(e) => updateParam('stepIndex', parseInt(e.target.value))}
              placeholder="1"
              min="1"
            />
          </div>
        </div>
      );

    case 'modifyVariable':
      return (
        <div className="space-y-3">
          <div>
            <Label>变量名称</Label>
            <Input
              value={params.variableName || ''}
              onChange={(e) => updateParam('variableName', e.target.value)}
              placeholder="successCount"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>操作</Label>
              <Input
                value={params.operation || ''}
                onChange={(e) => updateParam('operation', e.target.value)}
                placeholder="增加/减少/设置"
              />
            </div>
            <div>
              <Label>值</Label>
              <Input
                type="number"
                value={params.value || ''}
                onChange={(e) => updateParam('value', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

import { ConditionType } from '@/types/plugin';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';

interface ConditionFormProps {
  type: ConditionType;
  params: Record<string, any>;
  onChange: (params: Record<string, any>) => void;
}

export function ConditionForm({ type, params, onChange }: ConditionFormProps) {
  const updateParam = (key: string, value: any) => {
    onChange({ ...params, [key]: value });
  };

  switch (type) {
    case 'colorMatch':
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
          <div>
            <Label>目标颜色</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={params.color || ''}
                onChange={(e) => updateParam('color', e.target.value)}
                placeholder="#FF5722"
              />
              <Input
                type="color"
                value={params.color || '#000000'}
                onChange={(e) => updateParam('color', e.target.value)}
                className="w-16"
              />
            </div>
          </div>
          <div>
            <Label>颜色容差 (%)</Label>
            <Input
              type="number"
              value={params.tolerance || ''}
              onChange={(e) => updateParam('tolerance', parseInt(e.target.value))}
              placeholder="10"
              min="0"
              max="100"
            />
          </div>
        </div>
      );

    case 'imageMatch':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>区域 X</Label>
              <Input
                type="number"
                value={params.x || ''}
                onChange={(e) => updateParam('x', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>区域 Y</Label>
              <Input
                type="number"
                value={params.y || ''}
                onChange={(e) => updateParam('y', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>宽度</Label>
              <Input
                type="number"
                value={params.width || ''}
                onChange={(e) => updateParam('width', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>高度</Label>
              <Input
                type="number"
                value={params.height || ''}
                onChange={(e) => updateParam('height', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div>
            <Label>相似度阈值 (%)</Label>
            <Input
              type="number"
              value={params.similarity || ''}
              onChange={(e) => updateParam('similarity', parseInt(e.target.value))}
              placeholder="80"
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>模板图片</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => updateParam('templateImage', e.target.files?.[0]?.name || '')}
            />
          </div>
        </div>
      );

    case 'textPresence':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>区域 X</Label>
              <Input
                type="number"
                value={params.x || ''}
                onChange={(e) => updateParam('x', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>区域 Y</Label>
              <Input
                type="number"
                value={params.y || ''}
                onChange={(e) => updateParam('y', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>宽度</Label>
              <Input
                type="number"
                value={params.width || ''}
                onChange={(e) => updateParam('width', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>高度</Label>
              <Input
                type="number"
                value={params.height || ''}
                onChange={(e) => updateParam('height', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div>
            <Label>匹配文本</Label>
            <Input
              value={params.text || ''}
              onChange={(e) => updateParam('text', e.target.value)}
              placeholder="输入要查找的文本"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fuzzy"
              checked={params.fuzzyMatch || false}
              onCheckedChange={(checked) => updateParam('fuzzyMatch', checked)}
            />
            <Label htmlFor="fuzzy">模糊匹配</Label>
          </div>
        </div>
      );

    case 'elementId':
      return (
        <div className="space-y-3">
          <div>
            <Label>元素 ID</Label>
            <Input
              value={params.elementId || ''}
              onChange={(e) => updateParam('elementId', e.target.value)}
              placeholder="com.example:id/button"
            />
          </div>
          <div>
            <Label>元素描述 (Content-Desc)</Label>
            <Input
              value={params.contentDesc || ''}
              onChange={(e) => updateParam('contentDesc', e.target.value)}
              placeholder="按钮描述"
            />
          </div>
        </div>
      );

    case 'notification':
      return (
        <div className="space-y-3">
          <div>
            <Label>应用包名</Label>
            <Input
              value={params.packageName || ''}
              onChange={(e) => updateParam('packageName', e.target.value)}
              placeholder="com.tencent.mm"
            />
          </div>
          <div>
            <Label>通知关键词</Label>
            <Input
              value={params.keyword || ''}
              onChange={(e) => updateParam('keyword', e.target.value)}
              placeholder="[微信红包]"
            />
          </div>
        </div>
      );

    case 'appCheck':
      return (
        <div className="space-y-3">
          <div>
            <Label>应用包名</Label>
            <Input
              value={params.packageName || ''}
              onChange={(e) => updateParam('packageName', e.target.value)}
              placeholder="com.example.app"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="foreground"
              checked={params.isForeground !== false}
              onCheckedChange={(checked) => updateParam('isForeground', checked)}
            />
            <Label htmlFor="foreground">必须在前台</Label>
          </div>
        </div>
      );

    case 'deviceState':
      return (
        <div className="space-y-3">
          <div>
            <Label>设备状态</Label>
            <Select
              value={params.state || ''}
              onValueChange={(value) => updateParam('state', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portrait">竖屏</SelectItem>
                <SelectItem value="landscape">横屏</SelectItem>
                <SelectItem value="charging">充电中</SelectItem>
                <SelectItem value="locked">锁屏</SelectItem>
                <SelectItem value="unlocked">解锁</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );

    case 'timeCheck':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>开始时间</Label>
              <Input
                type="time"
                value={params.startTime || ''}
                onChange={(e) => updateParam('startTime', e.target.value)}
              />
            </div>
            <div>
              <Label>结束时间</Label>
              <Input
                type="time"
                value={params.endTime || ''}
                onChange={(e) => updateParam('endTime', e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>周期</Label>
            <Select
              value={params.period || 'daily'}
              onValueChange={(value) => updateParam('period', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">每日</SelectItem>
                <SelectItem value="once">一次</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );

    case 'variableCheck':
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
              <Label>比较操作符</Label>
              <Select
                value={params.operator || ''}
                onValueChange={(value) => updateParam('operator', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择操作符" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="=">=</SelectItem>
                  <SelectItem value=">">{'>'}</SelectItem>
                  <SelectItem value="<">{'<'}</SelectItem>
                  <SelectItem value=">=">{'>='}</SelectItem>
                  <SelectItem value="<=">{'<='}</SelectItem>
                  <SelectItem value="!=">!=</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>目标值</Label>
              <Input
                type="number"
                value={params.targetValue || ''}
                onChange={(e) => updateParam('targetValue', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
      );

    case 'randomWait':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>最小延迟 (ms)</Label>
              <Input
                type="number"
                value={params.minDelay || ''}
                onChange={(e) => updateParam('minDelay', parseInt(e.target.value))}
                placeholder="100"
              />
            </div>
            <div>
              <Label>最大延迟 (ms)</Label>
              <Input
                type="number"
                value={params.maxDelay || ''}
                onChange={(e) => updateParam('maxDelay', parseInt(e.target.value))}
                placeholder="500"
              />
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

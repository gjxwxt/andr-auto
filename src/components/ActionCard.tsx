import { Action, ConditionType, ActionType, LogicOperator } from '@/types/plugin';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ConditionForm } from './ConditionForm';
import { ActionForm } from './ActionForm';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { useState } from 'react';

interface ActionCardProps {
  action: Action;
  onChange: (action: Action) => void;
  onDelete: () => void;
}

const conditionTypeLabels: Record<ConditionType, string> = {
  colorMatch: '区域颜色匹配',
  imageMatch: '图像模板匹配',
  textPresence: '文字内容存在',
  elementId: '元素 ID 存在',
  notification: '收到通知',
  appCheck: '当前应用判断',
  deviceState: '设备方向/状态',
  timeCheck: '计时器判断',
  variableCheck: '脚本变量判断',
  randomWait: '随机延迟'
};

const actionTypeLabels: Record<ActionType, string> = {
  click: '执行点击',
  swipe: '执行滑动',
  wait: '等待',
  jumpApp: '跳转应用',
  sendText: '发送文本',
  stopScript: '停止脚本',
  jumpToStep: '跳转到步骤',
  modifyVariable: '修改变量'
};

export function ActionCard({ action, onChange, onDelete }: ActionCardProps) {
  const [showLogicDialog, setShowLogicDialog] = useState(false);

  const updateCondition = (index: number, condition: any) => {
    const newConditions = [...action.conditions];
    newConditions[index] = {
      ...newConditions[index],
      condition
    };
    onChange({ ...action, conditions: newConditions });
  };

  const addCondition = (operator: LogicOperator) => {
    const newCondition = {
      id: `c${Date.now()}`,
      operator,
      condition: {
        id: `cond${Date.now()}`,
        type: 'colorMatch' as ConditionType,
        params: {}
      }
    };
    onChange({
      ...action,
      conditions: [...action.conditions, newCondition]
    });
    setShowLogicDialog(false);
  };

  const removeCondition = (index: number) => {
    const newConditions = action.conditions.filter((_, i) => i !== index);
    onChange({ ...action, conditions: newConditions });
  };

  const updateConditionType = (index: number, type: ConditionType) => {
    const newConditions = [...action.conditions];
    newConditions[index] = {
      ...newConditions[index],
      condition: {
        ...newConditions[index].condition,
        type,
        params: {}
      }
    };
    onChange({ ...action, conditions: newConditions });
  };

  const updateConditionParams = (index: number, params: Record<string, any>) => {
    const newConditions = [...action.conditions];
    newConditions[index] = {
      ...newConditions[index],
      condition: {
        ...newConditions[index].condition,
        params
      }
    };
    onChange({ ...action, conditions: newConditions });
  };

  const updateActionType = (type: ActionType) => {
    onChange({
      ...action,
      action: {
        type,
        params: {}
      }
    });
  };

  const updateActionParams = (params: Record<string, any>) => {
    onChange({
      ...action,
      action: {
        ...action.action,
        params
      }
    });
  };

  return (
    <>
      <Card className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
            <span className="text-sm">如果满足以下条件...</span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* 判断条件列表 */}
        <div className="space-y-3">
          {action.conditions.map((condGroup, index) => (
            <div key={condGroup.id} className="space-y-2">
              {index > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant={condGroup.operator === 'AND' ? 'default' : 'secondary'}>
                    {condGroup.operator === 'AND' ? '并且' : '或者'}
                  </Badge>
                </div>
              )}
              <div className="border rounded-lg p-3 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Select
                    value={condGroup.condition.type}
                    onValueChange={(value) => updateConditionType(index, value as ConditionType)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="colorMatch">{conditionTypeLabels.colorMatch}</SelectItem>
                      <SelectItem value="imageMatch">{conditionTypeLabels.imageMatch}</SelectItem>
                      <SelectItem value="textPresence">{conditionTypeLabels.textPresence}</SelectItem>
                      <SelectItem value="elementId">{conditionTypeLabels.elementId}</SelectItem>
                      <SelectItem value="notification">{conditionTypeLabels.notification}</SelectItem>
                      <SelectItem value="appCheck">{conditionTypeLabels.appCheck}</SelectItem>
                      <SelectItem value="deviceState">{conditionTypeLabels.deviceState}</SelectItem>
                      <SelectItem value="timeCheck">{conditionTypeLabels.timeCheck}</SelectItem>
                      <SelectItem value="variableCheck">{conditionTypeLabels.variableCheck}</SelectItem>
                      <SelectItem value="randomWait">{conditionTypeLabels.randomWait}</SelectItem>
                    </SelectContent>
                  </Select>
                  {action.conditions.length > 1 && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeCondition(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <ConditionForm
                  type={condGroup.condition.type}
                  params={condGroup.condition.params}
                  onChange={(params) => updateConditionParams(index, params)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 添加条件按钮 */}
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setShowLogicDialog(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          添加判断条件
        </Button>

        {/* 执行操作 */}
        <div className="border-t pt-4 space-y-3">
          <span className="text-sm">则执行：</span>
          <Select
            value={action.action.type}
            onValueChange={(value) => updateActionType(value as ActionType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="click">{actionTypeLabels.click}</SelectItem>
              <SelectItem value="swipe">{actionTypeLabels.swipe}</SelectItem>
              <SelectItem value="wait">{actionTypeLabels.wait}</SelectItem>
              <SelectItem value="jumpApp">{actionTypeLabels.jumpApp}</SelectItem>
              <SelectItem value="sendText">{actionTypeLabels.sendText}</SelectItem>
              <SelectItem value="stopScript">{actionTypeLabels.stopScript}</SelectItem>
              <SelectItem value="jumpToStep">{actionTypeLabels.jumpToStep}</SelectItem>
              <SelectItem value="modifyVariable">{actionTypeLabels.modifyVariable}</SelectItem>
            </SelectContent>
          </Select>
          <ActionForm
            type={action.action.type}
            params={action.action.params}
            onChange={updateActionParams}
          />
        </div>
      </Card>

      {/* 逻辑选择对话框 */}
      <AlertDialog open={showLogicDialog} onOpenChange={setShowLogicDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>选择逻辑关系</AlertDialogTitle>
            <AlertDialogDescription>
              请选择新条件与现有条件的逻辑关系
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addCondition('AND')}
            >
              <span className="mr-2">并且 (AND)</span>
              <span className="text-sm text-muted-foreground">- 必须同时满足所有条件</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addCondition('OR')}
            >
              <span className="mr-2">或者 (OR)</span>
              <span className="text-sm text-muted-foreground">- 满足其中任意条件即可</span>
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

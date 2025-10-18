import { Step, Action } from '@/types/plugin';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ActionCard } from './ActionCard';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useState } from 'react';

interface StepCardProps {
  step: Step;
  stepNumber: number;
  onChange: (step: Step) => void;
  onDelete: () => void;
}

export function StepCard({ step, stepNumber, onChange, onDelete }: StepCardProps) {
  const [isEditingName, setIsEditingName] = useState(false);

  const updateStepName = (name: string) => {
    onChange({ ...step, name });
  };

  const addAction = () => {
    const newAction: Action = {
      id: `a${Date.now()}`,
      conditions: [
        {
          id: `cg${Date.now()}`,
          condition: {
            id: `cond${Date.now()}`,
            type: 'colorMatch',
            params: {}
          }
        }
      ],
      action: {
        type: 'click',
        params: {}
      }
    };
    onChange({
      ...step,
      actions: [...step.actions, newAction]
    });
  };

  const updateAction = (index: number, action: Action) => {
    const newActions = [...step.actions];
    newActions[index] = action;
    onChange({ ...step, actions: newActions });
  };

  const deleteAction = (index: number) => {
    const newActions = step.actions.filter((_, i) => i !== index);
    onChange({ ...step, actions: newActions });
  };

  return (
    <Card className="p-4 space-y-4 bg-muted/30">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 flex-1">
          <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
          <div className="flex items-center gap-2 flex-1">
            <span className="text-sm text-muted-foreground">步骤 {stepNumber}</span>
            {isEditingName ? (
              <Input
                value={step.name}
                onChange={(e) => updateStepName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setIsEditingName(false);
                }}
                autoFocus
                className="h-8"
              />
            ) : (
              <h3
                className="cursor-pointer hover:text-primary"
                onClick={() => setIsEditingName(true)}
              >
                {step.name}
              </h3>
            )}
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* 操作卡片列表 */}
      <div className="space-y-3 ml-8">
        {step.actions.map((action, index) => (
          <ActionCard
            key={action.id}
            action={action}
            onChange={(updatedAction) => updateAction(index, updatedAction)}
            onDelete={() => deleteAction(index)}
          />
        ))}

        {/* 添加操作按钮 */}
        <Button
          variant="outline"
          className="w-full"
          onClick={addAction}
        >
          <Plus className="h-4 w-4 mr-2" />
          添加操作卡片
        </Button>
      </div>
    </Card>
  );
}

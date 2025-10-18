import { Plugin } from '@/types/plugin';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, Pause, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface PluginCardProps {
  plugin: Plugin;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleRun: (id: string) => void;
}

export function PluginCard({ plugin, onEdit, onDelete, onToggleRun }: PluginCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusBadge = (status: Plugin['status']) => {
    const variants = {
      enabled: { variant: 'default' as const, text: '已启用' },
      disabled: { variant: 'secondary' as const, text: '未启用' },
      running: { variant: 'destructive' as const, text: '执行中' }
    };
    const config = variants[status];
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const handleSwipeDelete = () => {
    setIsDeleting(!isDeleting);
  };

  return (
    <div className="relative overflow-hidden">
      <div 
        className="transition-transform duration-300"
        style={{ transform: isDeleting ? 'translateX(-80px)' : 'translateX(0)' }}
      >
        <Card className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="truncate">{plugin.name}</h3>
                {getStatusBadge(plugin.status)}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {plugin.description}
              </p>
              {plugin.targetApp && (
                <p className="text-xs text-muted-foreground mt-1">
                  目标应用: {plugin.targetApp}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                最后修改: {plugin.updatedAt.toLocaleDateString('zh-CN')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant={plugin.status === 'running' ? 'destructive' : 'default'}
                onClick={() => onToggleRun(plugin.id)}
              >
                {plugin.status === 'running' ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => onEdit(plugin.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSwipeDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
      {isDeleting && (
        <div className="absolute right-0 top-0 h-full flex items-center">
          <Button
            variant="destructive"
            className="h-full rounded-none"
            onClick={() => onDelete(plugin.id)}
          >
            删除
          </Button>
        </div>
      )}
    </div>
  );
}

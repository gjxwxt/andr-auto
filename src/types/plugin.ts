export type ConditionType = 
  | 'colorMatch' 
  | 'imageMatch' 
  | 'textPresence' 
  | 'elementId'
  | 'notification'
  | 'appCheck'
  | 'deviceState'
  | 'timeCheck'
  | 'variableCheck'
  | 'randomWait';

export type ActionType = 
  | 'click' 
  | 'swipe' 
  | 'jumpApp' 
  | 'sendText' 
  | 'stopScript' 
  | 'jumpToStep' 
  | 'modifyVariable'
  | 'wait';

export type LogicOperator = 'AND' | 'OR';

export interface Condition {
  id: string;
  type: ConditionType;
  params: Record<string, any>;
}

export interface ConditionGroup {
  id: string;
  operator?: LogicOperator;
  condition: Condition;
}

export interface Action {
  id: string;
  conditions: ConditionGroup[];
  action: {
    type: ActionType;
    params: Record<string, any>;
  };
}

export interface Step {
  id: string;
  name: string;
  actions: Action[];
}

export type PluginStatus = 'enabled' | 'disabled' | 'running';

export interface Plugin {
  id: string;
  name: string;
  description: string;
  targetApp?: string;
  status: PluginStatus;
  steps: Step[];
  createdAt: Date;
  updatedAt: Date;
}

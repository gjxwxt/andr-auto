// 脚本执行引擎
import { Plugin, Step, Action, Condition } from "./types/plugin";
import FloatingWindow from "../plugins/FloatingWindowPlugin";
import Automation from "../plugins/AutomationPlugin";

export class ScriptEngine {
  private isRunning = false;
  private currentStepIndex = 0;
  private variables: Record<string, any> = {};

  async executePlugin(plugin: Plugin): Promise<void> {
    if (this.isRunning) {
      throw new Error("脚本已在运行中");
    }

    this.isRunning = true;
    this.currentStepIndex = 0;
    this.variables = {};

    try {
      for (const step of plugin.steps) {
        await this.executeStep(step);
        this.currentStepIndex++;
      }
    } finally {
      this.isRunning = false;
    }
  }

  private async executeStep(step: Step): Promise<void> {
    console.log(`执行步骤: ${step.name}`);

    for (const action of step.actions) {
      const shouldExecute = await this.evaluateConditions(action.conditions);
      if (shouldExecute) {
        await this.executeAction(action.action);
      }
    }
  }

  private async evaluateConditions(conditions: any[]): Promise<boolean> {
    if (conditions.length === 0) return true;

    let result = await this.evaluateCondition(conditions[0].condition);

    for (let i = 1; i < conditions.length; i++) {
      const operator = conditions[i].operator;
      const conditionResult = await this.evaluateCondition(
        conditions[i].condition
      );

      if (operator === "AND") {
        result = result && conditionResult;
      } else if (operator === "OR") {
        result = result || conditionResult;
      }
    }

    return result;
  }

  private async evaluateCondition(condition: Condition): Promise<boolean> {
    switch (condition.type) {
      case "colorMatch":
        return this.checkColorMatch(condition.params);
      case "imageMatch":
        return this.checkImageMatch(condition.params);
      case "textPresence":
        return this.checkTextPresence(condition.params);
      case "elementId":
        return this.checkElementId(condition.params);
      case "notification":
        return this.checkNotification(condition.params);
      case "appCheck":
        return this.checkAppCheck(condition.params);
      case "deviceState":
        return this.checkDeviceState(condition.params);
      case "timeCheck":
        return this.checkTimeCheck(condition.params);
      case "variableCheck":
        return this.checkVariableCheck(condition.params);
      case "randomWait":
        return this.randomWait(condition.params);
      default:
        return false;
    }
  }

  private async executeAction(action: any): Promise<void> {
    switch (action.type) {
      case "click":
        await this.performClick(action.params);
        break;
      case "swipe":
        await this.performSwipe(action.params);
        break;
      case "wait":
        await this.performWait(action.params);
        break;
      case "jumpApp":
        await this.performJumpApp(action.params);
        break;
      case "sendText":
        await this.performSendText(action.params);
        break;
      case "stopScript":
        this.isRunning = false;
        break;
      case "jumpToStep":
        this.currentStepIndex = action.params.stepIndex - 1;
        break;
      case "modifyVariable":
        this.modifyVariable(action.params);
        break;
    }
  }

  // 条件检查方法（使用原生插件）
  private async checkColorMatch(params: any): Promise<boolean> {
    try {
      const result = await Automation.checkColorMatch({
        x: params.x,
        y: params.y,
        color: params.color,
        tolerance: params.tolerance || 10,
      });
      return result.matched;
    } catch (error) {
      console.error("颜色匹配检查失败:", error);
      return false;
    }
  }

  private async checkImageMatch(params: any): Promise<boolean> {
    try {
      const result = await Automation.checkImageMatch({
        x: params.x,
        y: params.y,
        width: params.width,
        height: params.height,
        template: params.templateImage || "",
        similarity: params.similarity || 80,
      });
      return result.matched;
    } catch (error) {
      console.error("图像匹配检查失败:", error);
      return false;
    }
  }

  private async checkTextPresence(params: any): Promise<boolean> {
    try {
      const result = await Automation.ocrText({
        x: params.x,
        y: params.y,
        width: params.width,
        height: params.height,
      });

      if (params.fuzzyMatch) {
        return result.text.toLowerCase().includes(params.text.toLowerCase());
      } else {
        return result.text.includes(params.text);
      }
    } catch (error) {
      console.error("文字识别检查失败:", error);
      return false;
    }
  }

  private async checkElementId(params: any): Promise<boolean> {
    // 需要检查UI元素是否存在
    console.log("检查元素ID:", params);
    return false; // 模拟实现
  }

  private async checkNotification(params: any): Promise<boolean> {
    // 需要监听系统通知
    console.log("检查通知:", params);
    return false; // 模拟实现
  }

  private async checkAppCheck(params: any): Promise<boolean> {
    // 需要检查当前前台应用
    console.log("检查应用:", params);
    return false; // 模拟实现
  }

  private async checkDeviceState(params: any): Promise<boolean> {
    // 需要检查设备状态
    console.log("检查设备状态:", params);
    return false; // 模拟实现
  }

  private async checkTimeCheck(params: any): Promise<boolean> {
    // 需要检查时间条件
    console.log("检查时间:", params);
    return false; // 模拟实现
  }

  private async checkVariableCheck(params: any): Promise<boolean> {
    const { variableName, operator, targetValue } = params;
    const currentValue = this.variables[variableName] || 0;

    switch (operator) {
      case "=":
        return currentValue === targetValue;
      case ">":
        return currentValue > targetValue;
      case "<":
        return currentValue < targetValue;
      case ">=":
        return currentValue >= targetValue;
      case "<=":
        return currentValue <= targetValue;
      case "!=":
        return currentValue !== targetValue;
      default:
        return false;
    }
  }

  private async randomWait(params: any): Promise<boolean> {
    const { minDelay, maxDelay } = params;
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return true;
  }

  // 动作执行方法（使用原生插件）
  private async performClick(params: any): Promise<void> {
    try {
      await Automation.click({
        x: params.x,
        y: params.y,
      });
    } catch (error) {
      console.error("点击操作失败:", error);
      throw error;
    }
  }

  private async performSwipe(params: any): Promise<void> {
    try {
      await Automation.swipe({
        startX: params.startX,
        startY: params.startY,
        endX: params.endX,
        endY: params.endY,
        duration: params.duration || 300,
      });
    } catch (error) {
      console.error("滑动操作失败:", error);
      throw error;
    }
  }

  private async performWait(params: any): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, params.duration));
  }

  private async performJumpApp(params: any): Promise<void> {
    try {
      await Automation.launchApp({
        packageName: params.packageName,
      });
    } catch (error) {
      console.error("应用启动失败:", error);
      throw error;
    }
  }

  private async performSendText(params: any): Promise<void> {
    try {
      await Automation.sendText({
        text: params.text,
      });
    } catch (error) {
      console.error("文本输入失败:", error);
      throw error;
    }
  }

  private modifyVariable(params: any): void {
    const { variableName, operation, value } = params;
    const currentValue = this.variables[variableName] || 0;

    switch (operation) {
      case "增加":
        this.variables[variableName] = currentValue + value;
        break;
      case "减少":
        this.variables[variableName] = currentValue - value;
        break;
      case "设置":
        this.variables[variableName] = value;
        break;
    }
  }

  stop(): void {
    this.isRunning = false;
  }

  getStatus(): { isRunning: boolean; currentStep: number } {
    return {
      isRunning: this.isRunning,
      currentStep: this.currentStepIndex,
    };
  }
}

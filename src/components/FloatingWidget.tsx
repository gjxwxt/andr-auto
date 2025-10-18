import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";
import { motion } from "motion/react";
import FloatingWindow from "../plugins/FloatingWindowPlugin";

interface FloatingWidgetProps {
  isRunning: boolean;
  onToggle: () => void;
}

export function FloatingWidget({ isRunning, onToggle }: FloatingWidgetProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // 检查悬浮窗权限
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      const result = await FloatingWindow.checkPermission();
      setHasPermission(result.granted);

      if (!result.granted) {
        // 请求权限
        const requestResult = await FloatingWindow.requestPermission();
        setHasPermission(requestResult.granted);
      }
    } catch (error) {
      console.error("权限检查失败:", error);
    }
  };

  const showFloatingWindow = async () => {
    if (!hasPermission) {
      await checkPermission();
      return;
    }

    try {
      await FloatingWindow.show({
        x: 100,
        y: 100,
        width: 60,
        height: 60,
      });
    } catch (error) {
      console.error("显示悬浮窗失败:", error);
    }
  };

  const hideFloatingWindow = async () => {
    try {
      await FloatingWindow.hide();
    } catch (error) {
      console.error("隐藏悬浮窗失败:", error);
    }
  };

  // 在Web环境中，我们仍然显示普通的React组件
  if (typeof window !== "undefined" && window.location.protocol === "http:") {
    return (
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(e, info) => {
          setIsDragging(false);
          setPosition({ x: info.point.x, y: info.point.y });
        }}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="icon"
          variant={isRunning ? "destructive" : "default"}
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={onToggle}
          disabled={isDragging}
        >
          {isRunning ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
      </motion.div>
    );
  }

  // 在原生环境中，使用真正的悬浮窗
  return null;
}

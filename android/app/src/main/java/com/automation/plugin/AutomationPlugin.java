package com.automation.plugin;

import android.accessibilityservice.AccessibilityService;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Rect;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;
import android.view.accessibility.AccessibilityNodeInfo;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.ByteArrayOutputStream;
import java.util.List;

@CapacitorPlugin(name = "Automation")
public class AutomationPlugin extends Plugin {

    private static final String TAG = "AutomationPlugin";

    @PluginMethod
    public void click(PluginCall call) {
        int x = call.getInt("x", 0);
        int y = call.getInt("y", 0);

        // 使用AccessibilityService执行点击
        Intent intent = new Intent("com.automation.plugin.CLICK");
        intent.putExtra("x", x);
        intent.putExtra("y", y);
        getContext().sendBroadcast(intent);

        call.resolve();
    }

    @PluginMethod
    public void swipe(PluginCall call) {
        int startX = call.getInt("startX", 0);
        int startY = call.getInt("startY", 0);
        int endX = call.getInt("endX", 0);
        int endY = call.getInt("endY", 0);
        int duration = call.getInt("duration", 300);

        Intent intent = new Intent("com.automation.plugin.SWIPE");
        intent.putExtra("startX", startX);
        intent.putExtra("startY", startY);
        intent.putExtra("endX", endX);
        intent.putExtra("endY", endY);
        intent.putExtra("duration", duration);
        getContext().sendBroadcast(intent);

        call.resolve();
    }

    @PluginMethod
    public void sendText(PluginCall call) {
        String text = call.getString("text", "");

        Intent intent = new Intent("com.automation.plugin.SEND_TEXT");
        intent.putExtra("text", text);
        getContext().sendBroadcast(intent);

        call.resolve();
    }

    @PluginMethod
    public void launchApp(PluginCall call) {
        String packageName = call.getString("packageName", "");

        Intent intent = new Intent("com.automation.plugin.LAUNCH_APP");
        intent.putExtra("packageName", packageName);
        getContext().sendBroadcast(intent);

        call.resolve();
    }

    @PluginMethod
    public void takeScreenshot(PluginCall call) {
        Intent intent = new Intent("com.automation.plugin.TAKE_SCREENSHOT");
        getContext().sendBroadcast(intent);

        // 这里需要从AccessibilityService获取截图结果
        // 实际实现中需要通过回调或事件机制获取结果
        JSObject result = new JSObject();
        result.put("data", ""); // 实际应该是base64编码的图片数据
        call.resolve(result);
    }

    @PluginMethod
    public void checkColorMatch(PluginCall call) {
        int x = call.getInt("x", 0);
        int y = call.getInt("y", 0);
        String color = call.getString("color", "#000000");
        int tolerance = call.getInt("tolerance", 10);

        Intent intent = new Intent("com.automation.plugin.CHECK_COLOR");
        intent.putExtra("x", x);
        intent.putExtra("y", y);
        intent.putExtra("color", color);
        intent.putExtra("tolerance", tolerance);
        getContext().sendBroadcast(intent);

        // 这里需要从AccessibilityService获取检查结果
        JSObject result = new JSObject();
        result.put("matched", false); // 实际应该是检查结果
        call.resolve(result);
    }

    @PluginMethod
    public void checkImageMatch(PluginCall call) {
        int x = call.getInt("x", 0);
        int y = call.getInt("y", 0);
        int width = call.getInt("width", 0);
        int height = call.getInt("height", 0);
        String template = call.getString("template", "");
        int similarity = call.getInt("similarity", 80);

        Intent intent = new Intent("com.automation.plugin.CHECK_IMAGE");
        intent.putExtra("x", x);
        intent.putExtra("y", y);
        intent.putExtra("width", width);
        intent.putExtra("height", height);
        intent.putExtra("template", template);
        intent.putExtra("similarity", similarity);
        getContext().sendBroadcast(intent);

        JSObject result = new JSObject();
        result.put("matched", false);
        call.resolve(result);
    }

    @PluginMethod
    public void ocrText(PluginCall call) {
        int x = call.getInt("x", 0);
        int y = call.getInt("y", 0);
        int width = call.getInt("width", 0);
        int height = call.getInt("height", 0);

        Intent intent = new Intent("com.automation.plugin.OCR_TEXT");
        intent.putExtra("x", x);
        intent.putExtra("y", y);
        intent.putExtra("width", width);
        intent.putExtra("height", height);
        getContext().sendBroadcast(intent);

        JSObject result = new JSObject();
        result.put("text", ""); // 实际应该是OCR识别的文字
        call.resolve(result);
    }

    @PluginMethod
    public void checkAccessibilityPermission(PluginCall call) {
        boolean granted = isAccessibilityServiceEnabled();
        JSObject result = new JSObject();
        result.put("granted", granted);
        call.resolve(result);
    }

    @PluginMethod
    public void requestAccessibilityPermission(PluginCall call) {
        Intent intent = new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS);
        getActivity().startActivity(intent);
        call.resolve();
    }

    private boolean isAccessibilityServiceEnabled() {
        String settingValue = Settings.Secure.getString(
                getContext().getContentResolver(),
                Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES
        );
        if (settingValue != null) {
            return settingValue.contains(getContext().getPackageName() + "/" + AutomationAccessibilityService.class.getName());
        }
        return false;
    }
}

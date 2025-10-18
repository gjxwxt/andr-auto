package com.automation.plugin;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.view.WindowManager;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "FloatingWindow")
public class FloatingWindowPlugin extends Plugin {

    private static final int REQUEST_OVERLAY_PERMISSION = 1001;
    private FloatingWindowService floatingWindowService;

    @PluginMethod
    public void show(PluginCall call) {
        if (!Settings.canDrawOverlays(getContext())) {
            requestOverlayPermission();
            call.reject("需要悬浮窗权限");
            return;
        }

        int x = call.getInt("x", 100);
        int y = call.getInt("y", 100);
        int width = call.getInt("width", 60);
        int height = call.getInt("height", 60);

        Intent intent = new Intent(getContext(), FloatingWindowService.class);
        intent.putExtra("x", x);
        intent.putExtra("y", y);
        intent.putExtra("width", width);
        intent.putExtra("height", height);
        getContext().startService(intent);

        call.resolve();
    }

    @PluginMethod
    public void hide(PluginCall call) {
        Intent intent = new Intent(getContext(), FloatingWindowService.class);
        getContext().stopService(intent);
        call.resolve();
    }

    @PluginMethod
    public void updatePosition(PluginCall call) {
        int x = call.getInt("x", 100);
        int y = call.getInt("y", 100);

        Intent intent = new Intent(getContext(), FloatingWindowService.class);
        intent.putExtra("action", "update_position");
        intent.putExtra("x", x);
        intent.putExtra("y", y);
        getContext().startService(intent);

        call.resolve();
    }

    @PluginMethod
    public void checkPermission(PluginCall call) {
        boolean granted = Settings.canDrawOverlays(getContext());
        JSObject result = new JSObject();
        result.put("granted", granted);
        call.resolve(result);
    }

    @PluginMethod
    public void requestPermission(PluginCall call) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
            intent.setData(Uri.parse("package:" + getContext().getPackageName()));
            getActivity().startActivityForResult(intent, REQUEST_OVERLAY_PERMISSION);
        }
        call.resolve();
    }

    private void requestOverlayPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
            intent.setData(Uri.parse("package:" + getContext().getPackageName()));
            getActivity().startActivityForResult(intent, REQUEST_OVERLAY_PERMISSION);
        }
    }
}

package com.automation.plugin;

import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.IBinder;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;

public class FloatingWindowService extends Service {
    private WindowManager windowManager;
    private View floatingView;
    private WindowManager.LayoutParams params;
    private int x, y, width, height;

    @Override
    public void onCreate() {
        super.onCreate();
        windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null) {
            x = intent.getIntExtra("x", 100);
            y = intent.getIntExtra("y", 100);
            width = intent.getIntExtra("width", 60);
            height = intent.getIntExtra("height", 60);

            String action = intent.getStringExtra("action");
            if ("update_position".equals(action)) {
                updatePosition(intent.getIntExtra("x", 100), intent.getIntExtra("y", 100));
            } else {
                showFloatingWindow();
            }
        }
        return START_STICKY;
    }

    private void showFloatingWindow() {
        if (floatingView != null) {
            return;
        }

        // 创建悬浮窗布局
        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.VERTICAL);

        Button button = new Button(this);
        button.setText("⏯️");
        button.setBackgroundColor(0xFF2196F3);
        button.setTextColor(0xFFFFFFFF);
        button.setWidth(width);
        button.setHeight(height);

        // 设置拖拽功能
        button.setOnTouchListener(new View.OnTouchListener() {
            private int initialX, initialY;
            private float initialTouchX, initialTouchY;

            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        initialX = params.x;
                        initialY = params.y;
                        initialTouchX = event.getRawX();
                        initialTouchY = event.getRawY();
                        return true;

                    case MotionEvent.ACTION_MOVE:
                        params.x = initialX + (int) (event.getRawX() - initialTouchX);
                        params.y = initialY + (int) (event.getRawY() - initialTouchY);
                        windowManager.updateViewLayout(floatingView, params);
                        return true;
                }
                return false;
            }
        });

        // 设置点击事件
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 发送广播通知主应用
                Intent intent = new Intent("com.automation.plugin.FLOATING_WINDOW_CLICK");
                sendBroadcast(intent);
            }
        });

        layout.addView(button);

        // 设置悬浮窗参数
        params = new WindowManager.LayoutParams(
                width,
                height,
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                PixelFormat.TRANSLUCENT
        );

        params.gravity = Gravity.TOP | Gravity.LEFT;
        params.x = x;
        params.y = y;

        floatingView = layout;
        windowManager.addView(floatingView, params);
    }

    private void updatePosition(int newX, int newY) {
        if (floatingView != null) {
            params.x = newX;
            params.y = newY;
            windowManager.updateViewLayout(floatingView, params);
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (floatingView != null) {
            windowManager.removeView(floatingView);
            floatingView = null;
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}

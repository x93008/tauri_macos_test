# tauri_macos_test

Demo project to reproduce WKWebView crash on macOS 11 (Big Sur) when closing a borderless window.

## Issue

On macOS 11.7.x, closing a WKWebView window triggers a use-after-free in `WebURLSchemeHandlerCocoa::platformStopTask` during `[WKWebView dealloc]`, causing a SIGSEGV crash.

## Steps to Reproduce

1. Build and run on macOS 11
2. Click "Close Window"
3. App crashes with `EXC_BAD_ACCESS` in `objc_release`

## Build

```bash
npm install
npm run tauri build
```

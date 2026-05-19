#!/bin/bash

# Build for macOS 10.13+ (arm64 minimum is effectively 11.0)
export MACOSX_DEPLOYMENT_TARGET=10.13

cargo tauri build --bundles app "$@"

APP="src-tauri/target/release/bundle/macos/tauri-macos-test.app"
BIN="$APP/Contents/MacOS/tauri-macos-test"

# Fix: macOS 14+ linker embeds "linker-signed" flag incompatible with older macOS
# Strip and re-sign with clean ad-hoc signature
codesign --remove-signature "$BIN" 2>/dev/null
codesign -s - -f "$BIN" 2>/dev/null
rm -rf "$APP/Contents/_CodeSignature" 2>/dev/null
codesign -s - -f "$APP" 2>/dev/null

echo "Built: $APP"

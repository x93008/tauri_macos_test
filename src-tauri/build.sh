#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_DIR"

export MACOSX_DEPLOYMENT_TARGET=10.13

cargo tauri build --bundles app "$@"

APP="$PROJECT_DIR/src-tauri/target/release/bundle/macos/tauri-macos-test.app"
BIN="$APP/Contents/MacOS/tauri-macos-test"

# Strip macOS 14+ linker-signed flag, re-sign with clean ad-hoc for macOS 11 compat
if [ -f "$BIN" ]; then
  codesign --remove-signature "$BIN"
  codesign -s - -f "$BIN"
  rm -rf "$APP/Contents/_CodeSignature"
  codesign -s - -f "$APP"
fi

echo "Built: $APP"

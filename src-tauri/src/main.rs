#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

#[tauri::command]
fn create_window(app: tauri::AppHandle) {
    if let Some(window) = app.get_webview_window("secondary") {
        let _ = window.set_focus();
        return;
    }
    let _ = tauri::WebviewWindowBuilder::new(
        &app,
        "secondary",
        tauri::WebviewUrl::App("secondary.html".into()),
    )
    .title("Secondary")
    .inner_size(400.0, 300.0)
    .build();
}

#[tauri::command]
fn close_window(app: tauri::AppHandle) {
    if let Some(window) = app.get_webview_window("secondary") {
        let _ = window.close();
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_window, close_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

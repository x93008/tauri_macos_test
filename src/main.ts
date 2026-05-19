import { invoke } from "@tauri-apps/api/core";

document.getElementById("create-btn")!.addEventListener("click", async () => {
  await invoke("create_window");
});

document.getElementById("close-btn")!.addEventListener("click", async () => {
  await invoke("close_window");
});

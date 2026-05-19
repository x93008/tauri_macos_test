import { getCurrentWindow } from "@tauri-apps/api/window";

document.getElementById("close-btn")!.addEventListener("click", async () => {
  await getCurrentWindow().close();
});

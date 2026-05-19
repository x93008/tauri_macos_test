import { defineConfig } from "vite";

export default defineConfig({
  clearScreen: false,
  server: {
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        secondary: "secondary.html",
      },
    },
  },
});

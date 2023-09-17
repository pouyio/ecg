/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/ecg/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./setupTest.ts",
  },
});

/// <reference types="vitest" />
// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

import AutoImport from "unplugin-auto-import/vite";

// Utilities
import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd());
  return {
    plugins: [
      vue(),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true,
        styles: { configFile: "src/styles/variables.scss" },
      }),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
      }),
    ],
    define: { 'process.env': env },
    test: {
      globals: true,
      environment: "happy-dom",
    },
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./", import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    server: {
      port: 4399,
      proxy: {
        "/sdApi": {
          target: "http://me.yunrobot.cn:7860",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/sdApi/, ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: { charset: false },
        css: { charset: false },
      },
    },
  
  }
});

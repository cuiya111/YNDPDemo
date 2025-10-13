import { defineConfig, type PluginOption } from 'vite'
import { visualizer } from "rollup-plugin-visualizer";
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),visualizer() as PluginOption],
  base: "./",
  resolve:{
    alias: {
      "@": path.resolve(__dirname,"src")
    }
  },
  build: {
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ["axios", "echarts"]
  },
  server: {
    proxy: {
      "/dev-api":{
        target:"http://127.0.0.1:3000",
        changeOrigin:true,
        rewrite:path => path.replace(/^\/dev-api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/px2v.scss" as *;`
      }
    }
  }
})
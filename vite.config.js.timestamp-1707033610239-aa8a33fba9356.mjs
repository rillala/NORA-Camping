// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/T14%20Gen%203/Desktop/NORA-Camping/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/T14%20Gen%203/Desktop/NORA-Camping/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/T14%20Gen%203/Desktop/NORA-Camping/vite.config.js";
var vite_config_default = defineConfig({
  base: process.env.DEPLOY_TARGET === "GITHUB_PAGES" ? "/NORA-Camping/" : process.env.NODE_ENV === "production" ? "/chd104/g1/front/" : "/",
  build: {
    outDir: "front"
  },
  plugins: [vue()],
  server: {
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/assets/sass/main.scss";
				`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUMTQgR2VuIDNcXFxcRGVza3RvcFxcXFxOT1JBLUNhbXBpbmdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFQxNCBHZW4gM1xcXFxEZXNrdG9wXFxcXE5PUkEtQ2FtcGluZ1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVDE0JTIwR2VuJTIwMy9EZXNrdG9wL05PUkEtQ2FtcGluZy92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJztcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6XHJcbiAgICBwcm9jZXNzLmVudi5ERVBMT1lfVEFSR0VUID09PSAnR0lUSFVCX1BBR0VTJ1xyXG4gICAgICA/ICcvTk9SQS1DYW1waW5nLycgLy8gXHU2NkZGXHU2M0RCXHU3MEJBXHU0RjYwXHU3Njg0IEdpdEh1YiBcdTUwMDlcdTVFQUJcdTU0MERcclxuICAgICAgOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nXHJcbiAgICAgICAgPyAnL2NoZDEwNC9nMS9mcm9udC8nXHJcbiAgICAgICAgOiAnLycsXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2Zyb250JyxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFt2dWUoKV0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgc2Nzczoge1xyXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgXHJcbiAgICAgICAgXHRcdFx0XHRAaW1wb3J0IFwiLi9zcmMvYXNzZXRzL3Nhc3MvbWFpbi5zY3NzXCI7XHJcblx0XHRcdFx0YCxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVQsU0FBUyxlQUFlLFdBQVc7QUFFeFYsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBSCtLLElBQU0sMkNBQTJDO0FBTWhQLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQ0UsUUFBUSxJQUFJLGtCQUFrQixpQkFDMUIsbUJBQ0EsUUFBUSxJQUFJLGFBQWEsZUFDdkIsc0JBQ0E7QUFBQSxFQUNSLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQUEsRUFDZixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBO0FBQUE7QUFBQSxNQUdsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

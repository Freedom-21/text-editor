import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/text-editor/',
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: "/src",
      api: "/src/api",
      assets: "/src/assets",
      components: "/src/components",
      layout: "/src/layout",
      pages: "/src/pages",
      store: "/src/store",
      styles: "/src/styles",
      utils: "/src/utils",
      hooks: "/src/utils/hooks",
      helpers: "/helpers",
    },
  },
});

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dts from "vite-plugin-dts";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ["tiptap"],
      insertTypesEntry: true,
    }),
    svgLoader(),
  ],

  resolve: {
    alias: [
      {
        find: "tdesign-tiptap",
        replacement: path.resolve(__dirname, "tiptap/index.ts"),
      },
    ],
  },

  build: {
    outDir: path.resolve(__dirname, "lib"),
    minify: "esbuild",
    lib: {
      entry: path.resolve(path.resolve(__dirname, "tiptap"), "index.ts"),
      name: "TdesignTiptap",
      fileName: "tdesign-tiptap",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        inlineDynamicImports: true,
        globals: { vue: "vue" },
      },
    },
  },
  publicDir: false,
});

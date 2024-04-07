import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import svgLoader from "vite-svg-loader";
import dts from "vite-plugin-dts";
import viteCompression from "vite-plugin-compression";

const isDemo = process.env.VITE_BUILD_TAG === "demo";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/tdesign-tiptap",

  plugins: [
    vue(),
    isDemo
      ? viteCompression()
      : dts({
          include: ["src"],
          insertTypesEntry: true,
        }),
    svgLoader(),
  ],
  resolve: {
    alias: [
      {
        find: "tdesign-tiptap",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  publicDir: isDemo ? "public" : false,
  build: isDemo
    ? undefined
    : {
        outDir: path.resolve(__dirname, "lib"),
        minify: "esbuild",
        lib: {
          entry: path.resolve(path.resolve(__dirname, "src"), "index.ts"),
          name: "TdesignTiptap",
          fileName: "tdesign-tiptap",
          formats: ["es"],
        },
        rollupOptions: {
          external: ["vue"],
          output: {
            exports: "named",
            inlineDynamicImports: true,
          },
        },
      },
});

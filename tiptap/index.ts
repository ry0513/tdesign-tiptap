import { Plugin } from "vue";
import TTiptap from "./components/Editor.vue";
import "tdesign-vue-next/es/style/index.css";
const TTiptapPlugin: Plugin = {
  install(app) {
    app.component("t-tiptap", TTiptap);
  },
};

export * from "./extensions";
export * from "./types/extensionOptionsFn";
export * from "@tiptap/core";
export { TTiptapPlugin, TTiptap };

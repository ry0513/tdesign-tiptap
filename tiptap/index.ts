import { Plugin } from "vue";
import TTiptap from "./components/Editor.vue";
// 引入组件库的少量全局样式变量
import "tdesign-vue-next/es/style/index.css";
const TTiptapPlugin: Plugin = {
  install(app) {
    app.component("t-tiptap", TTiptap);
  },
};

export * from "./extensions";
export { TTiptapPlugin, TTiptap };
export default TTiptapPlugin;

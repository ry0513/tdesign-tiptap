import type { Editor } from "@tiptap/core";
import TiptapBold, { BoldOptions } from "@tiptap/extension-bold";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { ExtensionsOptions } from "../types/extensionOptions";

const Bold = TiptapBold.extend<BoldOptions & ExtensionsOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      bubble: false,
      bar: true,
      button({ editor }: { editor: Editor }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleBold();
            },
            isActive: editor.isActive("bold"),
            icon: "bold",
            tooltip: "加粗",
          },
        };
      },
    };
  },
});

export default Bold;

import { Editor } from "@tiptap/core";
import TiptapBold from "@tiptap/extension-bold";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { BoldOptions } from "../types/extensionOptions";

const Bold = TiptapBold.extend<BoldOptions>({
  addOptions() {
    return {
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

import { Editor } from "@tiptap/core";
import TiptapUnderline from "@tiptap/extension-underline";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { UnderlineOptions } from "../types/extensionOptions";

const Underline = TiptapUnderline.extend<UnderlineOptions>({
  addOptions() {
    return {
      bubble: false,
      bar: true,
      button({ editor }: { editor: Editor }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleUnderline();
            },
            isActive: editor.isActive("underline"),
            icon: "underline",
            tooltip: "下划线",
          },
        };
      },
    };
  },
});

export default Underline;

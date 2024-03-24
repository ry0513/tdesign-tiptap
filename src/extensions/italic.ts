import { Editor } from "@tiptap/core";
import TiptapItalic from "@tiptap/extension-italic";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { ItalicOptions } from "../types/extensionOptions";

const Italic = TiptapItalic.extend<ItalicOptions>({
  addOptions() {
    return {
      bubble: false,
      bar: true,
      button({ editor }: { editor: Editor }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleItalic();
            },
            isActive: editor.isActive("italic"),
            icon: "italic",
            tooltip: "斜体",
          },
        };
      },
    };
  },
});

export default Italic;

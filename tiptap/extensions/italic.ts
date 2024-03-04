import type { Editor } from "@tiptap/core";
import TiptapItalic, { ItalicOptions } from "@tiptap/extension-italic";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { ExtensionsOptions } from "../types/extensionOptions";

const Italic = TiptapItalic.extend<ItalicOptions & ExtensionsOptions>({
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

import { Editor } from "@tiptap/core";
import TiptapBlockquote from "@tiptap/extension-blockquote";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { BlockquoteOptions } from "../types/extensionOptions";

const Blockquote = TiptapBlockquote.extend<BlockquoteOptions>({
  addOptions() {
    return {
      bubble: false,
      bar: true,
      button({ editor }: { editor: Editor }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleBlockquote();
            },
            isActive: editor.isActive("blockquote"),
            isDisabled:
              editor.isActive("heading") ||
              editor.isActive("orderedList") ||
              editor.isActive("bulletList"),
            icon: "blockquote",
            tooltip: "引用",
          },
        };
      },
    };
  },
});

export default Blockquote;

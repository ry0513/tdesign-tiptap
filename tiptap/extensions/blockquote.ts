import { Editor } from "@tiptap/core";
import TiptapBlockquote, {
  BlockquoteOptions,
} from "@tiptap/extension-blockquote";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { ExtensionsOptions } from "../types/extensionOptions";

const Blockquote = TiptapBlockquote.extend<
  BlockquoteOptions & ExtensionsOptions
>({
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
              editor.commands.toggleBlockquote();
            },
            isActive: editor.isActive("blockquote"),
            isDisabled: editor.isActive("heading"),
            icon: "blockquote",
            tooltip: "引用",
          },
        };
      },
    };
  },
});

export default Blockquote;

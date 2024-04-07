import { Editor, mergeAttributes, Node } from "@tiptap/core";
import { ExtensionsOption } from "../types/extensionOption";

import CommandButton from "../components/MenuCommands/CommandButton.vue";

export interface BlockquoteOptions extends ExtensionsOption {}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blockQuote: {
      toggleBlockquote: () => ReturnType;
    };
  }
}

const Blockquote = Node.create<BlockquoteOptions>({
  name: "blockquote",

  addOptions() {
    return {
      HTMLAttributes: {},
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

  content: "block+",

  group: "block",

  defining: true,

  parseHTML() {
    return [{ tag: "blockquote" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "blockquote",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      toggleBlockquote:
        () =>
        ({ commands }) =>
          commands.toggleWrap(this.name),
    };
  },
});

export default Blockquote;

import { Editor, mergeAttributes, Node } from "@tiptap/core";
import { ExtensionsOption } from "../types/extensionOption";

import CommandButton from "../components/MenuCommands/CommandButton.vue";

export interface BulletListOptions extends ExtensionsOption {}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    bulletList: {
      toggleBulletList: () => ReturnType;
    };
  }
}

const BulletList = Node.create<BulletListOptions>({
  name: "bulletList",
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
              editor.commands.toggleBulletList();
            },
            isActive: editor.isActive("bulletList"),
            isDisabled: editor.isActive("blockquote"),
            icon: "list-ul",
            tooltip: "无序列表",
          },
        };
      },
    };
  },

  group: "block list",

  content: "listItem+",

  parseHTML() {
    return [{ tag: "ul" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "ul",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      toggleBulletList:
        () =>
        ({ commands }) => {
          return commands.toggleList(this.name, "listItem", false);
        },
    };
  },
});

export default BulletList;

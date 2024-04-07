import { Editor } from "@tiptap/core";
import { Mark, mergeAttributes } from "@tiptap/core";
import { ExtensionsOption } from "../types/extensionOption";
import CommandButton from "../components/MenuCommands/CommandButton.vue";

export interface BoldOptions extends ExtensionsOption {}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    bold: {
      toggleBold: () => ReturnType;
    };
  }
}

const Bold = Mark.create<BoldOptions>({
  name: "bold",
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
  parseHTML() {
    return [
      {
        tag: "strong",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "strong",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      toggleBold:
        () =>
        ({ commands }) =>
          commands.toggleMark(this.name),
    };
  },
});

export default Bold;

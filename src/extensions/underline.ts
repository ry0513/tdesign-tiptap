import { Editor, Mark, mergeAttributes } from "@tiptap/core";
import { ExtensionsOption } from "../types/extensionOption";

import CommandButton from "../components/MenuCommands/CommandButton.vue";

export interface UnderlineOptions extends ExtensionsOption {}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    underline: {
      toggleUnderline: () => ReturnType;
    };
  }
}

export const Underline = Mark.create<UnderlineOptions>({
  name: "underline",

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

  parseHTML() {
    return [
      {
        tag: "u",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "u",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      toggleUnderline:
        () =>
        ({ commands }) =>
          commands.toggleMark(this.name),
    };
  },
});

export default Underline;

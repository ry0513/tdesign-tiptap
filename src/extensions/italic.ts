import { Editor, Mark, mergeAttributes } from "@tiptap/core";
import { ExtensionsOption } from "../types/extensionOption";

import CommandButton from "../components/MenuCommands/CommandButton.vue";

export interface ItalicOptions extends ExtensionsOption {}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    italic: {
      toggleItalic: () => ReturnType;
    };
  }
}

const Italic = Mark.create<ItalicOptions>({
  name: "italic",

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

  parseHTML() {
    return [
      {
        tag: "em",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "em",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      toggleItalic:
        () =>
        ({ commands }) =>
          commands.toggleMark(this.name),
    };
  },
});

export default Italic;

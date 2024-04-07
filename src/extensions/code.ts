import { Editor, Mark, mergeAttributes } from "@tiptap/core";
import { ExtensionsOption } from "../types/extensionOption";

import CommandButton from "../components/MenuCommands/CommandButton.vue";

export interface CodeOptions extends ExtensionsOption {}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    code: {
      toggleCode: () => ReturnType;
    };
  }
}

const Code = Mark.create<CodeOptions>({
  name: "code",

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
              editor.commands.toggleCode();
            },
            isActive: editor.isActive("code"),
            isDisabled: editor.isActive("heading"),
            icon: "code",
            tooltip: "行内代码",
          },
        };
      },
    };
  },

  excludes: "_",

  code: true,

  exitable: true,

  parseHTML() {
    return [{ tag: "code" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "code",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      toggleCode:
        () =>
        ({ commands }) =>
          commands.toggleMark(this.name),
    };
  },
});
export default Code;

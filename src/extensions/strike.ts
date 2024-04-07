import { Editor, Mark, mergeAttributes } from "@tiptap/core";
import { ExtensionsOption } from "../types/extensionOption";

import CommandButton from "../components/MenuCommands/CommandButton.vue";

export interface StrikeOptions extends ExtensionsOption {}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    strike: {
      toggleStrike: () => ReturnType;
    };
  }
}

const Strike = Mark.create<StrikeOptions>({
  name: "strike",

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
              editor.commands.toggleStrike();
            },
            isActive: editor.isActive("strike"),
            icon: "strike",
            tooltip: "删除线",
          },
        };
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "s",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "s",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      toggleStrike:
        () =>
        ({ commands }) =>
          commands.toggleMark(this.name),
    };
  },
});

export default Strike;

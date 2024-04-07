import { Editor, Extension, Mark, mergeAttributes } from "@tiptap/core";
import { ExtensionsOption } from "../types/extensionOption";
import { colorOptions } from "../option";

import CommandColor from "../components/MenuCommands/Color/Color.vue";

export interface HighlightOptions extends ExtensionsOption {
  colorOptions?: string[][];
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    highlight: {
      setHighlight: (attributes?: { color: string }) => ReturnType;
      unsetHighlight: () => ReturnType;
    };
  }
}

export const Highlight = Mark.create<HighlightOptions>({
  name: "highlight",

  addOptions() {
    return {
      HTMLAttributes: {},
      bubble: false,
      bar: true,
      colorOptions,
      button({ editor, extension }: { editor: Editor; extension: Extension }) {
        return {
          component: CommandColor,
          componentProps: {
            command: (color: string) => {
              if (color) {
                editor.commands.setHighlight({ color });
              } else {
                editor.commands.unsetHighlight();
              }
            },
            currentColor: editor.getAttributes("highlight").color,
            isActive: !!editor.getAttributes("highlight").color,
            icon: "highlight",
            tooltip: "背景色",
            colorOptions: extension.options.colorOptions,
          },
        };
      },
    };
  },

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) => element.style.backgroundColor,
        renderHTML: (attributes) => {
          if (!attributes.color) {
            return {};
          }
          return {
            style: `background-color: ${attributes.color}; `,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "mark",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "mark",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setHighlight:
        (attributes) =>
        ({ commands }) =>
          commands.setMark(this.name, attributes),

      unsetHighlight:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name),
    };
  },
});

export default Highlight;

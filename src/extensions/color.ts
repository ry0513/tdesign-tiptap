import { Editor, Extension } from "@tiptap/core";
import { ExtensionsOption } from "../types/extensionOption";
import { colorOptions } from "../option";

import CommandColor from "../components/MenuCommands/Color/Color.vue";

export interface ColorOptions extends Omit<ExtensionsOption, "HTMLAttributes"> {
  colorOptions?: string[][];
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    color: {
      setColor: (color: string) => ReturnType;
      unsetColor: () => ReturnType;
    };
  }
}

const Color = Extension.create<ColorOptions>({
  name: "color",

  addOptions() {
    return {
      types: ["textStyle"],
      bubble: false,
      bar: true,
      colorOptions,
      button({ editor, extension }: { editor: Editor; extension: Extension }) {
        return {
          component: CommandColor,
          componentProps: {
            command: (color: string) => {
              if (color) {
                editor.commands.setColor(color);
              } else {
                editor.commands.unsetColor();
              }
            },
            currentColor: editor.getAttributes("textStyle").color,
            isActive: !!editor.getAttributes("textStyle").color,
            icon: "font-color",
            tooltip: "文字颜色",
            colorOptions: extension.options.colorOptions,
          },
        };
      },
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          color: {
            default: null,
            parseHTML: (element) => element.style.color?.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.color) {
                return {};
              }
              return {
                style: `color: ${attributes.color}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setColor:
        (color) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { color }).run();
        },
      unsetColor:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { color: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
export default Color;

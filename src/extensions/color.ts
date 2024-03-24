import { Editor, Extension } from "@tiptap/core";
import TextStyle from "@tiptap/extension-text-style";
import { Color as TiptapColor } from "@tiptap/extension-color";
import CommandColor from "../components/MenuCommands/Color/Color.vue";
import { ColorOptions } from "../types/extensionOptions";
import { colorOptions } from "../option";

const Color = TiptapColor.extend<ColorOptions>({
  addOptions() {
    return {
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
  addExtensions() {
    return [TextStyle];
  },
});

export default Color;

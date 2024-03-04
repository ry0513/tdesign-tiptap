import type { Editor, Extension } from "@tiptap/core";
import TextStyle from "@tiptap/extension-text-style";
import { ColorOptions, Color as TiptapColor } from "@tiptap/extension-color";
import CommandColor from "../components/MenuCommands/CommandColor.vue";
import {
  ExtensionsColorOptions,
  ExtensionsOptions,
} from "../types/extensionOptions";
import { colorOptions } from "../option/colorOptions";

const Color = TiptapColor.extend<
  ColorOptions & ExtensionsOptions & ExtensionsColorOptions
>({
  addOptions() {
    return {
      ...this.parent?.(),
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
  addExtensions() {
    return [TextStyle];
  },
});

export default Color;

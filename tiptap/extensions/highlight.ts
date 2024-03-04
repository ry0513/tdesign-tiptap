import type { Editor, Extension } from "@tiptap/core";
import TiptapHighlight, { HighlightOptions } from "@tiptap/extension-highlight";
import CommandColor from "../components/MenuCommands/CommandColor.vue";
import {
  ExtensionsColorOptions,
  ExtensionsOptions,
} from "../types/extensionOptions";
import { colorOptions } from "../option/colorOptions";

const Highlight = TiptapHighlight.extend<
  HighlightOptions & ExtensionsOptions & ExtensionsColorOptions
>({
  addOptions() {
    return {
      ...this.parent?.(),
      multicolor: true,
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
});

export default Highlight;

import { Editor, Extension } from "@tiptap/core";
import TiptapHighlight from "@tiptap/extension-highlight";
import CommandColor from "../components/MenuCommands/Color/Color.vue";
import { HighlightOptions } from "../types/extensionOptions";
import { colorOptions } from "../option";

const Highlight = TiptapHighlight.extend<HighlightOptions>({
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
        parseHTML: (element) =>
          element.getAttribute("data-color") || element.style.backgroundColor,
        renderHTML: (attributes) => {
          if (!attributes.color) {
            return {};
          }

          return {
            "data-color": attributes.color,
            style: `background-color: ${attributes.color}; color: inherit`,
          };
        },
      },
    };
  },
});

export default Highlight;

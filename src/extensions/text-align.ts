import { Editor, Extension } from "@tiptap/core";

import { ExtensionsOption } from "../types/extensionOption";
import { TextAlignOption } from "../option";

import CommandButton from "../components/MenuCommands/CommandButton.vue";

export type Alignment = "left" | "center" | "right" | "justify";
export interface TextAlignOptions
  extends Omit<ExtensionsOption, "HTMLAttributes"> {
  alignments: string[];
  defaultAlignment: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    textAlign: {
      setTextAlign: (alignment: string) => ReturnType;
    };
  }
}

const TextAlign = Extension.create<TextAlignOptions>({
  name: "textAlign",

  addOptions() {
    return {
      types: [],
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: "left",
      bubble: false,
      bar: true,
      button({
        editor,
        extension,
        alignments,
      }: {
        editor: Editor;
        extension: Extension;
        alignments: Alignment[];
      }) {
        return (alignments || extension.options.alignments).reduce(
          (acc: any[], alignment: Alignment) => {
            return [
              ...acc,
              {
                component: CommandButton,
                componentProps: {
                  command: () => {
                    editor.commands.setTextAlign(alignment);
                  },
                  isActive: editor.isActive({ textAlign: alignment }),
                  icon: `text-align-${alignment}`,
                  tooltip: TextAlignOption[alignment],
                },
              },
            ];
          },
          [] as any[]
        );
      },
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading"],
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (element) =>
              element.style.textAlign || this.options.defaultAlignment,
            renderHTML: (attributes) => {
              if (attributes.textAlign === this.options.defaultAlignment) {
                return {};
              }

              return { style: `text-align: ${attributes.textAlign}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setTextAlign:
        (alignment: string) =>
        ({ commands }) => {
          if (!this.options.alignments.includes(alignment)) {
            return false;
          }

          return ["paragraph", "heading"].every((type) =>
            commands.updateAttributes(type, { textAlign: alignment })
          );
        },
    };
  },
});

export default TextAlign;

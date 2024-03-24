import { Editor, Extension } from "@tiptap/core";
import TiptapTextAlign from "@tiptap/extension-text-align";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { TextAlignOptions, Alignment } from "../types/extensionOptions";
import { TextAlignOption } from "../option";

const TextAlign = TiptapTextAlign.extend<TextAlignOptions>({
  addOptions() {
    return {
      bubble: false,
      bar: true,
      types: ["paragraph", "heading"],
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: "left",
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
});

export default TextAlign;

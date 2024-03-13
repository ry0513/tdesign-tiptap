import { Editor, Extension } from "@tiptap/core";
import TiptapTextAlign, {
  TextAlignOptions,
} from "@tiptap/extension-text-align";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { ExtensionsOptions } from "../types/extensionOptions";

enum Tooltip {
  left = "左对齐",
  center = "居中对齐",
  right = "右对齐",
  justify = "两端对齐",
}

type Alignment = "left" | "center" | "right" | "justify";

const TextAlign = TiptapTextAlign.extend<TextAlignOptions & ExtensionsOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      bubble: false,
      bar: true,
      types: ["paragraph", "heading"],
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
                  tooltip: Tooltip[alignment],
                  isDisabled:
                    alignment === "justify" && editor.isActive("image"),
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

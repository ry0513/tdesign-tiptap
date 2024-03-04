import type { Editor, Extension } from "@tiptap/core";
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

const TextAlign = TiptapTextAlign.extend<TextAlignOptions & ExtensionsOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      bubble: false,
      bar: true,
      types: ["paragraph", "heading"],
      button({ editor, extension }: { editor: Editor; extension: Extension }) {
        return extension.options.alignments.reduce(
          (acc: any[], alignment: "left" | "center" | "right" | "justify") => {
            return [
              ...acc,
              {
                component: CommandButton,
                componentProps: {
                  command: () => {
                    if (editor.isActive({ textAlign: alignment })) {
                      editor.commands.unsetTextAlign();
                    } else {
                      editor.commands.setTextAlign(alignment);
                    }
                  },
                  isActive: editor.isActive({ textAlign: alignment }),
                  icon: `text-align-${alignment}`,
                  tooltip: Tooltip[alignment],
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

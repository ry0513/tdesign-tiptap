import type { Editor } from "@tiptap/core";
import TiptapCode, { CodeOptions } from "@tiptap/extension-code";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { ExtensionsOptions } from "../types/extensionOptions";

const Code = TiptapCode.extend<CodeOptions & ExtensionsOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: "inline",
      },
      bubble: false,
      bar: true,
      button({ editor }: { editor: Editor }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleCode();
            },
            isActive: editor.isActive("code"),
            icon: "code",
            tooltip: "行内代码",
          },
        };
      },
    };
  },
});

export default Code;

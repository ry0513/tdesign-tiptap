import { Editor } from "@tiptap/core";
import TiptapCode from "@tiptap/extension-code";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { CodeOptions } from "../types/extensionOptions";

const Code = TiptapCode.extend<CodeOptions>({
  addOptions() {
    return {
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
            isDisabled: editor.isActive("heading"),
            icon: "code",
            tooltip: "行内代码",
          },
        };
      },
    };
  },
});

export default Code;

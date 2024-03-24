import { Editor } from "@tiptap/core";
import TiptapCodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { CodeBlockLowlightOptions } from "../types/extensionOptions";
import "../styles/codeBlock.scss";

const CodeBlockLowlight =
  TiptapCodeBlockLowlight.extend<CodeBlockLowlightOptions>({
    addOptions() {
      return {
        lowlight: createLowlight(common),
        bubble: false,
        bar: true,
        button({ editor }: { editor: Editor }) {
          return {
            component: CommandButton,
            componentProps: {
              command: () => {
                editor.commands.toggleCodeBlock();
              },
              isActive: editor.isActive("codeBlock"),
              isDisabled: editor.isActive("heading"),
              icon: "code-block",
              tooltip: "代码块",
            },
          };
        },
      };
    },
  });

export default CodeBlockLowlight;

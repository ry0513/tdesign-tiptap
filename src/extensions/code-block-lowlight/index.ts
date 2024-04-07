import { common, createLowlight } from "lowlight";
import CodeBlock from "../code-block";
import { LowlightPlugin } from "./lowlight-plugin";
import { Editor, Extension } from "@tiptap/core";

import CommandCodeBlockLowlight from "../../components/MenuCommands/CodeBlockLowlight/CodeBlockLowlight.vue";
import { ExtensionsOption } from "../../types/extensionOption";

export interface CodeBlockLowlightOptions extends ExtensionsOption {
  lowlight: any;
  languageClassPrefix: string;
  defaultLanguage: string;
  languages: string[];
}
const CodeBlockLowlight = CodeBlock.extend<CodeBlockLowlightOptions>({
  addOptions() {
    return {
      HTMLAttributes: {},
      lowlight: createLowlight(common),
      bubble: false,
      bar: true,
      languageClassPrefix: "language-",
      defaultLanguage: "plaintext",
      languages: ["plaintext", "javascript", "java"],
      button({ editor, extension }: { editor: Editor; extension: Extension }) {
        return {
          component: CommandCodeBlockLowlight,
          componentProps: {
            editor,
            isActive: editor.isActive("codeBlock"),
            isDisabled: editor.isActive("heading"),
            icon: "code-block",
            tooltip: "代码块",
            languages: extension.options.languages,
          },
        };
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() || []),
      LowlightPlugin({
        name: this.name,
        lowlight: this.options.lowlight,
        defaultLanguage: this.options.defaultLanguage,
      }),
    ];
  },
});

export default CodeBlockLowlight;

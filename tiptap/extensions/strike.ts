import type { Editor } from "@tiptap/core";
import TiptapStrike, { StrikeOptions } from "@tiptap/extension-strike";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { ExtensionsOptions } from "../types/extensionOptions";

const Strike = TiptapStrike.extend<StrikeOptions & ExtensionsOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      bubble: false,
      bar: true,
      button({ editor }: { editor: Editor }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleStrike();
            },
            isActive: editor.isActive("strike"),
            icon: "strike",
            tooltip: "删除线",
          },
        };
      },
    };
  },
});

export default Strike;

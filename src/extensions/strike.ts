import { Editor } from "@tiptap/core";
import TiptapStrike from "@tiptap/extension-strike";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { StrikeOptions } from "../types/extensionOptions";

const Strike = TiptapStrike.extend<StrikeOptions>({
  addOptions() {
    return {
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

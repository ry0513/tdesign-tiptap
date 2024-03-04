import type { Editor } from "@tiptap/core";
import TiptapBulletList, {
  BulletListOptions,
} from "@tiptap/extension-bullet-list";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import ListItem from "./list-item";
import { ExtensionsOptions } from "../types/extensionOptions";

const BulletList = TiptapBulletList.extend<
  BulletListOptions & ExtensionsOptions
>({
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
              editor.commands.toggleBulletList();
            },
            isActive: editor.isActive("bulletList"),
            icon: "list-ul",
            tooltip: "无序列表",
          },
        };
      },
    };
  },

  addExtensions() {
    return [ListItem];
  },
});

export default BulletList;

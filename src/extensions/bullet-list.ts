import { Editor, wrappingInputRule } from "@tiptap/core";
import TiptapBulletList, { inputRegex } from "@tiptap/extension-bullet-list";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import ListItem from "./list-item";
import { BulletListOptions } from "../types/extensionOptions";

const BulletList = TiptapBulletList.extend<BulletListOptions>({
  addOptions() {
    return {
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
  content() {
    return "listItem+";
  },
  addCommands() {
    return {
      toggleBulletList:
        () =>
        ({ commands }) => {
          return commands.toggleList(this.name, "listItem", false);
        },
    };
  },
  addInputRules() {
    let inputRule = wrappingInputRule({
      find: inputRegex,
      type: this.type,
    });
    return [inputRule];
  },

  addExtensions() {
    return [ListItem];
  },
});

export default BulletList;

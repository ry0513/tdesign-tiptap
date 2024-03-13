import { Editor } from "@tiptap/core";
import TiptapOrderedList, {
  OrderedListOptions,
} from "@tiptap/extension-ordered-list";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import ListItem from "./list-item";
import { ExtensionsOptions } from "../types/extensionOptions";

const OrderedList = TiptapOrderedList.extend<
  OrderedListOptions & ExtensionsOptions
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
              editor.commands.toggleOrderedList();
            },
            isActive: editor.isActive("orderedList"),
            icon: "list-ol",
            tooltip: "顺序列表",
          },
        };
      },
    };
  },

  addExtensions() {
    return [ListItem];
  },
});

export default OrderedList;

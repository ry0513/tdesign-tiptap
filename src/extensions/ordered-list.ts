import { Editor, wrappingInputRule } from "@tiptap/core";
import TiptapOrderedList, { inputRegex } from "@tiptap/extension-ordered-list";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import ListItem from "./list-item";
import { OrderedListOptions } from "../types/extensionOptions";

const OrderedList = TiptapOrderedList.extend<OrderedListOptions>({
  addOptions() {
    return {
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

  content() {
    return "listItem+";
  },

  addCommands() {
    return {
      toggleOrderedList:
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
      getAttributes: (match) => ({ start: +match[1] }),
      joinPredicate: (match, node) =>
        node.childCount + node.attrs.start === +match[1],
    });

    return [inputRule];
  },

  addExtensions() {
    return [ListItem];
  },
});

export default OrderedList;

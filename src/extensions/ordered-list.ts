import { Editor, mergeAttributes, Node } from "@tiptap/core";
import { ExtensionsOption } from "../types/extensionOption";

import CommandButton from "../components/MenuCommands/CommandButton.vue";

export interface OrderedListOptions extends ExtensionsOption {}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    orderedList: {
      toggleOrderedList: () => ReturnType;
    };
  }
}

export const inputRegex = /^(\d+)\.\s$/;

export const OrderedList = Node.create<OrderedListOptions>({
  name: "orderedList",

  addOptions() {
    return {
      HTMLAttributes: {},
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
            isDisabled: editor.isActive("blockquote"),
            icon: "list-ol",
            tooltip: "顺序列表",
          },
        };
      },
    };
  },

  group: "block list",

  content: "listItem+",
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (element) => {
          return element.hasAttribute("start")
            ? parseInt(element.getAttribute("start") || "", 10)
            : 1;
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "ol",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { start, ...attributesWithoutStart } = HTMLAttributes;

    return start === 1
      ? [
          "ol",
          mergeAttributes(this.options.HTMLAttributes, attributesWithoutStart),
          0,
        ]
      : ["ol", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
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
});

export default OrderedList;

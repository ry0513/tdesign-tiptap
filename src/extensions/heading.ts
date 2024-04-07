import { Editor, Extension, mergeAttributes, Node } from "@tiptap/core";
import { ExtensionsOption } from "../types/extensionOption";
import { headingOption } from "../option";

import CommandButton from "../components/MenuCommands/CommandButton.vue";
import CommandHeadingGroup from "../components/MenuCommands/Heading/HeadingGroup.vue";

export type Level = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingOptions extends ExtensionsOption {
  levels: Level[];
  group: boolean;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    heading: {
      toggleHeading: (attributes: { level: Level }) => ReturnType;
    };
  }
}

const Heading = Node.create<HeadingOptions>({
  name: "heading",

  addOptions() {
    return {
      levels: ["h1", "h2", "h3"],
      HTMLAttributes: {},
      bubble: false,
      bar: true,
      group: true,
      button({ editor, extension }: { editor: Editor; extension: Extension }) {
        if (extension.options.group) {
          return {
            component: CommandHeadingGroup,
            componentProps: {
              tooltip: "标题",
              editor,
              isActive: editor.isActive("heading"),
              levels: extension.options.levels,
            },
          };
        }

        return extension.options.levels.reduce((acc: any[], level: Level) => {
          return [
            ...acc,
            {
              component: CommandButton,
              componentProps: {
                command: () => {
                  editor.commands.toggleHeading({ level });
                },
                isActive: editor.isActive({ level }),
                isDisabled: editor.isActive("blockquote"),
                icon: level,
                tooltip: headingOption[level],
              },
            },
          ];
        }, []);
      },
    };
  },

  content: "inline*",

  group: "block",

  defining: true,

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false,
      },
    };
  },

  parseHTML() {
    return this.options.levels.map((level: Level) => ({
      tag: `h${level}`,
      attrs: { level },
    }));
  },

  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      level,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      toggleHeading:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }
          return commands.toggleNode(this.name, "paragraph", attributes);
        },
    };
  },
});

export default Heading;

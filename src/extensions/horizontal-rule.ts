import { Editor, mergeAttributes, Node } from "@tiptap/core";
import { NodeSelection, TextSelection } from "@tiptap/pm/state";
import { ExtensionsOption } from "../types/extensionOption";

import CommandButton from "../components/MenuCommands/CommandButton.vue";

export interface HorizontalRuleOptions extends ExtensionsOption {}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    horizontalRule: {
      setHorizontalRule: () => ReturnType;
    };
  }
}

const HorizontalRule = Node.create<HorizontalRuleOptions>({
  name: "horizontalRule",

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
              editor.commands.setHorizontalRule();
            },
            // isActive: editor.isActive("horizontalRule"),
            icon: "horizontal-rule",
            tooltip: "分割线",
          },
        };
      },
    };
  },

  group: "block",

  parseHTML() {
    return [{ tag: "hr" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["hr", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      setHorizontalRule:
        () =>
        ({ chain, state }) => {
          const { $to: $originTo } = state.selection;

          const currentChain = chain();

          if ($originTo.parentOffset === 0) {
            currentChain.insertContentAt(Math.max($originTo.pos - 2, 0), {
              type: this.name,
            });
          } else {
            currentChain.insertContent({ type: this.name });
          }

          return (
            currentChain
              // set cursor after horizontal rule
              .command(({ tr, dispatch }) => {
                if (dispatch) {
                  const { $to } = tr.selection;
                  const posAfter = $to.end();
                  if ($to.nodeAfter) {
                    if ($to.nodeAfter.isTextblock) {
                      tr.setSelection(
                        TextSelection.create(tr.doc, $to.pos + 1)
                      );
                    } else if ($to.nodeAfter.isBlock) {
                      tr.setSelection(NodeSelection.create(tr.doc, $to.pos));
                    } else {
                      tr.setSelection(TextSelection.create(tr.doc, $to.pos));
                    }
                  } else {
                    // add node after horizontal rule if it’s the end of the document

                    const node =
                      $to.parent.type.contentMatch.defaultType?.create();

                    if (node) {
                      tr.insert(posAfter, node);
                      tr.setSelection(
                        TextSelection.create(tr.doc, posAfter + 1)
                      );
                    }
                  }

                  tr.scrollIntoView();
                }

                return true;
              })
              .run()
          );
        },
    };
  },
});

export default HorizontalRule;

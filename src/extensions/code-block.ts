import { Editor, mergeAttributes, Node } from "@tiptap/core";
import { Plugin, PluginKey, TextSelection } from "@tiptap/pm/state";
import { ExtensionsOption } from "../types/extensionOption";

import CommandButton from "../components/MenuCommands/CommandButton.vue";
import "../styles/codeBlock.scss";

export interface CodeBlockOptions extends ExtensionsOption {
  languageClassPrefix: string;
  defaultLanguage: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    codeBlock: {
      toggleCodeBlock: (attributes?: { language: string }) => ReturnType;
    };
  }
}

const CodeBlock = Node.create<CodeBlockOptions>({
  name: "codeBlock",

  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: true,
      exitOnArrowDown: true,
      HTMLAttributes: {},
      bubble: false,
      bar: true,
      defaultLanguage: "plaintext",
      button({ editor }: { editor: Editor }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleCodeBlock();
            },
            isActive: editor.isActive("codeBlock"),
            isDisabled: editor.isActive("heading"),
            icon: "code-block",
            tooltip: "代码块",
          },
        };
      },
    };
  },

  content: "text*",

  marks: "",

  group: "block",

  code: true,

  defining: true,

  addAttributes() {
    return {
      language: {
        default: null,
        parseHTML: (element) => {
          const { languageClassPrefix } = this.options;
          const classNames = [...(element.firstElementChild?.classList || [])];
          const languages = classNames
            .filter((className) => className.startsWith(languageClassPrefix))
            .map((className) => className.replace(languageClassPrefix, ""));
          const language = languages[0];

          if (!language) {
            return null;
          }

          return language;
        },
        rendered: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "pre",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      [
        "code",
        {
          class: node.attrs.language
            ? this.options.languageClassPrefix + node.attrs.language
            : this.options.languageClassPrefix + this.options.defaultLanguage,
        },
        0,
      ],
    ];
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => {
        const { empty, $anchor } = this.editor.state.selection;
        const isAtStart = $anchor.pos === 1;

        if (!empty || $anchor.parent.type.name !== this.name) {
          return false;
        }

        if (isAtStart || !$anchor.parent.textContent.length) {
          return this.editor.commands.clearNodes();
        }

        return false;
      },

      Enter: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from, empty } = selection;

        if (!empty || $from.parent.type !== this.type) {
          return false;
        }

        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
        const endsWithDoubleNewline = $from.parent.textContent.endsWith("\n\n");

        if (!isAtEnd || !endsWithDoubleNewline) {
          return false;
        }

        return editor
          .chain()
          .command(({ tr }) => {
            tr.delete($from.pos - 2, $from.pos);

            return true;
          })
          .exitCode()
          .run();
      },

      ArrowDown: ({ editor }) => {
        const { state } = editor;
        const { selection, doc } = state;
        const { $from, empty } = selection;

        if (!empty || $from.parent.type !== this.type) {
          return false;
        }

        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;

        if (!isAtEnd) {
          return false;
        }

        const after = $from.after();

        if (after === undefined) {
          return false;
        }

        const nodeAfter = doc.nodeAt(after);

        if (nodeAfter) {
          return false;
        }

        return editor.commands.exitCode();
      },
    };
  },

  addCommands() {
    return {
      toggleCodeBlock:
        (attributes) =>
        ({ commands }) =>
          commands.toggleNode(this.name, "paragraph", attributes),
    };
  },

  addProseMirrorPlugins() {
    return [
      // this plugin creates a code block for pasted content from VS Code
      // we can also detect the copied code language
      new Plugin({
        key: new PluginKey("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (view, event) => {
            if (!event.clipboardData) {
              return false;
            }

            // don’t create a new code block within code blocks
            if (this.editor.isActive(this.type.name)) {
              return false;
            }

            const text = event.clipboardData.getData("text/plain");
            const vscode = event.clipboardData.getData("vscode-editor-data");
            const vscodeData = vscode ? JSON.parse(vscode) : undefined;
            const language = vscodeData?.mode;

            if (!text || !language) {
              return false;
            }

            const { tr, schema } = view.state;
            tr.replaceSelectionWith(
              this.type.create(
                { language },
                schema.text(text.replace(/\r\n?/g, "\n"))
              )
            );

            const { selection } = tr;
            // Whether the current position is code block, if not, move forward to code block.
            let codeBlockPos = Math.max(0, selection.from - 1);
            while (
              codeBlockPos > 0 &&
              tr.doc.resolve(codeBlockPos).parent.type.name !== this.type.name
            ) {
              codeBlockPos--;
            }

            tr.setSelection(TextSelection.near(tr.doc.resolve(codeBlockPos)));
            tr.setMeta("paste", true);

            view.dispatch(tr);

            return true;
          },
        },
      }),
    ];
  },
});

export default CodeBlock;

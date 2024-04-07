import {
  Editor,
  Mark,
  markPasteRule,
  mergeAttributes,
  PasteRuleMatch,
} from "@tiptap/core";
import { find, registerCustomProtocol, reset } from "linkifyjs";

import { ExtensionsOption } from "../types/extensionOption.js";

import EditLinkButton from "../components/MenuCommands/Link/EditLinkButton.vue";

export interface LinkProtocolOptions {
  scheme: string;
  optionalSlashes?: boolean;
}

export interface LinkOptions extends ExtensionsOption {
  protocols: Array<LinkProtocolOptions | string>;
  HTMLAttributes: Record<string, any>;
  validate?: (url: string) => boolean;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    link: {
      setLink: (attributes: {
        href: string;
        target?: string | null;
        rel?: string | null;
        class?: string | null;
      }) => ReturnType;
      toggleLink: (attributes: {
        href: string;
        target?: string | null;
        rel?: string | null;
        class?: string | null;
      }) => ReturnType;
      unsetLink: () => ReturnType;
    };
  }
}

export const Link = Mark.create<LinkOptions>({
  name: "link",
  priority: 1000,
  keepOnSplit: false,

  onCreate() {
    this.options.protocols.forEach((protocol) => {
      if (typeof protocol === "string") {
        registerCustomProtocol(protocol);
        return;
      }
      registerCustomProtocol(protocol.scheme, protocol.optionalSlashes);
    });
  },

  onDestroy() {
    reset();
  },

  inclusive: true,

  addOptions() {
    return {
      openOnClick: false,
      linkOnPaste: false,
      autolink: true,
      protocols: [],
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null,
      },
      validate: undefined,
      bubble: false,
      bar: true,

      button({ editor }: { editor: Editor }) {
        return {
          component: EditLinkButton,
          componentProps: {
            editor,
            isActive: editor.isActive("link"),
          },
        };
      },
    };
  },

  addAttributes() {
    return {
      href: {
        default: null,
      },
      target: {
        default: this.options.HTMLAttributes.target,
      },
      rel: {
        default: this.options.HTMLAttributes.rel,
      },
      class: {
        default: this.options.HTMLAttributes.class,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'a[href]:not([href *= "javascript:" i])' }];
  },

  renderHTML({ HTMLAttributes }) {
    // False positive; we're explicitly checking for javascript: links to ignore them
    // eslint-disable-next-line no-script-url
    if (HTMLAttributes.href?.startsWith("javascript:")) {
      // strip out the href
      return [
        "a",
        mergeAttributes(this.options.HTMLAttributes, {
          ...HTMLAttributes,
          href: "",
        }),
        0,
      ];
    }
    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setLink:
        (attributes) =>
        ({ chain }) => {
          return chain()
            .setMark(this.name, attributes)
            .setMeta("preventAutolink", true)
            .run();
        },
      toggleLink:
        (attributes) =>
        ({ chain }) => {
          return chain()
            .toggleMark(this.name, attributes, { extendEmptyMarkRange: true })
            .setMeta("preventAutolink", true)
            .run();
        },

      unsetLink:
        () =>
        ({ chain }) => {
          return chain()
            .unsetMark(this.name, { extendEmptyMarkRange: true })
            .setMeta("preventAutolink", true)
            .run();
        },
    };
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: (text) => {
          const foundLinks: PasteRuleMatch[] = [];

          if (text) {
            const links = find(text).filter((item) => item.isLink);

            if (links.length) {
              links.forEach((link) =>
                foundLinks.push({
                  text: link.value,
                  data: {
                    href: link.href,
                  },
                  index: link.start,
                })
              );
            }
          }

          return foundLinks;
        },
        type: this.type,
        getAttributes: (match) => {
          return {
            href: match.data?.href,
          };
        },
      }),
    ];
  },
});

export default Link;

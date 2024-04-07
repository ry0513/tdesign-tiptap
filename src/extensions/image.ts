import { Editor, Extension, mergeAttributes, Node } from "@tiptap/core";
import { ExtensionsOption } from "../types/extensionOption";

import CommandImage from "../components/MenuCommands/Image/Image.vue";

export type InsertImageFn = (data: { url: string; alt: string }) => void;
export interface ImageOptions extends ExtensionsOption {
  sizeOption: { small: string; middle: string; big: string };
  types: ("network" | "upload")[];
  customUpload?: (file: File, insertFn: InsertImageFn) => void;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    image: {
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
      }) => ReturnType;
    };
  }
}

const Image = Node.create<ImageOptions>({
  name: "image",

  addOptions() {
    return {
      HTMLAttributes: {},
      bubble: false,
      bar: true,
      types: ["network", "upload"],
      sizeOption: { small: "25%", middle: "50%", big: "100%" },
      customUpload: (file, insertFn) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          insertFn({ url: event.target!.result as string, alt: file.name });
        };
        reader.readAsDataURL(file);
      },
      button({ editor, extension }: { editor: Editor; extension: Extension }) {
        return {
          component: CommandImage,
          componentProps: {
            editor,
            isActive: editor.isActive("image"),
            icon: "image",
            tooltip: editor.isActive("image") ? "编辑图片" : "插入图片",
            extension,
            isDisabled: editor.isActive("heading"),
          },
        };
      },
    };
  },

  inline() {
    return true;
  },

  group() {
    return "inline";
  },

  draggable: true,

  addStorage() {
    return {
      list: [],
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: "50%",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
        getAttrs: (node) => {
          this.storage.list.push((node as HTMLElement).getAttribute("src"));
          return null;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

export default Image;

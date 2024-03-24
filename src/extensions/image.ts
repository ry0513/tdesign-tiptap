import { Editor, Extension } from "@tiptap/core";
import TiptapImage from "@tiptap/extension-image";
import CommandImage from "../components/MenuCommands/Image/Image.vue";
import { ImageOptions } from "../types/extensionOptions";

const Image = TiptapImage.extend<ImageOptions>({
  addOptions() {
    return {
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
  addStorage() {
    return {
      list: [],
    };
  },
  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          this.storage.list.push(options.src);
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
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
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "50%",
      },
    };
  },
});

export default Image;

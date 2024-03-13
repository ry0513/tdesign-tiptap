import { Editor, Extension } from "@tiptap/core";
import TiptapImage, { ImageOptions } from "@tiptap/extension-image";
import CommandImage from "../components/MenuCommands/Image/Image.vue";
import { ExtensionsOptions } from "../types/extensionOptions";

const Image = TiptapImage.extend<ImageOptions & ExtensionsOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      bubble: false,
      bar: true,
      inline: true,
      button({ editor }: { editor: Editor; extension: Extension }) {
        return {
          component: CommandImage,
          componentProps: {
            editor,
            isActive: editor.isActive("image"),
            isDisabled: editor.isActive("image"),
            icon: "image",
            tooltip: "图片",
          },
        };
      },
    };
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

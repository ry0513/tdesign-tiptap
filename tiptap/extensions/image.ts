import { Editor, Extension } from "@tiptap/core";
import TiptapImage, { ImageOptions } from "@tiptap/extension-image";
import CommandImage from "../components/MenuCommands/Image/Image.vue";
import {
  ExtensionsImageOptions,
  ExtensionsOptions,
} from "../types/extensionOptions";

const Image = TiptapImage.extend<
  ImageOptions & ExtensionsOptions & ExtensionsImageOptions
>({
  addOptions() {
    return {
      ...this.parent?.(),
      bubble: false,
      bar: true,
      inline: true,
      customUpload: (file, insertFn) => {
        const reader = new FileReader();
        reader.onload = function (event) {
          console.log(event);
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
            isDisabled: editor.isActive("image"),
            icon: "image",
            tooltip: "图片",
            extension,
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

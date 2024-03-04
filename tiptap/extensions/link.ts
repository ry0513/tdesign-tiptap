import type { Editor } from "@tiptap/core";
import TiptapLink, { LinkOptions } from "@tiptap/extension-link";
import AddLinkButton from "../components/MenuCommands/Link/Index.vue";
import { ExtensionsOptions } from "../types/extensionOptions";

const Link = TiptapLink.extend<LinkOptions & ExtensionsOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      bubble: false,
      bar: true,
      openOnClick: false,
      button({ editor }: { editor: Editor }) {
        return {
          component: AddLinkButton,
          componentProps: {
            editor,
            menuType: "bar",
          },
        };
      },
    };
  },
});

export default Link;

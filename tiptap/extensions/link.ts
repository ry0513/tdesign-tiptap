import { Editor } from "@tiptap/core";
import TiptapLink, { LinkOptions } from "@tiptap/extension-link";
import EditLinkButton from "../components/MenuCommands/Link/EditLinkButton.vue";
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
          component: EditLinkButton,
          componentProps: {
            editor,
            isActive: editor.isActive("link"),
          },
        };
      },
    };
  },
});

export default Link;

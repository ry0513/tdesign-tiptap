import { Editor } from "@tiptap/core";
import TiptapLink from "@tiptap/extension-link";
import EditLinkButton from "../components/MenuCommands/Link/EditLinkButton.vue";
import { LinkOptions } from "../types/extensionOptions";

const Link = TiptapLink.extend<LinkOptions>({
  addOptions() {
    return {
      bubble: false,
      bar: true,
      protocols: [],
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
      },
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
  inclusive() {
    return false;
  },
});

export default Link;

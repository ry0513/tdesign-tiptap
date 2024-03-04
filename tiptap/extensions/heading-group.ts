import type { Editor } from "@tiptap/core";
import TiptapBold, { BoldOptions } from "@tiptap/extension-bold";
import CommandHeadingGroup from "../components/MenuCommands/CommandHeadingGroup.vue";
import { ExtensionsOptions } from "../types/extensionOptions";

const Bold = TiptapBold.extend<BoldOptions & ExtensionsOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      bubble: false,
      bar: true,
      button({ editor }: { editor: Editor }) {
        return {
          component: CommandHeadingGroup,
          componentProps: {
            tooltip: "标题",
            editor,
          },
        };
      },
    };
  },
});

export default Bold;

import { Editor, Extension } from "@tiptap/core";
import CommandHeadingGroup from "../components/MenuCommands/Heading/HeadingGroup.vue";
import { ExtensionsOptions } from "../types/extensionOptions";
import Heading from "@tiptap/extension-heading";

const HeadingGroup = Extension.create<ExtensionsOptions>({
  name: "heading-group",
  addOptions() {
    return {
      bubble: false,
      bar: true,
      button({ editor }: { editor: Editor }) {
        return {
          component: CommandHeadingGroup,
          componentProps: {
            tooltip: "标题",
            editor,
            isActive: false,
          },
        };
      },
    };
  },
  addExtensions() {
    return [Heading];
  },
});

export default HeadingGroup;

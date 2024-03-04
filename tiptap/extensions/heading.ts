import type { Editor, Extension } from "@tiptap/core";
import TiptapHeading, {
  HeadingOptions,
  Level,
} from "@tiptap/extension-heading";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { ExtensionsOptions } from "../types/extensionOptions";
import { headOption } from "../option/headOption";

const Heading = TiptapHeading.extend<HeadingOptions & ExtensionsOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      bubble: false,
      bar: true,
      button({ editor, extension }: { editor: Editor; extension: Extension }) {
        return extension.options.levels.reduce((acc: any[], level: Level) => {
          return [
            ...acc,
            {
              component: CommandButton,
              componentProps: {
                command: () => {
                  editor.commands.toggleHeading({ level });
                },
                isActive: editor.isActive({ level }),
                isDisabled: editor.isActive("blockquote"),
                icon: `h${level}`,
                tooltip: headOption[level - 1].text,
              },
            },
          ];
        }, []);
      },
    };
  },
});

export default Heading;

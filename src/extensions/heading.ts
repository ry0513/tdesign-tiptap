import { Editor, Extension } from "@tiptap/core";
import TiptapHeading, { Level } from "@tiptap/extension-heading";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { HeadingOptions } from "../types/extensionOptions";
import { headingOption } from "../option";

const Heading = TiptapHeading.extend<HeadingOptions>({
  addOptions() {
    return {
      bubble: false,
      bar: true,
      levels: [1, 2, 3],
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
                tooltip: headingOption[`h${level}`],
              },
            },
          ];
        }, []);
      },
    };
  },
});

export default Heading;

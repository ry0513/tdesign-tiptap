import { Editor } from "@tiptap/core";
import TiptapHorizontalRule, {
  HorizontalRuleOptions,
} from "@tiptap/extension-horizontal-rule";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { ExtensionsOptions } from "../types/extensionOptions";

const HorizontalRule = TiptapHorizontalRule.extend<
  HorizontalRuleOptions & ExtensionsOptions
>({
  addOptions() {
    return {
      ...this.parent?.(),
      bubble: false,
      bar: true,
      button({ editor }: { editor: Editor }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.setHorizontalRule();
            },
            isActive: false,
            icon: "horizontal-rule",
            tooltip: "分割线",
          },
        };
      },
    };
  },
});

export default HorizontalRule;

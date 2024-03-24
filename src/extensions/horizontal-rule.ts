import { Editor } from "@tiptap/core";
import TiptapHorizontalRule from "@tiptap/extension-horizontal-rule";
import CommandButton from "../components/MenuCommands/CommandButton.vue";
import { HorizontalRuleOptions } from "../types/extensionOptions";

const HorizontalRule = TiptapHorizontalRule.extend<HorizontalRuleOptions>({
  addOptions() {
    return {
      bubble: false,
      bar: true,
      button({ editor }: { editor: Editor }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.setHorizontalRule();
            },
            icon: "horizontal-rule",
            tooltip: "分割线",
          },
        };
      },
    };
  },
});

export default HorizontalRule;

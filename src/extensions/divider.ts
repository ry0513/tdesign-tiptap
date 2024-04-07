import { Node } from "@tiptap/core";
import CommandDivider from "../components/MenuCommands/Divider/Divider.vue";
import { ExtensionsOption } from "../types/extensionOption";

export interface DividerOptions
  extends Omit<ExtensionsOption, "HTMLAttributes"> {}

const Divider = Node.create({
  name: "divider",
  addOptions() {
    return {
      bubble: false,
      bar: true,
      button() {
        return {
          component: CommandDivider,
        };
      },
    };
  },
});

export default Divider;

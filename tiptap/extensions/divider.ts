import { Node } from "@tiptap/core";
import CommandDivider from "../components/MenuCommands/Divider/Divider.vue";
import { ExtensionsOptions } from "../types/extensionOptions";

const Divider = Node.create<ExtensionsOptions>({
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

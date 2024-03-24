<template>
  <CommandButton
    v-for="(width, type) in options"
    :key="type"
    :command="
      () => {
        editor
          .chain()
          .focus()
          .updateAttributes('image', { width })
          .setNodeSelection(editor.view.state.selection.anchor)
          .run();
      }
    "
    :tooltip="imageSizeOption[type as 'small'|'middle'|'big']"
    :icon="`reSize-${type}`"
    :isActive="editor.getAttributes('image').width === width"
  />
</template>
<script lang="ts" setup>
import { Editor, Extensions } from "@tiptap/vue-3";
import CommandButton from "../CommandButton.vue";
import { computed } from "vue";
import { imageSizeOption } from "../../../option";
const props = withDefaults(
  defineProps<{
    editor: Editor;
    extensions?: Extensions;
  }>(),
  {
    extensions: () => [],
  }
);

const options = computed(() => {
  const extension = props.extensions.filter(
    (extension) => extension.name === "image"
  )[0];
  if (!extension) return [];
  return extension.options.sizeOption as {
    small: string;
    middle: string;
    big: string;
  };
});
</script>

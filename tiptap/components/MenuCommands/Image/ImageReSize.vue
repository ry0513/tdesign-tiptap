<template>
  <CommandButton
    v-for="width in ['25%', '50%', '100%']"
    :key="width"
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
    :tooltip="width"
    :icon="`reSize-${width.slice(0, -1)}`"
    :isActive="editor.getAttributes('image').width === width"
  />
</template>
<script lang="ts" setup>
import { Editor } from "@tiptap/vue-3";
import CommandButton from "../CommandButton.vue";

defineProps<{
  editor: Editor;
}>();
</script>

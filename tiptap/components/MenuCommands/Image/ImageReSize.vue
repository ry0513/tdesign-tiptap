<template>
  <CommandButton
    v-for="item in ['25%', '50%', '100%']"
    :key="item"
    :command="
      () =>
        editor.commands.updateAttributes('image', {
          width: item,
        })
    "
    :tooltip="item"
    :icon="`reSize-${item.slice(0, -1)}`"
    :isActive="editor.getAttributes('image').width === item"
  />
</template>
<script lang="ts" setup>
import { Editor } from "@tiptap/vue-3";
import CommandButton from "../CommandButton.vue";

defineProps<{
  url?: string;
  editor: Editor;
}>();
</script>

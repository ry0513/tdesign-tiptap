<template>
  <CommandButton
    :command="editor.commands.unsetLink"
    tooltip="取消链接"
    icon="unlink"
    :isActive="false"
  />
</template>
<script lang="ts" setup>
import CommandButton from "../CommandButton.vue";
import { Editor } from "@tiptap/vue-3";

defineProps<{
  editor: Editor;
}>();
</script>

<template>
  <CommandButton
    :command="
      () => {
        dialogShow = true;
      }
    "
    :tooltip="editor.isActive('link') ? '编辑链接' : '插入链接'"
    icon="link"
    :isActive="editor.isActive('link')"
  />
  <LinkDialog :editor="editor" :show="dialogShow" @close="dialogShow = false" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Editor } from "@tiptap/vue-3";
import CommandButton from "../CommandButton.vue";
import LinkDialog from "./LinkDialog.vue";

defineProps<{
  editor: Editor;
}>();

const dialogShow = ref(false);
</script>

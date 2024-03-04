<template>
  <EditLinkButton :editor="editor" />
  <template v-if="editor.isActive('link') && menuType === 'bubble'">
    <UnLinkButton :editor="editor" />
    <OpenLinkButton :url="editor.getAttributes('link').href" />
  </template>
</template>
<script lang="ts" setup>
import { Editor } from "@tiptap/vue-3";
import EditLinkButton from "./EditLinkButton.vue";
import OpenLinkButton from "./ExternalLinkButton.vue";
import UnLinkButton from "./UnLinkButton.vue";

defineProps<{
  editor: Editor;
  menuType: string;
}>();
</script>

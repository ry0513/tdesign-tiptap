<template>
  <OpenLinkButton :url="editor.getAttributes('link').href" />
  <EditLinkButton :editor="editor" />
  <UnLinkButton :editor="editor" />
</template>
<script lang="ts" setup>
import { Editor } from "@tiptap/vue-3";
import EditLinkButton from "./EditLinkButton.vue";
import OpenLinkButton from "./ExternalLinkButton.vue";
import UnLinkButton from "./UnLinkButton.vue";

defineProps<{
  editor: Editor;
}>();
</script>

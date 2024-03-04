<template>
  <div v-if="editor" class="t-tiptap">
    <MenuBar :editor="editor" :extensions="extensions" />
    <MenuBubble :editor="editor" :extensions="extensions" />
    <EditorContent class="t-tiptap__content" :editor="editor" />
  </div>
</template>

<script lang="ts" setup>
import { EditorContent, useEditor, Extensions } from "@tiptap/vue-3";
import MenuBar from "./MenuBar/index.vue";
import MenuBubble from "./MenuBubble/index.vue";
import Document from "../extensions/document";
import Text from "../extensions/text";
import Paragraph from "../extensions/paragraph";
import "../styles/editor.scss";
import "../styles/index.scss";

const props = defineProps<{
  modelValue: string;
  extensions: Extensions;
}>();
const emits = defineEmits(["update:modelValue"]);
const extensions = [Document, Text, Paragraph, ...props.extensions];
const editor = useEditor({
  content: props.modelValue,
  extensions,
  onUpdate: () => {
    emits("update:modelValue", editor.value!.getHTML());
  },
});
</script>

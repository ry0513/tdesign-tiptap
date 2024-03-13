<template>
  <div class="t-tiptap">
    <MenuBar v-if="editor" :editor="editor" :extensions="extensions" />
    <div ref="tiptapContent" class="t-tiptap__content t-tiptap__scroll">
      <MenuBubble
        v-if="editor"
        :editor="editor"
        :extensions="extensions"
        :tiptapContent="tiptapContent"
      />
      <EditorContent v-if="editor" :editor="editor" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EditorContent, Extensions, Editor } from "@tiptap/vue-3";
import MenuBar from "./MenuBar/index.vue";
import MenuBubble from "./MenuBubble/index.vue";
import Document from "../extensions/document";
import Text from "../extensions/text";
import Paragraph from "../extensions/paragraph";
import "../styles/editor.scss";
import "../styles/index.scss";
import { onMounted, ref, shallowRef } from "vue";

const props = defineProps<{
  modelValue: string;
  extensions: Extensions;
}>();
const emits = defineEmits(["update:modelValue"]);
const extensions = [Document, Text, Paragraph, ...props.extensions];
const tiptapContent = ref<Element | null>(null);
const editor = shallowRef<Editor | null>(null);

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions,
    onUpdate: () => {
      emits("update:modelValue", editor.value!.getHTML());
    },
  });
});
</script>
